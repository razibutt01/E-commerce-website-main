import React from "react";
import { Container } from "@mui/system";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ProductsPropsType, ProductType } from "../Components/componentTypes";
import { makeStyles } from "@mui/styles";
import { Store } from "../utils/Store";
import Products from "../Components/Products";
const useStyles = makeStyles({
  title: {
    margin: "10px 0 10px 0",
    fontWeight: "bold",
  },
  box: {
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
  },
  text: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  category: {
    margin: "30px auto",
  },
});
export default function HomePage({ products }: ProductsPropsType) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setResults] = React.useState<ProductType[]>([]);
  const [category, setCategory] = React.useState<string>("");
  const [filteredProducts, setFilteredProducts] = React.useState<ProductType[]>(
    []
  );
  const { dispatch } = React.useContext(Store);
  const classes = useStyles();
  const addToCartHandler = async (product: ProductType) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };
  const searchKeywordHandler = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const newProduct = (
        filteredProducts.length ? filteredProducts : products
      )?.filter((product) => {
        return Object.values(product.title)
          .join("")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });

      setResults(newProduct);
    } else {
      setResults(products);
    }
  };

  const categoryHandler = (category: string) => {
    setCategory(category);
  };

  React.useEffect(() => {
    const newFilterProducts = products?.filter(
      (product) => product.category === category
    );
    setFilteredProducts(newFilterProducts);
  }, [category, products]);
  return (
    <>
      {products?.length ? (
        <Container maxWidth="lg">
          <Box className={classes.box}>
            <Box className={classes.text}>
              <Typography variant="h4" className={classes.title}>
                Products:
              </Typography>
            </Box>
            <TextField
              type="text"
              label="Search"
              placeholder="Search..."
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target !== null) {
                  searchKeywordHandler(e.target.value);
                }
              }}
              value={searchTerm}
            />
          </Box>
          <Box className={classes.category}>
            <Typography variant="h1" component="h1">
              Category:
            </Typography>
            <Select
              sx={{ width: "30%" }}
              value={category}
              onChange={(e) => categoryHandler(e.target.value)}
            >
              <MenuItem value=""> All Categories</MenuItem>
              <MenuItem value="men's clothing">Men clothing</MenuItem>
              <MenuItem value="jewelery">Jewelry</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="women's clothing">Women clothing</MenuItem>
            </Select>
          </Box>
          <Products
            products={
              category.length > 0
                ? searchTerm.length < 1
                  ? filteredProducts
                  : searchResults
                : searchTerm.length < 1
                ? products
                : searchResults
            }
            addToCartHandler={addToCartHandler}
          />
        </Container>
      ) : null}
    </>
  );
}
