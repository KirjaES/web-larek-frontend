import { IProduct, IProductList } from '../types/api-types';
import { IApiWebLarek } from '../api/api';

export interface IProductModel {
	fetchProducts(): Promise<IProductList>;
	getProducts(): IProductList;
	getProductById(productId: IProduct['id']): IProduct;
}

export class ProductModel implements IProductModel {
	private apiClient: IApiWebLarek;
	private products: IProductList = {
		items: [],
		total: 0,
	};

	constructor(apiClient: IApiWebLarek) {
		this.apiClient = apiClient;
	}

	async fetchProducts() {
		const products = await this.apiClient.getProductList()
		this.products = products;

		return products;
	}

	getProducts() {
		return this.products;
	}

	getProductById(productId: IProduct['id']) {
		return this.products.items.find(p => p.id === productId);
	}
}
