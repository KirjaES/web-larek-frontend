import { IView } from '../view/view';
import { IModel } from '../models';
import { IProduct } from '../types';
import { EventEmitter } from '../components/base/events';
import { Events } from '../types/events';

export interface IPresenter {
	init(): void;
}

export class Presenter implements IPresenter {
	private view: IView;
	private model: IModel;
	private emitter = new EventEmitter();

	constructor(view: IView, model: IModel) {
		this.view = view;
		this.model = model;
	}

	private mountProductCard(product: IProduct) {
		const productCard = this.view.addProductCard(product);

		productCard.onClick = this.emitter.trigger<Events['cardClick']>('cardClick', product);
	}

	private mountProductModal() {
		const productModal = this.view.productModal;

		this.emitter.on<Events['cardClick']>('cardClick', (product) => {

			productModal.render(product)
			productModal.disabled = this.model.basket.has(product.id) || product.price === null
			productModal.onSubmit = () => {
				this.model.basket.addItem(product);
				this.view.productModal.disabled = true;
				this.emitter.emit<Events['basketUpdated']>('basketUpdated')
			}
			productModal.open()
		})
	}

	private mountBasketButton() {
		this.emitter.on<Events['basketUpdated']>('basketUpdated', () => {
			this.view.basketButton.setCounter(this.model.basket.getItemsCount())
		})
		this.view.basketButton.onClick = this.emitter.trigger<Events['basketOpen']>('basketOpen');
	}

	private mountBasketModal() {
		const basketModal = this.view.basketModal;
		basketModal.onSubmit = this.emitter.trigger<Events['deliveryOpen']>('deliveryOpen');

		this.emitter.on<Events['basketOpen']>('basketOpen', () => {
			basketModal.disabled = this.model.basket.getPrice() === 0;
			basketModal.counter = this.model.basket.getPrice();
			this.view.fillBasketCards(this.model.basket.getItems(), (id) => {
				this.model.basket.removeItem(id);
				basketModal.counter = this.model.basket.getPrice();
				this.emitter.emit<Events['basketUpdated']>('basketUpdated');
				this.emitter.emit<Events['basketOpen']>('basketOpen');
			});
			basketModal.render();
			basketModal.open();
		});
	}

	private mountDeliveryModal() {
		const deliveryModal = this.view.deliveryModal;

		const setModalErrors = () => {
			const deliveryDataErrors = this.model.order.validateDeliveryData();
			deliveryModal.disabled = !deliveryDataErrors.isValid;
			deliveryModal.error = deliveryDataErrors.message;
		}


		deliveryModal.onChangePaymentMethod = (val) => {
			this.model.order.paymentMethod = val;
			deliveryModal.paymentMethod = val;
			setModalErrors();
		}
		deliveryModal.onChangeAddress = (val) => {
			this.model.order.address = val;
			setModalErrors();
		}
		deliveryModal.onSubmit = this.emitter.trigger<Events['contactsOpen']>('contactsOpen');

		this.emitter.on<Events['deliveryOpen']>('deliveryOpen', () => {
			deliveryModal.addressText = this.model.order.address;
			deliveryModal.paymentMethod = this.model.order.paymentMethod;
			setModalErrors();

			deliveryModal.render();
			deliveryModal.open();
		});
	}

	private mountContactsModal() {
		const contactsModal = this.view.contactsModal;

		const setModalErrors = () => {
			const contactsDataErrors = this.model.order.validateContacts();
			contactsModal.disabled = !contactsDataErrors.isValid;
			contactsModal.error = contactsDataErrors.message;
		}

		contactsModal.onChangeEmail = (val) => {
			this.model.order.email = val;
			setModalErrors();
		}
		contactsModal.onChangePhone = (val) => {
			this.model.order.phone = val;
			setModalErrors();
		}
		contactsModal.onSubmit = () => {
			contactsModal.disabled = true;
			this.model.order.makeOrder(this.model.basket.getItems(), this.model.basket.getPrice())
				.then((data) => {
					this.model.basket.clearAll();
					this.model.order.clearAll();
					this.emitter.emit<Events['basketUpdated']>('basketUpdated');
					this.emitter.emit<Events['successOpen']>('successOpen', {total: data.total});
				})
				.catch((err) => contactsModal.error = err)
				.finally(() => {
					contactsModal.disabled = false;
				})
		};

		this.emitter.on<Events['contactsOpen']>('contactsOpen', () => {
			contactsModal.emailText = this.model.order.email;
			contactsModal.phoneText = this.model.order.phone;
			setModalErrors();

			contactsModal.render();
			contactsModal.open();
		});
	}

	private mountSuccessModal() {
		const successModal = this.view.successModal;

		successModal.onSubmit = () => {
			successModal.close();
		};

		this.emitter.on<Events['successOpen']>('successOpen', ({total}) => {
			successModal.priceText = total;
			successModal.render();
			successModal.open();
		});
	}

	async init() {
		const res = await this.model.product.fetchProducts();

		res.items.forEach((p) => this.mountProductCard(p));
		this.mountBasketModal();
		this.mountBasketButton();
		this.mountProductModal();
		this.mountDeliveryModal();
		this.mountContactsModal();
		this.mountSuccessModal();
	}
}

