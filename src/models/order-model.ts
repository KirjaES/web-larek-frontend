import { IOrder, IProduct } from '../types/api-types';
import { PaymentMethod } from '../types';
import { IApiWebLarek } from '../api/api';

type ValidateStatus = {
	isValid: boolean;
	message?: string;
};

export interface IOrderModel {
	address: string;
	paymentMethod: PaymentMethod | '';
	email: string;
	phone: string;
	validateDeliveryData(): ValidateStatus;
	validateContacts(): ValidateStatus;
	makeOrder(products: IProduct[], total: number): Promise<IOrder>;
	clearAll(): void;
}

export class OrderModel implements IOrderModel {
	private apiClient: IApiWebLarek;
	address = '';
	paymentMethod: PaymentMethod | '' = '';
	email = '';
	phone = '';

	constructor(apiClient: IApiWebLarek) {
		this.apiClient = apiClient;
	}

	validateDeliveryData() {
		let message: string | undefined;
		let isValid = true;
		if (!(this.address.length > 0)) {
			message = 'Заполните адрес';
			isValid = false;
		}
		if (
			!(this.paymentMethod.length > 0) ||
			!['cash', 'online'].includes(this.paymentMethod)
		) {
			message = 'Выберите способ оплаты';
			isValid = false;
		}
		return {
			isValid,
			message,
		};
	}
	validateContacts() {
		let message: string | undefined;
		let isValid = true;
		if (!(this.phone.length > 0)) {
			message = 'Заполните номер телефона';
			isValid = false;
		}
		if (!(this.email.length > 0)) {
			message = 'Заполните почту';
			isValid = false;
		}
		return {
			isValid,
			message,
		};
	}
	makeOrder(products: IProduct[], total: number): Promise<IOrder> {
		return this.apiClient.postOrder({
			payment: this.paymentMethod as PaymentMethod,
			address: this.address,
			phone: this.phone,
			email: this.email,
			items: products.map((p) => p.id),
			total,
		});
	}
	clearAll() {
		this.address = '';
		this.email = '';
		this.phone = '';
		this.email = '';
		this.paymentMethod = '';
	}
}
