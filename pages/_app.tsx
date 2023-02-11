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
import ErrorBoundary from "src/components/ErrorBoundary";
import DrawerCard from "src/components/DrawerCard";
import Toast from "src/components/Toast";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/");
    }
    if (typeof window === "undefined") return <div></div>;
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
