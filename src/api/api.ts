import { Api } from '../components/base/api';
import { IOrder, IOrderRequestBody, IProduct, IProductList } from '../types/api-types';

export interface IApiWebLarek {
	getProductList(): Promise<IProductList>;
	getProductById(id: string): Promise<IProduct>;
	postOrder(order: IOrderRequestBody):Promise<IOrder>;
}

export class ApiWebLarek extends Api implements IApiWebLarek {
	getProductList() {
		return this.get<IProductList>(`/product/`);
	}
	getProductById(id: string) {
		return this.get<IProduct>(`/product/${id}`);
	}
	postOrder(data: IOrderRequestBody) {
		return this.post<IOrder>('/order/', data)
	}
}
