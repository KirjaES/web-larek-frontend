import { cloneTemplate } from '../utils/utils';

export interface IBasketCard {
	set onDelete(handler: VoidFunction | undefined);
	render(props: { index: number; title: string; price: number }): HTMLElement;
}

export class BasketCardView implements IBasketCard {
	private element: HTMLElement;
	private deleteButton: HTMLButtonElement;

	constructor() {
		const element = cloneTemplate('#card-basket');

		this.deleteButton = element.querySelector('.basket__item-delete');
		this.element = element;
	}

	set onDelete(handler: VoidFunction | undefined) {
		this.deleteButton.onclick = handler;
	}

	render(props: { index: number; title: string; price: number }) {
		this.element.querySelector('.basket__item-index').textContent =
			props.index.toString();
		this.element.querySelector('.card__title').textContent = props.title;
		this.element.querySelector('.card__price').textContent = props.price.toString();

		return this.element;
	}
}
