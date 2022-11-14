import "../styles/globals.css";
import type { AppProps } from "next/app";
import ParentContainer from "../src/components/ParentContainer";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { useEffect } from "react";
import Modal from "../src/components/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(pageProps);
  }, []);

  return (
    <Provider store={store}>
      <ParentContainer>
        <Modal />
        <Component {...pageProps} />
      </ParentContainer>
    </Provider>
  );
}

export default MyApp;
