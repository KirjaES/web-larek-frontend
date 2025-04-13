import { IModal, Modal } from './modal-view';
import { cloneTemplate } from '../utils/utils';

export interface ISuccessModal extends IModal{
	set onSubmit(fn: VoidFunction);
	set priceText(val: number);
	render(): void;
}

export class SuccessModalView extends Modal implements ISuccessModal {
	private successContent: HTMLElement;
	private totalPrice: HTMLParagraphElement;
	private newOrderButton: HTMLButtonElement;


	constructor() {
		super()

		const element = cloneTemplate<HTMLButtonElement>('#success');
		this.successContent = element;
		this.totalPrice = element.querySelector('.order-success__description');
		this.newOrderButton = element.querySelector('.order-success__close');
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
		this.setContent(this.successContent);
	}
}
