import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Rating,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ProductType } from "./componentTypes";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  title: {
    margin: "10px 0 10px 0",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
    alignItems: "center",
  },
});
type productsPropsType = {
  products: ProductType[];
  addToCartHandler: (product: ProductType) => Promise<void>;
};

export default function Products({
  products,
  addToCartHandler,
}: productsPropsType) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {products.length > 0 ? (
        products?.map((product: ProductType) => (
          <Grid item md={4} key={product.id}>
            <Card>
              <Link href={`/products/${product.id}`} passHref>
                <CardActionArea>
                  <CardMedia component="image">
                    <Image
                      src={product.image}
                      alt="products images"
                      width={350}
                      height={350}
                      layout="responsive"
                    />
                    <CardContent>
                      <Box>
                        <Typography className={classes.bold}>Name:</Typography>
                        <Typography>
                          {product.title
                            .slice(0, 25)
                            .toUpperCase()
                            .concat("...")}
                        </Typography>
                        <Rating value={product.rating.rate} readOnly />
                      </Box>
                    </CardContent>
                  </CardMedia>
                </CardActionArea>
              </Link>
              <CardActions>
                <Typography className={classes.bold}>
                  ${product.price}
                </Typography>
                <Button size="small" onClick={() => addToCartHandler(product)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography align="center" sx={{ marginLeft: "450px" }}>
          Opppss.... no Such Product is Here{" "}
        </Typography>
      )}
    </Grid>
  );
}
