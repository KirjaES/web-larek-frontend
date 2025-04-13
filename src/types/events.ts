import { IProduct } from './api-types';

export type Events = {
	cardClick: IProduct;
	basketUpdated: never;
	basketOpen: never;
	deliveryOpen: never;
	contactsOpen: never;
	successOpen: {
		total: number;
	};
};
