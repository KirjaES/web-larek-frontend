import { IModal, Modal } from './modal-view';
import { PaymentMethod } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export interface IDeliveryModal extends IModal {
	set disabled(val: boolean);
	set paymentMethod(val: PaymentMethod | '');
	set addressText(val: string);
	set onSubmit(fn: VoidFunction);
	set onChangeAddress(fn: (val: string) => void);
	set onChangePaymentMethod(fn: (val: PaymentMethod) => void);
	set error(val: string | undefined);
	render(): void;
}

export class DeliveryModalView extends Modal implements IDeliveryModal {
	private element: HTMLElement;
	private address: HTMLInputElement;
	private orderButton: HTMLButtonElement;
	private onlineButton: HTMLButtonElement;
	private cashButton: HTMLButtonElement;
	private errorSpan: HTMLSpanElement;

	constructor() {
		super();

		const element = cloneTemplate<HTMLButtonElement>('#order');
		this.address = ensureElement<HTMLInputElement>('.form__input', element);
		this.orderButton = ensureElement<HTMLButtonElement>(
			'.order__button',
			element
		);
		this.onlineButton = ensureElement<HTMLButtonElement>(
			'[name="card"]',
			element
		);
		this.cashButton = ensureElement<HTMLButtonElement>(
			'[name="cash"]',
			element
		);
		this.errorSpan = ensureElement('.form__errors', element);
		this.element = element;
	}

	set onChangePaymentMethod(fn: (val: PaymentMethod) => void) {
		this.onlineButton.onclick = () => fn('online');
		this.cashButton.onclick = () => fn('cash');
	}

	set onChangeAddress(fn: (val: string) => void) {
		this.address.oninput = (e) => fn((e.target as HTMLInputElement).value);
	}

	set onSubmit(handler: VoidFunction) {
		this.orderButton.onclick = (e) => {
			e.preventDefault();
			handler();
		};
	}

	set paymentMethod(val: PaymentMethod | '') {
		this.onlineButton.classList.remove('button_alt-active');
		this.cashButton.classList.remove('button_alt-active');

		if (val === 'online') {
			this.onlineButton.classList.add('button_alt-active');
		}
		if (val === 'cash') {
			this.cashButton.classList.add('button_alt-active');
		}
	}

	set addressText(val: string) {
		this.address.value = val;
	}

	set disabled(disabled: boolean) {
		if (disabled) this.orderButton.disabled = disabled;
		else this.orderButton.removeAttribute('disabled');
	}

	set error(val: string | undefined) {
		this.errorSpan.textContent = val;
	}

	render() {
		super.setValue(this.element);
	}
}
