import { ApiListResponse } from '../components/base/api';

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: null | number;
}

export type IProductList = ApiListResponse<IProduct>;

export type PaymentMethod = 'online' | 'cash';

export interface IOrderRequestBody {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: Array<IProduct['id']>;
}

export interface IOrder {
	id: string;
	total: number;
}
