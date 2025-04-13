import { IProduct } from '../types';
import { bem, cloneTemplate } from '../utils/utils';
import { cardCategoryMap, CDN_URL } from '../utils/constants';

export interface IProductCardView {
	render(product: IProduct, onClick?: VoidFunction): HTMLElement;
	set onClick(handler: VoidFunction);
}

export class ProductCardView implements IProductCardView {
	private element: HTMLElement;
	private category: HTMLElement;
	private title: HTMLElement;
	private image: HTMLImageElement;
	private price: HTMLElement;

	constructor() {
		this.element = cloneTemplate<HTMLButtonElement>('#card-catalog');
		this.category = this.element.querySelector('.card__category');
		this.title = this.element.querySelector('.card__title')
		this.image = this.element.querySelector('.card__image')
		this.price = this.element.querySelector('.card__price')
	}

	set onClick(onClick: VoidFunction | undefined) {
		this.element.onclick = onClick;
	}

	render(product: IProduct) {
		const categoryModify = cardCategoryMap[product.category] || 'soft';
		this.category.classList.add(bem('card', 'category', categoryModify).name);
		this.category.textContent = product.category;
		this.title.textContent = product.title;

		this.image.src = `${CDN_URL}${product.image}`;
		this.price.textContent =
			product.price !== null ? `${product.price} синапсов` : 'Бесценно';

		return this.element;
	}
}
