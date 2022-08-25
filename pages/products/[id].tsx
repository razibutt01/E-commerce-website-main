import React from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ProductType, DetailPropsType } from "../../Components/componentTypes";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import Head from "next/head";
export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  const paths = data.map((product: ProductType) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "blue",
  },
  link2: {
    margin: "10px 0",
    fontWeight: "bold",
  },
  items: {
    fontWeight: "bold",
    alignItems: "flex-start",
    gap: "2px",
  },
  btn: {
    justifyContent: "center",
  },
});
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const res = await fetch("https://fakestoreapi.com/products/" + id);
  const data = await res.json();
  return {
    props: {
      product: data,
    },
  };
};

export default function ProductDetails({ product }: DetailPropsType) {
  const router = useRouter();
  const { dispatch } = React.useContext(Store);
  const classes = useStyles();
  const addToCartHandler = async () => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
    router.push("/cart");
  };
  return (
    <>
      <Head>
        <title>{product.category}</title>
      </Head>
      <Container>
        <NextLink href="/" passHref>
          <Link className={classes.link}>
            <Typography className={classes.link2} color="primary">
              Back to Products
            </Typography>
          </Link>
        </NextLink>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt="product image"
              width={640}
              height={640}
              layout="responsive"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography variant="h1">{product.title}</Typography>
              </ListItem>
              <ListItem className={classes.items}>
                Category: <Typography>{product.category}</Typography>
              </ListItem>
              <ListItem className={classes.items}>
                <Rating value={product.rating.rate} readOnly />(
                {product.rating.count} reviews)
              </ListItem>
              <ListItem className={classes.items}>Description:</ListItem>
              <ListItem>
                <Typography>{product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography className={classes.items}>Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem className={classes.btn}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
