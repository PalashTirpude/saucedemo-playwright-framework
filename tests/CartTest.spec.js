import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { UserData } from '../test-data/UserData';

test('PLace Order End to End flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const expectedItems = [
        "Sauce Labs Backpack",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie"
    ];

    let totalAmountForItemsInCart;
    await test.step('Login', async () => {
        await loginPage.navigate('/');
        await loginPage.login(UserData.userData.validUserData.username, UserData.userData.validUserData.password);
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });
    await test.step('Add Items to Cart', async () => {
        for (const product of expectedItems) {
            await inventoryPage.addProductToCart(product);
        }
        await inventoryPage.shoppingCartLink.click();
    });
    await test.step('Validate Cart Items', async () => {
        const listOfItemsInCart = await cartPage.getListOfAllItemsInCart();
        totalAmountForItemsInCart = await cartPage.calculateTotalAmountForItemsInCart()
        expect(listOfItemsInCart).toEqual(["Sauce Labs Backpack", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie"])
        await cartPage.checkoutButton.click();
    });
    await test.step('Validate Checkout Details', async () => {
        await checkoutPage.fillCheckoutDetailsAndContinueToPayment(
            UserData.checkoutDetails.firstName,
            UserData.checkoutDetails.lastName,
            UserData.checkoutDetails.postalCode
        );
        await checkoutPage.calculateAllAmounts();
        expect(checkoutPage.totalItemPriceCalculated.toFixed(2)).toEqual((await checkoutPage.subtotalLabelText.innerText()).replace(/[^\d.]/g, ''));
        expect(checkoutPage.totalTaxonTotalItemPriceCalculated.toFixed(2)).toEqual((await checkoutPage.taxLabel.innerText()).replace(/[^\d.]/g, ''));
        expect(checkoutPage.totalAmountCalculated).toEqual(Number((await checkoutPage.totalLabel.innerText()).replace(/[^\d.]/g, '')));
        await checkoutPage.finishButton.click();
        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    });
});

