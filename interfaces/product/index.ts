export interface IProduct {
  id: number;
  title: string;
  is_rocket: boolean;
  price: number;
  weight: string;
  ratio: number[];
  review: number;
  landing_url: string;
  vendor_id: string;
  item_id: string;
  thumbnail: string;
}

export interface IProductResponse {
  message: string;
  products: IProduct[];
}
