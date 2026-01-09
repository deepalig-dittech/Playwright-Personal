import {test, expect} from '@playwright/test';
import { request } from 'node:https';

test ('GET - List of all objects', async({request}) => {
    const response = await request.get('https://api.restful-api.dev/objects');
    console.log(await response.json());

    expect(response.status()).toBe(200);
});


test('Get - List of objects by ids', async({request}) => {
    const response = await request.get('?id=3&id=5&id=10');
    console.log(await response.json());

    expect(response.status()).toBe(200);
});

test('Get - Single object', async({request}) => {
    const response = await request.get('?id=7');

    console.log(await response.json());

    expect(response.status()).toBe(200);
})