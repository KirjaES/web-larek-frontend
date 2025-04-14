import { IProduct } from '../types';
import { IModal, Modal } from './modal-view';
import { addClass, bem, cloneTemplate, ensureElement } from '../utils/utils';
import { cardCategoryMap, CDN_URL } from '../utils/constants';

export interface IProductModal extends IModal{
	render(product: IProduct): void;
	set onSubmit(onSubmit: VoidFunction | undefined);
	set disabled(disabled: boolean);
}

export class ProductModalView extends Modal implements IProductModal {
	private element: HTMLElement;
	private category: HTMLElement;
	private title: HTMLElement;
	private cardText: HTMLElement;
	private image: HTMLImageElement;
	private price: HTMLElement;
	private button: HTMLButtonElement;

	constructor() {
		super();

		const element = cloneTemplate<HTMLButtonElement>('#card-preview');
		this.category = ensureElement('.card__category', element);
		this.title = ensureElement('.card__title', element);
		this.cardText = ensureElement('.card__text', element);
		this.image = ensureElement<HTMLImageElement>('.card__image', element);
		this.price = ensureElement('.card__price', element);
		this.button = ensureElement<HTMLButtonElement>('.card__button', element);
		this.element = element;
	}

	set onSubmit(handler: VoidFunction) {
		this.button.onclick = handler;
	}

	set disabled(disabled: boolean) {
		if (disabled) this.button.disabled = disabled;
		else this.button.removeAttribute('disabled');
	}

	render(product: IProduct) {
		const categoryModify = cardCategoryMap[product.category] || 'soft';
		addClass(this.category, bem('card', 'category', categoryModify).name);
		this.category.textContent = product.category;

		this.title.textContent = product.title;
		this.cardText.textContent = product.description;
		this.image.src = `${CDN_URL}${product.image}`;
		this.price.textContent =
			product.price !== null ? `${product.price} синапсов` : 'Бесценно';

		super.setValue(this.element);
	}
}
