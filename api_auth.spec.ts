import {test,expect, request} from "@playwright/test"


const BASE_URL = "https://restful-booker.herokuapp.com";
const tokenValue = "a1a3126e90e295a";

test.only("Create a new auth token",async ({request}) => {
    const response = await request.post(`${BASE_URL}/auth`,{
        headers: {"Content-Type": "application/json"},
        data: {
            "username": "admin",
            "password": "password123"
        }
    }    
    )

    expect (response.status()).toBe(200);
    const token = (await response.json()).token;

    console.log(token); 
})

test("GetBooking Returns the ids of all the bookings",async ({request}) => {
    const response = await request.get(`${BASE_URL}/booking`);

    expect (response.status()).toBe(200);
    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("bookingid");

    console.log(body); 
})

test.only("Updates a current booking",async ({request}) => {
    const response = await request.put(`${BASE_URL}/booking/1`,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": 'token=${tokenValue}'
        },
        data: {
            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            
            "additionalneeds": "Breakfast"
        }
    }    
    )

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty("firstname");
    console.log(body); 
})