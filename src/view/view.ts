import { IProduct, IProductList, PaymentMethod } from '../types';

interface IModal {
	open(): void;
	close(): void;
	setIsButtonActive(value: boolean): void;
}

type ModalListeners = {
	onClose(): void;
	onSubmit(): void;
}

interface IModalConstructor {
	new (container: HTMLElement, listeners: ModalListeners): IModal;
}

export interface IProductModal extends IModal {
	renderProduct(product: IProduct): void;
}

export interface IProductModalConstructor {
	new (container: HTMLElement, listeners: ModalListeners & {
		onProductRemove(id: string): void;
	}): IProductModal;
}

export interface IBusketModal extends IModal {
	renderProducts(products: IProductList): void;
}

export interface IBusketModalConstructor {
	new (container: HTMLElement, listeners: ModalListeners & {
		onProductRemove(id: string): void;
	}): IBusketModal;
}

export interface IDeliveryModalConstructor {
	new (container: HTMLElement, listeners: ModalListeners & {
		onChangePaymentMethod(value: PaymentMethod): void;
		onChangeAddress(value: string): void;
	}): IModal;
}

export interface IContactsModalConstructor {
	new (container: HTMLElement, listeners: ModalListeners & {
		onChangeEmail(value: string): void;
		onChangePhone(value: string): void;
	}): IModal;
}

export interface ISuccessOrderConstructor {
	new (container: HTMLElement): IModal;
}

export interface IProductCard {
	unmount(): void;
}

export interface IProductCardConstructor {
	new (product: IProduct, container: HTMLElement, options: {
		onClick(productId: string): void
	}): IProductCard;
}

export interface IView {
	init(): void;
	createProductModal: IProductModalConstructor;
	createBusketModal: IBusketModalConstructor;
	createDeliveryModal: IDeliveryModalConstructor;
	createContactsModal: IContactsModalConstructor;
	createSuccessOrderModal: ISuccessOrderConstructor;
	createProductCard: IProductCardConstructor;
}

export interface IViewConstructor {
	new (root: HTMLElement): IView;
}
