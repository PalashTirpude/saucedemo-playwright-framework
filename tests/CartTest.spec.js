import { test, expect } from 'playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { UserData } from '../test-data/UserData';

test.describe('Place Order End to End flow', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkOutPage = new CheckoutPage();

    test('Login Test', async ({ page }) => {
        await loginPage.navigate('/');
        await loginPage.login(UserData.userData.validUserData.username, UserData.userData.validUserData.password);
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test('Inventory Test', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const productListNeedsToBeAddedInCart = ["Sauce Labs Backpack", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie"];
        for (const product of productListNeedsToBeAddedInCart) {
            await inventoryPage.addProductToCart(product);
        }
        await inventoryPage.shoppingCartLink.click();
    });

    test('Check Items In Cart', async ({ page }) => {

    })
});