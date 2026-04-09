import { test, expect } from '../fixtures/pageFixtures';

test('Place Order End to End flow', async ({
    authenticatedUser,
    inventoryPage,
    cartPage,
    checkoutPage,
    users,
    page,
}) => {
    // User is already authenticated via authenticatedUser fixture
    const expectedItems = [
        'Sauce Labs Backpack',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
    ];

    let totalAmountForItemsInCart;

    await test.step('Verify user is logged in', async () => {
        expect(page.url()).toContain('inventory.html');
    });

    await test.step('Add Items to Cart', async () => {
        for (const product of expectedItems) {
            await inventoryPage.addProductToCart(product);
        }
        await inventoryPage.shoppingCartLink.click();
    });

    await test.step('Validate Cart Items', async () => {
        const listOfItemsInCart = await cartPage.getListOfAllItemsInCart();
        totalAmountForItemsInCart = await cartPage.calculateTotalAmountForItemsInCart();
        expect(listOfItemsInCart).toEqual([
            'Sauce Labs Backpack',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
        ]);
        await cartPage.checkoutButton.click();
    });

    await test.step('Validate Checkout Details', async () => {
        await checkoutPage.fillCheckoutDetailsAndContinueToPayment(
            users.checkoutDetails.firstName,
            users.checkoutDetails.lastName,
            users.checkoutDetails.postalCode,
        );
        await checkoutPage.calculateAllAmounts();
        expect(checkoutPage.totalItemPriceCalculated.toFixed(2)).toEqual(
            (await checkoutPage.subtotalLabelText.innerText()).replace(/[^\d.]/g, ''),
        );
        expect(checkoutPage.totalTaxonTotalItemPriceCalculated.toFixed(2)).toEqual(
            (await checkoutPage.taxLabel.innerText()).replace(/[^\d.]/g, ''),
        );
        expect(checkoutPage.totalAmountCalculated).toEqual(
            Number((await checkoutPage.totalLabel.innerText()).replace(/[^\d.]/g, '')),
        );
        await checkoutPage.finishButton.click();
        await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
    });
});


