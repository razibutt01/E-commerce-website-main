import React from "react";
import { ProductsPropsType, ProductType } from "../Components/componentTypes";
import { GetStaticProps } from "next";
import HomePage from "../Components/HomePage";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: ProductType[] = await res.json();
  return {
    props: {
      products: data,
    },
  };
};

const Home = ({ products }: ProductsPropsType) => {
  const [homeProducts, setHomeProducts] = React.useState<ProductType[]>([]);
  React.useEffect(() => {
    if (products?.length) {
      setHomeProducts(products);
    }
  }, [products]);
  return <>{products?.length ? <HomePage products={homeProducts} /> : null}</>;
};

export default Home;
