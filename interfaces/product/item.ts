import { IProduct } from '.';
import { IPoster } from '../poster';
import { ITag } from '../tag';

export interface IProductItem extends IProduct {
  posters: IPoster[];
  tags: ITag[];
}

export interface IProductResponse {
  message: string;
  product: IProductItem;
}
