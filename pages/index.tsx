import React from "react";
import { HomePagePropsType, ProductType } from "../Components/componentTypes";
import { GetStaticProps } from "next";
import ProductsLayout from "../Components/ProductsLayout";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: ProductType[] = await res.json();
  return {
    props: {
      products: data,
    },
  };
};

const Home = ({ products }: HomePagePropsType) => {
  const [homeProducts, setHomeProducts] = React.useState<ProductType[]>([]);
  React.useEffect(() => {
    if (products?.length) {
      setHomeProducts(products);
    }
  }, [products]);
  return (
    <>{products?.length ? <ProductsLayout products={homeProducts} /> : null}</>
  );
};

export default Home;
