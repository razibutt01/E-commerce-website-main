import React from "react";
import Head from "next/head";
import { NextComponentType, NextPageContext } from "next";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Badge,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PublicIcon from "@mui/icons-material/Public";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Store } from "../utils/Store";
import MaterialUISwitch from "./MuiSwitch";
import { LayoutPropType } from "./componentTypes";

const useStyles = makeStyles({
  head: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  icon: {
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    marginTop: "30px",
  },
  brand: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
  },
});

export default function Layout({ children }: LayoutPropType) {
  const { state, dispatch } = React.useContext(Store);
  const { darkMode, cart } = state;

  console.log(cart);
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  };

  return (
    <div>
      <Head>
        <title>E-commerce</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar color="secondary" position="sticky">
          <Toolbar>
            <Box className={classes.head}>
              <NextLink href="/" passHref>
                <Link className={classes.link}>
                  <Typography className={classes.brand}>
                    <PublicIcon fontSize="small" />
                    E-commerce
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <MaterialUISwitch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            />

            <NextLink href="/cart" passHref>
              <Link className={classes.link}>
                {cart.cartItems.length > 0 ? (
                  <Badge badgeContent={cart.cartItems.length} color="error">
                    <ShoppingCartIcon className={classes.icon} />
                  </Badge>
                ) : (
                  <ShoppingCartIcon className={classes.icon} />
                )}
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
        <footer className={classes.footer}>
          <Typography>@Copyrights 2022 E-commerce</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
