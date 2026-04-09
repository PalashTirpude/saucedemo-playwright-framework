import { test, expect } from '../fixtures/pageFixtures';

test('Products Add To Cart Test', async ({ authenticatedUser, inventoryPage, page }) => {
    // User is already logged in via authenticatedUser fixture
    expect(page.url()).toContain('inventory.html');

    const productListNeedsToBeAddedInCart = [
        'Sauce Labs Backpack',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
    ];

    // Add products to cart sequentially (forEach does not support await)
    for (const product of productListNeedsToBeAddedInCart) {
        await inventoryPage.addProductToCart(product);
    }

    await inventoryPage.shoppingCartLink.click();
    console.log('Added products:', productListNeedsToBeAddedInCart);
});