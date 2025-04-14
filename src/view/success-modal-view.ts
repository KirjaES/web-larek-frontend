import { IModal, Modal } from './modal-view';
import { cloneTemplate, ensureElement } from '../utils/utils';

export interface ISuccessModal extends IModal {
	set onSubmit(fn: VoidFunction);
	set priceText(val: number);
	render(): void;
}

export class SuccessModalView extends Modal implements ISuccessModal {
	private element: HTMLElement;
	private totalPrice: HTMLParagraphElement;
	private newOrderButton: HTMLButtonElement;

	constructor() {
		super();

		const element = cloneTemplate<HTMLButtonElement>('#success');
		this.totalPrice = ensureElement<HTMLParagraphElement>('.order-success__description', element);
		this.newOrderButton = ensureElement<HTMLButtonElement>('.order-success__close', element);
		this.element = element;
	}

	set onSubmit(handler: VoidFunction) {
		this.newOrderButton.onclick = (e) => {
			e.preventDefault();
			handler();
		};
	}

	set priceText(val: number) {
		this.totalPrice.textContent = `Списано ${val} синапсов`;
	}

	render() {
		super.setValue(this.element);
	}
}
