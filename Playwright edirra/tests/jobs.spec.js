const {test, expect} = require('@playwright/test');
const {getDBClient} = require('../utils/crsDB');
const {error} = require('node:console');

let crsDB;

test.beforeAll(async() => {
    crsDB = await getDBClient();
});

test('insert values', async() => {
    const result = await crsDB.query(`
        insert into jobs(job_name) values
        ('Human Resource Job'),
        ('Receiptonist Job'),
        ('Team Leader Job')
        returning *;
        `);

    await expect(result.rows[0].job_id).toBe(10);
    await expect(result.rows[0].job_name).toBe('Human Resource Job');

    await expect(result.rows[1].job_id).toBe(11);
    await expect(result.rows[1].job_name).toBe('Receiptonist Job');

    await expect(result.rows[2].job_id).toBe(12);
    await expect(result.rows[2].job_name).toBe('Team Leader Job');
});

test('status cannot be changed', async() => {

    try{
        await crsDB.query(`
            update jobs
            set job_status = 1
            where job_id = 7
            `);
        throw new error('Job status cannot be changed');
        
    }
    catch(err){
        console.log('Job status :', err.message);
        expect(err.message).toContain('job_status is system controlled');
    }
});

test('assign status  cannot be changed', async() => {

    try{
        await crsDB.query(`
            update jobs
            set job_assign = 1
            where job_id = 7
            `);
        throw new error('Job assign status cannot be changed');
        
    }
    catch(err){
        console.log('Job assign status :', err.message);
        expect(err.message).toContain('job_assign is system controlled');
    }
});

test('update job status ', async() => {
    const result = await crsDB.query(`
        Update jobs 
        set is_sme_status = 1,
        is_qa_status =1
        where job_id = 10
        returning *;
        `);
    expect(result.rows[0].job_status).toBe(1);
});

test.only('update job assign status', async() => {
    const result = await crsDB.query(`
        update jobs
        set is_sme_assign = 1,
        is_qa_assign =1
        where job_id =12
        returning *;
        `);
    expect(result.rows[0].job_assign).toBe(1);    
})