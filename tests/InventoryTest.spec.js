import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { UserData } from '../test-data/UserData';

test('Products Add To Cart Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/');
    await loginPage.login(UserData.userData.validUserData.username, UserData.userData.validUserData.password);
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');

    const inventoryPage = new InventoryPage(page);
    const productListNeedsToBeAddedInCart = ["Sauce Labs Backpack", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie"];

    /*
    productListNeedsToBeAddedInCart.forEach(product => {
     inventoryPage.addProductToCart(product);
    });

    -----------------------------------------------------------------------------------------------------------------------------------------------------------------

    Problem:

    forEach does NOT support await
    Your async calls run in parallel & not awaited ❌

    */

    for (const product of productListNeedsToBeAddedInCart) {
        await inventoryPage.addProductToCart(product);
    }
    await inventoryPage.shoppingCartLink.click();
    console.log(productListNeedsToBeAddedInCart);
});