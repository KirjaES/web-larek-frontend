import { IModal, Modal } from './modal-view';
import { cloneTemplate } from '../utils/utils';

export interface IBasketModal extends IModal {
	setValue(...content: HTMLElement[]): void;
	render(): void;
	set counter(counter: number);
	set onSubmit(handler: VoidFunction);
	set disabled(disabled: boolean);
}

export class BasketModalView extends Modal implements IBasketModal {
	private basketContent: HTMLElement;
	private children: HTMLElement;
	private button: HTMLButtonElement;
	private summary: HTMLElement;

	constructor() {
		super()

		const element = cloneTemplate<HTMLButtonElement>('#basket');
		this.basketContent = element;
		this.button = element.querySelector('button');
		this.summary = element.querySelector('.basket__price');
		this.children = element.querySelector('.basket__list')
	}

	setValue(...args: HTMLElement[]) {
		this.children.replaceChildren(...args);
	}

	set counter(value: number) {
		this.summary.textContent = `${value} синапсов`;
	}

	set onSubmit(handler: VoidFunction) {
		this.button.onclick = handler;
	}

	set disabled(disabled: boolean) {
		if(disabled)
			this.button.disabled = disabled;
		else
			this.button.removeAttribute('disabled')
	}

	render() {
		this.setContent(this.basketContent);
	}
}

