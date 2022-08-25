import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Image from "next/image";
import { ProductType } from "../Components/componentTypes";
import { SelectChangeEvent } from "@mui/material/Select";
import Head from "next/head";
import ResponsiveDialog from "../Components/PopUp";

export default function cart() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = React.useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = (
    item: ProductType,
    quantity: SelectChangeEvent<any>
  ) => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item: ProductType) => {
    console.log("called");
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <>
      <Head>
        <title>Shopping | Cart</title>
      </Head>

      <Container>
        <Typography component="h1" variant="h1">
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Box>
            Cart Is Empty <NextLink href="/">Go to Homepage</NextLink>
          </Box>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <NextLink href={`products/${item.id}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={50}
                                height={50}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <NextLink href={`products/${item.id}`} passHref>
                            <Link>
                              <Typography>{item.title}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell align="right">
                          <Select
                            value={item.quantity}
                            onChange={(e: SelectChangeEvent<any>) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.id).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => removeItemHandler(item)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography component="h1" variant="h1">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : ${" "}
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ResponsiveDialog />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
