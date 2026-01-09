import { test, expect } from '@playwright/test';
import { queryDB } from '../utils/db.js';

test('verify employee in DB', async () => {
  const data = await queryDB(
    'select * from employee where employee_email = $1',
    ['rahulgupta14071997@gmail.com']
  );

  console.log('Employees by email:', data);

  expect(data.length).toBe(1);
});

test('employee salary should be positive', async () => {
  const rows = await queryDB(
    'SELECT employee_salary FROM employee'
  );

  console.log('Employee salaries:', rows);

  rows.forEach(emp => {
    expect(Number(emp.employee_salary)).toBeGreaterThan(0);
  });
});

test('employee DOJ should not be future date', async () => {
  const rows = await queryDB(
    'SELECT employee_doj FROM employee'
  );

  console.log('Employee DOJ values:', rows);

  const today = new Date();

  rows.forEach(emp => {
    console.log('Checking DOJ:', emp.employee_doj);
    expect(new Date(emp.employee_doj) <= today).toBeTruthy();
  });
});

test('mandatory employee fields are not null', async () => {
  const rows = await queryDB(
    'SELECT employee_name, employee_email, employee_jobtitle FROM employee'
  );

  console.log('Mandatory fields result:', rows);

  rows.forEach(emp => {
    expect(emp.employee_name).not.toBeNull();
    expect(emp.employee_email).not.toBeNull();
    expect(emp.employee_jobtitle).not.toBeNull();
  });
});

test('employee emails should be unique', async () => {
  const rows = await queryDB(
    `SELECT employee_email, COUNT(*) 
     FROM employee 
     GROUP BY employee_email 
     HAVING COUNT(*) > 1`
  );

  console.log('Duplicate emails (should be empty):', rows);

  expect(rows.length).toBe(0);
});


test('created_at should be present', async () => {
  const rows = await queryDB(
    'SELECT created_at FROM employee'
  );

  console.log('Created timestamps:', rows);

  rows.forEach(emp => {
    expect(emp.created_at).not.toBeNull();
  });
});

