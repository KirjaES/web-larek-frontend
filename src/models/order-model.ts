import { IOrder, IProduct } from '../types/api-types';
import { PaymentMethod } from '../types';

export interface IOrderModel {
	setProducts(products: IProduct[]): void;
	isCorrectDeliveryData(): boolean;
	setDeliveryData(paymentMethod: PaymentMethod, address: string): void;
	isCorrectContacts(): boolean;
	setContacts(email: string, phone: string): void;
	makeOrder(): Promise<IOrder>;
}
