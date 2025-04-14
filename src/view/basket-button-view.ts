import { ensureElement } from '../utils/utils';

export interface IBasketButton {
	setCounter(value: number): void;
	set onClick(handler: VoidFunction);
}

export class BasketButtonView implements IBasketButton {
	private element: HTMLButtonElement;
	private counter: HTMLElement;

	constructor(container: HTMLElement) {
		this.element = ensureElement<HTMLButtonElement>(
			'.header__basket',
			container
		);
		this.counter = ensureElement('.header__basket-counter', container);
	}

	setCounter(value: number) {
		this.counter.textContent = value.toString();
	}

	set onClick(handler: VoidFunction) {
		this.element.onclick = handler;
	}
}
