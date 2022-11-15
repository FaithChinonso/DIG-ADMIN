import "regenerator-runtime/runtime";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import SignUp from "./signupPage";
import { Provider } from "react-redux";
import store from "../src/redux/store/index";

const Home = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Head>
          <title>Admin Dashboard</title>
          <meta name="Admin" content="Admin" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <SignUp />
      </div>
    </Provider>
  );
};

export default Home;
