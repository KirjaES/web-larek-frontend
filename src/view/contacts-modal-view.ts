import { IModal, Modal } from './modal-view';
import { cloneTemplate, ensureElement } from '../utils/utils';

export interface IContactsModal extends IModal {
	set disabled(val: boolean);
	set onSubmit(fn: VoidFunction);
	set onChangeEmail(fn: (val: string) => void);
	set onChangePhone(fn: (val: string) => void);
	set error(val: string | undefined);
	set emailText(val: string);
	set phoneText(val: string);
	render(): void;
}

export class ContactsModalView extends Modal implements IContactsModal {
	private element: HTMLElement;
	private email: HTMLInputElement;
	private phone: HTMLInputElement;
	private orderButton: HTMLButtonElement;
	private errorSpan: HTMLSpanElement;

	constructor() {
		super();

		const element = cloneTemplate<HTMLButtonElement>('#contacts');
		this.email = ensureElement<HTMLInputElement>('[name="email"]', element);
		this.phone = ensureElement<HTMLInputElement>('[name="phone"]', element);
		this.orderButton = ensureElement<HTMLButtonElement>('button', element);
		this.errorSpan = ensureElement('.form__errors', element);
		this.element = element;
	}

	set onChangeEmail(fn: (val: string) => void) {
		this.email.oninput = (e) => fn((e.target as HTMLInputElement).value);
	}

	set onChangePhone(fn: (val: string) => void) {
		this.phone.oninput = (e) => fn((e.target as HTMLInputElement).value);
	}

	set onSubmit(handler: VoidFunction) {
		this.orderButton.onclick = (e) => {
			e.preventDefault();
			handler();
		};
	}

	set disabled(disabled: boolean) {
		if (disabled) this.orderButton.disabled = disabled;
		else this.orderButton.removeAttribute('disabled');
	}

	set emailText(val: string) {
		this.email.value = val;
	}

	set phoneText(val: string) {
		this.phone.value = val;
	}

	set error(val: string | undefined) {
		this.errorSpan.textContent = val;
	}

	render() {
		super.setValue(this.element);
	}
}
