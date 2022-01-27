import { IProduct } from '.';
import { IPoster } from '../poster';
import { ITag } from '../tag';
import { IVideo } from '../video';

export interface IProductItem extends IProduct {
  posters: IPoster[];
  tags: ITag[];
  videos: IVideo[];
}

export interface IProductResponse {
  message: string;
  product: IProductItem;
}
