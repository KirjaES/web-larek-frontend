import { addClass, ensureElement } from '../utils/utils';

export interface IModal {
	open(): void;
	close(): void;
	setValue(content: HTMLElement): void;
}

export class Modal implements IModal {
	private static element: HTMLElement;
	private static modalContent: HTMLElement;
	private static closeButton: HTMLButtonElement;

	constructor() {
		if(Modal.element) return;
		const element = document.getElementById('modal-container');
		element.classList.remove('modal_active');
		Modal.closeButton = ensureElement<HTMLButtonElement>('button.modal__close', element);
		Modal.modalContent = ensureElement('div.modal__content', element);

		Modal.element = element;
		this.setBaseListeners();
	}

	private setBaseListeners() {
		Modal.closeButton.onclick = this.close.bind(this);
		Modal.element.onclick = (e) => {
			if (e.target === Modal.element) {
				this.close();
			}
		};
		document.addEventListener('keyup', (e) => {
			if (e.key === 'Escape') {
				this.close();
			}
		});
	}

	open() {
		addClass(Modal.element, 'modal_active');
	}

	close() {
		Modal.element.classList.remove('modal_active');
	}

	setValue(content: HTMLElement) {
		Modal.modalContent.replaceChildren(content);
	}
}
