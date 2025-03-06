import { IProduct } from '../types/api-types';

export interface IProductModel {
	fetchProducts(): Promise<IProduct[]>;
	getProducts(): Promise<IProduct[]>;
	getProductById(id: string): IProduct;
}
