import { IBusketModel } from './busket-model';
import { IOrderModel } from './order-model';
import { IProductModel } from './product-model';

export interface IModel {
	busketModel: IBusketModel
	orderModel: IOrderModel
	productModel: IProductModel
}

export interface IModelConstructor {
	new(): IModel;
}
