import {test,expect, request} from "@playwright/test"

const BASE_URL = 'https://api.restful-api.dev';
const objects_id = 'ff808181a09d98f701a1ecee109a190d';

test("Get to List Objects",async({request}) =>{
    const response = await request.get(`${BASE_URL}/objects`);
    expect(response.status()).toBe(200);

    let body = await response.json();
    expect (body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("id");
});

test("Create New Object With Post Call", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/objects`, {
        headers: {"Content-Type":"application/json"},
        data: {
            "name": "Apple MacBook Pro 16",
            "year": 2019,
            "price": 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    });
    
    expect(response.status()).toBe(200);

    let body = await response.json();
    expect(body.name).toBe("Apple MacBook Pro 16");
    console.log(body.id);    
});

test("Get One Data",async ({request}) => {
    const response = await request.get(`${BASE_URL}/objects/${objects_id}`);

    expect(response.status()).toBe(200);

    let body = await response.json();
    //console.log(body);
    expect(body.name).toBe("Apple MacBook Pro 16");
    expect(body.id).toBe(objects_id);
});

test("Update Object With Put Call",async ({request}) =>{
    const response = await request.put(`${BASE_URL}/objects/${objects_id}`,{
        data:{
            "name": "Apple MacBook Pro M5",
            "year": 2026,
            "price": 50000,
            "CPU model": "M5",
            "Hard disk size": "1 TB"
        }
    });

    expect(response.status()).toBe(200);

    let body = await response.json();
    expect(body.name).toBe("Apple MacBook Pro M5");
})

test.only("Delete Object With Delete Call",async({request}) =>{
    const response = await request.delete(`${BASE_URL}/objects/${objects_id}`);    
    expect(response.status()).toBe(200);
})