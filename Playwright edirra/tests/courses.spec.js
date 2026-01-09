const { test, expect } = require('@playwright/test');
const { getDBClient } = require('../utils/crsDB');
const { error } = require('node:console');

let crsDB;

test.beforeAll(async () => {
  crsDB = await getDBClient();
});

// test.afterEach(async () => {
//   await crsDB.end();
// });

test('Insert a valid course', async() => {

    const result = await crsDB.query(`
    INSERT INTO courses (course_id, courses_name, course_fee) VALUES
      (3001, 'Typescript', 699),
      (3002, 'Javascript', 899),
      (3003, 'React native', 799)
    RETURNING *;
  `);

await expect(result.rows[0].course_id).toBe(3001);
await expect(result.rows[0].courses_name).toBe('Typescript');
await expect(result.rows[0].course_fee).toBe(699);

await expect(result.rows[1].course_id).toBe(3002);
await expect(result.rows[1].courses_name).toBe('Javascript');
await expect(result.rows[1].course_fee).toBe(899);

await expect(result.rows[2].course_id).toBe(3003);
await expect(result.rows[2].courses_name).toBe('React native');
await expect(result.rows[2].course_fee).toBe(799);

});

test('Update course fee successfully', async() => {
        await crsDB.query(`insert into courses(course_id, courses_name, course_fee) values(3003, 'playwright', 990) returning *;
        `);
        
     const result = await crsDB.query(`
        update courses 
        set course_fee = 750
        where course_id = 3003
        returning course_fee;
        `);
    
    expect(result.rows[0].course_fee).toBe(750);
});


test('delete course successfully', async() => {
    const deleteResult = await crsDB.query(`
    DELETE FROM courses WHERE course_id = 3001;
    `);
    //expect(deleteResult.rowCount).toBe(0);
    
    const checkCourse = await crsDB.query(`
    SELECT * FROM courses;
    `);
    //expect(check.rowCount).toBe(0);
    console.log('Courses are:', checkCourse);
});


test('courses_name unique constraint enforced', async() => {

  try{
      await crsDB.query(`
        insert into courses(course_id, courses_name, course_fee)
        values (2111, 'Angular', 555)
        `);
      await crsDB.query(`
        insert into courses(course_id, courses_name, course_fee)
        values(2112, 'Angular', 666)
        `);
      throw new error('Unique constraint not enforced');
      }
      catch(err){
        console.log('Expected unique constraint error:', err.message);
        expect(err.message).toContain('duplicate key value');
      }
    });

  test.only('delete three courses at a time', async() =>{
    const result = await crsDB.query(`
      delete from courses where course_id in (3001, 3002, 3003)
      returning *;
      `);

      expect(result.rowCount).toBe(3);
      const deleteIDs = result.rows.map(r => r.course_id);
      expect(deleteIDs).toEqual(expect.arrayContaining([3001, 3002, 3003]));
      
  });