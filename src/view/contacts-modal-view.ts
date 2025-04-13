import { IModal, Modal } from './modal-view';
import { cloneTemplate } from '../utils/utils';

export interface IContactsModal extends IModal{
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
	private contactsContent: HTMLElement;
	private email: HTMLInputElement;
	private phone: HTMLInputElement;
	private orderButton: HTMLButtonElement;
	private errorSpan: HTMLSpanElement;


	constructor() {
		super()

		const element = cloneTemplate<HTMLButtonElement>('#contacts');
		this.contactsContent = element;
		this.email = element.querySelector('[name="email"]');
		this.phone = element.querySelector('[name="phone"]');
		this.orderButton = element.querySelector('button');
		this.errorSpan = element.querySelector('.form__errors');
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
		if(disabled)
			this.orderButton.disabled = disabled;
		else
			this.orderButton.removeAttribute('disabled')
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
		this.setContent(this.contactsContent);
	}
}
