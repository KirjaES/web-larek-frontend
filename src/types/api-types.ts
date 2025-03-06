export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IProductList {
	total: number;
	products: IProduct[];
}

export interface IOrder {
	id: string;
	total: number
}
