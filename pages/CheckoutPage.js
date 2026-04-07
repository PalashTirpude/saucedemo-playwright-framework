import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    constructor(page) {
        super(page);
        this.taxRate = 8 //in percentage

        this.firstName = this.getByPlaceHolder('First Name');
        this.lastName = this.getByPlaceHolder('Last Name');
        this.zipOrPostalCode = this.getByPlaceHolder('Zip/Postal Code');

        this.continueButton = this.getByRole('button', { name: 'Continue' });
        this.cancelButton = this.getByRole('button', { name: 'Cancel' });

        this.cartItems = this.getByTestId('inventory-item');
        this.inventoryItemName = this.getByTestId('inventory-item-name');
        this.inventoryItemPrice = this.getByTestId('inventory-item-price');

        this.subtotalLabelText = this.getByTestId('subtotal-label');
        this.taxLabel = this.getByTestId('tax-label');
        this.totalLabel = this.getByTestId('total-label');

        this.finishButton = this.getByRole('button', { name: 'Finish' });

        this.successMessage = this.getByText('Thank you for your order!');

        this.totalItemPriceCalculated;
        this.totalTaxonTotalItemPriceCalculated;
        this.totalAmountCalculated;
    }



    async fillCheckoutDetailsAndContinueToPayment(firstName, lastName, zipOrPostalCode) {
        await this.fill(this.firstName, firstName);
        await this.fill(this.lastName, lastName);
        await this.fill(this.zipOrPostalCode, zipOrPostalCode);
        await this.click(this.continueButton);
    }

    async calculateItemTotalPrice() {
        const itemTotalPrice = (await this.inventoryItemPrice.allInnerTexts()).reduce((sum, price) => {
            return sum + parseFloat(price.replace('$', ''));
        }, 0);
        return itemTotalPrice;
    }

    async calculateTaxOnTotalPrice() {
        const total = await this.calculateItemTotalPrice();
        const tax = (this.taxRate / 100) * total;
        return tax;
    }

    async calculateAllAmounts() {
        this.totalItemPriceCalculated = await this.calculateItemTotalPrice();
        this.totalTaxonTotalItemPriceCalculated = await this.calculateTaxOnTotalPrice();
        this.totalAmountCalculated = +(this.totalItemPriceCalculated + this.totalTaxonTotalItemPriceCalculated).toFixed(2);
    }
}