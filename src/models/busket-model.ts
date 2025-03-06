import { IProduct, IProductList } from '../types/api-types';

export interface IBusketModel {
	getItemsCount(): number;
	getItems(): IProductList;
	addItem(product: IProduct): IProductList;
	removeItem(product: IProduct): IProductList;
	clearAll(): void;
}
