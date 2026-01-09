//@ts-check

import {test, expect} from '@playwright/test'

import path from 'node:path';

test('login to edirra and create job', async ({page}) =>{
    await page.goto('https://uat.edirra.com/');

    await page.fill('input[type="email"]', 'admin@edirra.com');

    await page.fill('input[type="password"]', 'Admin@123456');

    await page.getByRole('button', {name : "Login"}).click();
    
    await test.setTimeout(600000);

    await page.getByRole('button', {name: "+ Create new Job"}).click();

    const filePath = path.join(__dirname, '../test-data/file-PDF.pdf');

    await page.locator('input[type="file"][multiple]').first().setInputFiles(filePath);

    //await expect(page.locator('input[type="file"][multiple]')).toContainText('file-sample.docx');

    await test.setTimeout(600000);

    page.pause();
    
});

