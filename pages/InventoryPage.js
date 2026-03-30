import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
    constructor(page) {
        super(page);

        this.inventoryItemList = this.getByTestId('inventory-item');
        this.productSortOption = this.getByTestId('product-sort-container');
        this.shoppingCartLink = this.getByTestId('shopping-cart-link');
    }

    async addProductToCart(productName) {
        const product = this.inventoryItemList.filter({
            has: this.page.getByTestId('inventory-item-name').filter({
                hasText: productName
            })
        });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async sortProductsBy(order) {
        this.selectByValue({ value: order })
    }
}