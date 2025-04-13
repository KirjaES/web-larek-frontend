import { IProduct } from '../types/api-types';

export interface IBasketModel {
	getItemsCount(): number;
	getPrice(): number;
	getItems(): IProduct[];
	addItem(product: IProduct): IProduct[];
	has(productId: IProduct['id']): boolean;
	removeItem(productId: IProduct['id']): IProduct[];
	clearAll(): void;
}

export class BasketModel implements IBasketModel {
	private items: IProduct[] = [];
	private price = 0;

	getItemsCount() {
		return this.items.length;
	}

	getPrice() {
		return this.price;
	}

	getItems() {
		return this.items;
	}

	private calculatePrice() {
		return this.items.reduce((prev, val) => prev + val.price, 0);
	}

	addItem(product: IProduct) {
		this.items.push(product);
		this.price = this.calculatePrice();

		return this.items;
	}

	has(productId: IProduct['id']) {
		return Boolean(this.items.find(p => p.id === productId));
	}

	removeItem(productId: IProduct['id']) {
		this.items = this.items.filter((p) => p.id !== productId);
		this.price = this.calculatePrice();

		return this.items;
	}

	clearAll() {
		this.items = [];
		this.price = 0;
	}
}
