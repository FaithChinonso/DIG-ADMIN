import "../styles/globals.css";
import type { AppProps } from "next/app";
import ParentContainer from "../src/components/ParentContainer";
import { Provider, useSelector } from "react-redux";
import store from "../src/redux/store";
import { useEffect } from "react";
import Modal from "../src/components/Modal";
import { ReactNode } from "react";
import Head from "next/head";
import type { ReactElement } from "react";
import Loader from "src/components/Loader";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const securePage = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/");
      }
    };
    securePage();
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Head>
          {" "}
          <title>Admin Dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Modal />
        <Loader />

        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
