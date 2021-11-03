import { IProduct } from '../product';

export interface ITag {
  id: number;
  name: string;
}

export interface ITagWithProductResponse {
  message: string;
  tag: {
    id: number;
    name: string;
    products: IProduct[];
  };
}
