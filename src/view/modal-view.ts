export type ModalListeners = {
	onClose?(): void;
	onSubmit?(): void;
};

export interface IModal {
	open(): void;
	close(): void;
	setContent(content: HTMLElement): void;
	setListeners(listeners: ModalListeners): void;
}

export class Modal implements IModal {
	private element: HTMLElement;

	constructor() {
		const element = document.getElementById('modal-container');

		if (element.classList.contains('modal_active')) {
			element.classList.remove('modal_active');
		}

		(
			element.querySelector('button.modal__close') as HTMLButtonElement
		).onclick = this.close.bind(this);
		element.onclick = (e) => {
			if(e.target === element) {
				this.close();
			}
		};
		document.addEventListener('keyup', (e) => {
			if(e.key === 'Escape') {
				this.close();
			}
		})

		this.element = element;
	}

	open() {
		if (!this.element.classList.contains('modal_active')) {
			this.element.classList.add('modal_active');
		}
	}

	close() {
		if (this.element.classList.contains('modal_active')) {
			this.element.classList.remove('modal_active');
		}
	}

	setListeners(listeners: ModalListeners) {
		(
			this.element.querySelector('button.modal__close') as HTMLButtonElement
		).onclick = listeners.onClose;
		this.element.onclick = (e) => {
			if(e.target === this.element) {
				listeners.onClose()
			}
		};
	}

	setContent(content: HTMLElement) {
		this.element.querySelector('div.modal__content').replaceChildren(content);
	}
}
