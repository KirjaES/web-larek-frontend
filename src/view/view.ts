import { IProduct } from '../types';
import { IProductModal, ProductModalView } from './product-modal-view';
import { BasketModalView, IBasketModal } from './basket-modal-view';
import { ProductCardView } from './product-card-view';
import { BasketButtonView, IBasketButton } from './basket-button-view';
import { BasketCardView } from './basket-card-view';
import { DeliveryModalView, IDeliveryModal } from './delivery-modal-view';
import { ContactsModalView, IContactsModal } from './contacts-modal-view';
import { ISuccessModal, SuccessModalView } from './success-modal-view';


export interface IView {
	addProductCard(product: IProduct, onClick?: VoidFunction): ProductCardView;
	fillBasketCards(
		products: IProduct[],
		onClick?: (id: IProduct['id']) => void
	): void;
	basketButton: IBasketButton;
	productModal: IProductModal;
	basketModal: IBasketModal;
	deliveryModal: IDeliveryModal;
	contactsModal: IContactsModal;
	successModal: ISuccessModal;
}

export class View implements IView {
	private mainContainer: HTMLElement;
	basketButton: IBasketButton;
	productModal: IProductModal;
	basketModal: IBasketModal;
	deliveryModal: IDeliveryModal;
	contactsModal: IContactsModal;
	successModal: ISuccessModal;

	constructor(mainContainer: HTMLElement, headerContainer: HTMLElement) {
		this.mainContainer = mainContainer;
		this.basketButton = new BasketButtonView(headerContainer);
		this.productModal = new ProductModalView();
		this.basketModal = new BasketModalView();
		this.deliveryModal = new DeliveryModalView();
		this.contactsModal = new ContactsModalView();
		this.successModal = new SuccessModalView();
	}

	addProductCard(product: IProduct, onClick?: VoidFunction) {
		const card = new ProductCardView();
		card.onClick = onClick;
		this.mainContainer.appendChild(card.render(product));
		return card;
	}

	fillBasketCards(
		products: IProduct[],
		onDelete: (id: IProduct['id']) => void
	) {
		const cards = products.map(
			(p, index) => {
				const card = new BasketCardView();
				card.onDelete = () => onDelete(p.id)

				return card.render({
					index: index + 1,
					title: p.title,
					price: p.price,
				});
			}
		);
		this.basketModal.setValue(...cards);
	}
}
