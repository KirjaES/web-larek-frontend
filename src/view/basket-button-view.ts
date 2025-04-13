import { bem } from '../utils/utils';

export interface IBasketButton {
	setCounter(value: number): void;
	set onClick(handler: VoidFunction)
}

const elementsClasses = {
	basketButton: bem('header', 'basket'),
	basketCounter: '.header__basket-counter',
}

export class BasketButtonView implements IBasketButton {
	private button: HTMLButtonElement;
	private counter: HTMLElement;

	constructor(container: HTMLElement) {
		this.button = container.querySelector(elementsClasses.basketButton.class) as HTMLButtonElement;
		this.counter = container.querySelector(elementsClasses.basketCounter) as HTMLElement;
	}

	setCounter(value: number) {
		this.counter.textContent = value.toString();
	}

	set onClick(handler: VoidFunction) {
		this.button.onclick = handler;
	}
}
