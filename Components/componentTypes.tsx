export type ProductType = {
  [x: string]: any;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
export type ProductsPropsType = {
  products: ProductType[];
};
export type DetailPropsType = {
  product: ProductType;
};
