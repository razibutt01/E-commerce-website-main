import React from "react";
import type { AppProps } from "next/app";
import Layout from "../Components/Layout";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
