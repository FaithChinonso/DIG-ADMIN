import "regenerator-runtime/runtime";
import Head from "next/head";
import SignUp from "../src/components/signupPage";
import { Provider } from "react-redux";
import store from "../src/redux/store/index";
import { Main } from "next/document";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="Admin" content="Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUp />
      </main>
    </div>
  );
};

export default Home;
