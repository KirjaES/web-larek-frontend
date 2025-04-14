import { BasketModel, IBasketModel } from './basket-model';
import { IOrderModel, OrderModel } from './order-model';
import { IProductModel, ProductModel } from './product-model';
import { IApiWebLarek } from '../api/api';

export interface IModel {
	basket: IBasketModel;
	order: IOrderModel;
	product: IProductModel;
}

export class Model implements IModel {
	basket: IBasketModel;
	order: IOrderModel;
	product: IProductModel;

	constructor(apiClient: IApiWebLarek) {
		this.basket = new BasketModel();
		this.order = new OrderModel(apiClient);
		this.product = new ProductModel(apiClient);
	}
}
