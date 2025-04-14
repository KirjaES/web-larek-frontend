import { cloneTemplate, ensureElement } from '../utils/utils';

export interface IBasketCard {
	set onDelete(handler: VoidFunction | undefined);
	render(props: { index: number; title: string; price: number }): HTMLElement;
}

export class BasketCardView implements IBasketCard {
	private element: HTMLElement;
	private deleteButton: HTMLButtonElement;
	private index: HTMLElement;
	private title: HTMLElement;
	private price: HTMLElement;

	constructor() {
		const element = cloneTemplate('#card-basket');

		this.deleteButton = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			element
		);
		this.index = ensureElement('.basket__item-index', element);
		this.title = ensureElement('.card__title', element);
		this.price = ensureElement('.card__price', element);
		this.element = element;
	}

	set onDelete(handler: VoidFunction | undefined) {
		this.deleteButton.onclick = handler;
	}

	render(props: { index: number; title: string; price: number }) {
		this.index.textContent = props.index.toString();
		this.title.textContent = props.title;
		this.price.textContent = props.price.toString();

		return this.element;
	}
}
