import "regenerator-runtime/runtime";
import Head from "next/head";
import SignUp from "../src/components/signupPage";
import { Provider } from "react-redux";
import store from "../src/redux/store/index";

const Home = () => {
  return (
    <Provider store={store}>
      <div>
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
