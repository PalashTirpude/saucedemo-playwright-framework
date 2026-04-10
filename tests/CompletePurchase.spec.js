import { test, expect } from '../fixtures/pageFixtures';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDigits(length) {
    let digits = '';
    for (let i = 0; i < length; i++) {
        digits += getRandomInt(0, 9);
    }
    return digits;
}

test('Complete purchase flow', async ({ page, loginPage, inventoryPage, cartPage, checkoutPage, users }) => {
    // 1. Go to https://www.saucedemo.com
    await page.goto(process.env.BASE_URL);

    // 2. Login with standard_user / secret_sauce
    await loginPage.login(users.validUserData.username, users.validUserData.password);

    // 3. Add "Sauce Labs Backpack" to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 4. Go to shopping cart
    await page.click('.shopping_cart_link');

    // 5. Click Checkout
    await page.click('[data-test="checkout"]');

    // 6. Fill checkout form with random data
    const randNum = getRandomInt(1000, 9999);
    await page.fill('[data-test="firstName"]', `TestUser${randNum}`);
    await page.fill('[data-test="lastName"]', `McTest${randNum}`);
    await page.fill('[data-test="postalCode"]', getRandomDigits(5));

    // 7. Click Continue
    await page.click('[data-test="continue"]');

    // 8. Click Finish
    await page.click('[data-test="finish"]');

    // 9. Verify thank you message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

/*
MCP Cammand given in vscode chat:

Run the complete purchase test:

1. Go to https://www.saucedemo.com
2. Login with standard_user / secret_sauce
3. Add "Sauce Labs Backpack" to cart
4. Go to shopping cart
5. Click Checkout
6. Fill checkout form with random data:
   - First Name: "TestUser" + random number
   - Last Name: "McTest" + random number
   - Postal Code: 5 random digits
7. Click Continue
8. Click Finish
9. Verify "Thank you for your order!" message appears
*/