import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';



const baseURL = "https://gorest.co.in/";
const authToken = "e71113b8b87f3b3f9b65774f71274e9b8a1fd41d069a30808ef7d07ba0f4f20d";
let postRequestResponseBodyJSON; 
let postParameters; 


test.describe.configure({ mode: "serial"});


test("POST Request", async({request})=> {
const uuid = uuidv4(); 
const shortenedUUID = uuid.slice(0,4);

const postRequestURL = baseURL + `/public/v2/users/?access-token=${authToken}`;
const postRequestResponse = await request.post(postRequestURL, {data: {
    "id": 7014307,
    "name": "Pvt. Inspector Gadget",
    "email": `inspector_pvt_gadget${shortenedUUID}@quitzon.example`,
    "gender": "male",
    "status": "active"
}}
)
console.log(postRequestResponse.status());
await expect(postRequestResponse.status()).toBe(201);
postRequestResponseBodyJSON = JSON.parse(await postRequestResponse.text());
console.log(postRequestResponseBodyJSON);
 postParameters = {
    id: postRequestResponseBodyJSON.id,
    name: postRequestResponseBodyJSON.name,
    email: postRequestResponseBodyJSON.email,
    gender: postRequestResponseBodyJSON.gender,
    status: postRequestResponseBodyJSON.status
}
});

test("GET Request", async ({request})=> {
console.log(postParameters.name);     
const getRequestURL = baseURL + `/public/v2/users/?name=${postParameters.name}`;
const getRequestResponse = await request.get(getRequestURL, {
headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer${authToken}`
}
});
//console.log(postParameters.id);
console.log(getRequestResponse.status()); 
await expect(getRequestResponse.status()).toBe(200); 

const getRequestResponseBodyJSON = JSON.parse(await getRequestResponse.text());
//Assertions for each of the objects in the JSON response from above 
await expect(getRequestResponseBodyJSON.id).toEqual(postParameters.id);
await expect(getRequestResponseBodyJSON.name).toEqual(postParameters.name);
await expect(getRequestResponseBodyJSON.email).toEqual(postParameters.email);
await expect(getRequestResponseBodyJSON.gender).toEqual(postParameters.gender);
await expect(getRequestResponseBodyJSON.status).toEqual(postParameters.status);
});