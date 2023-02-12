import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Provider, useSelector } from "react-redux";
import store from "../src/redux/store";
import { useEffect } from "react";

import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);
  if (typeof window === "undefined") return <div></div>;
  return (
    <Provider store={store}>
      <div>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
