import { IProduct } from '../product';

export interface ITag {
  id: number;
  name: string;
}

export interface ITagResponse {
  message: string;
  tags: ITag[];
}

export interface ITagWithProductResponse {
  message: string;
  tag: {
    id: number;
    name: string;
    products: IProduct[];
  };
}
