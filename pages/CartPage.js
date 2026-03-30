import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    constructor(page) {
        super(page);

        this.shoppingCartLink = this.getByTestId('shopping-cart-link');
        this.cartItems = this.getByTestId('inventory-item');
        this.itemNames = this.getByTestId('inventory-item-name');
        this.itemPrices = this.getByTestId('inventory-item-price');
        this.checkoutButton = this.getByRole('button', { name: 'checkout' });
        this.continueShoppingButton = this.getByRole('button', { name: 'Continue Shopping' });
    }

    async calculateTotalAmountForItemsInCart() {
        const price = await this.itemPrices.allInnerTexts();
        const total = price.reduce((sum, price) => {
            return sum + parseFloat(price.replace('$', ''));
        }, 0);
        return total;
    }

    async getListOfAllItemsInCart() {
        return this.itemNames.allInnerTexts();
    }

    async removeItems(itemNamesToRemove) {
        for (const itemName of itemNamesToRemove) {
            const item = this.cartItems.filter({
                has: this.page.getByTestId('inventory-item-name').filter({
                    hasText: itemName
                })
            });

            await item.getByRole('button', { name: 'Remove' }).click();
        }
    }

}