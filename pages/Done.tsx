import { Container, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";

export default function Done() {
  return (
    <Container>
      <Typography component="h1" variant="h1" align="center">
        Done!
      </Typography>
      <Typography component="h1" variant="h1" align="center">
        <NextLink href="/" passHref>
          <Link>Go To Shopping</Link>
        </NextLink>
      </Typography>
    </Container>
  );
}
