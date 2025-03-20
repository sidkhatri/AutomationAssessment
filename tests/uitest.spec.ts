import { test, expect, Page } from '@playwright/test';

/* We are going to navigate to the test automation login page and then perform the login test
First scenario is login with correct username and password and validate the landing page url and validate message on landing page of 
'Congratulations student. You successfully logged in!' is seen on the page.

Second scenario is attempt to login with incorrect username and correct password and then validate the error message seen on the login page

Third scenaior is attempt to login with correct username and incorrect password and then validate the error message seen on the login page

I will be automating the first scenario
*/

test('Login Test' , async({page})=> {
await page.goto("https://practicetestautomation.com/practice-test-login/");
await page.locator("//input[@id='username']").fill("student");
await page.locator("//input[@id='password']").fill("Password123");
await page.locator("//button[@id='submit']").click();
await expect(page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");
await expect(page.locator("//p[@class='has-text-align-center']")).toHaveText("Congratulations student. You successfully logged in!");
});
