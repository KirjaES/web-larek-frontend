import { IProduct } from '../types';
import { IModal, Modal } from './modal-view';
import { bem, cloneTemplate } from '../utils/utils';
import { cardCategoryMap, CDN_URL } from '../utils/constants';

export interface IProductModal extends IModal {
	render(product: IProduct): void;
	set onSubmit(onSubmit: VoidFunction | undefined);
	set disabled(disabled: boolean);
}

export class ProductModalView extends Modal implements IProductModal {
	private productContent: HTMLElement;

	constructor() {
		super()
	}

	render(product: IProduct) {
		const element = cloneTemplate<HTMLButtonElement>('#card-preview');

		const categoryElement = element.querySelector('.card__category');
		const categoryModify = cardCategoryMap[product.category] || 'soft';
		categoryElement.classList.add(bem('card', 'category', categoryModify).name);
		categoryElement.textContent = product.category;

		element.querySelector('.card__title').textContent = product.title;
		element.querySelector('.card__text').textContent = product.description;
		(
			element.querySelector('.card__image') as HTMLImageElement
		).src = `${CDN_URL}${product.image}`;
		element.querySelector('.card__price').textContent =
			product.price !== null ? `${product.price} синапсов` : 'Бесценно';

		this.productContent = element;
		this.setContent(element);
	}

	set onSubmit(handler: VoidFunction) {
		(this.productContent.querySelector('.card__button') as HTMLButtonElement).onclick = handler;
	}

	set disabled(disabled: boolean) {
		const button = (this.productContent.querySelector('.card__button') as HTMLButtonElement);
		if(disabled)
			button.disabled = disabled;
		else
			button.removeAttribute('disabled')
	}
}
