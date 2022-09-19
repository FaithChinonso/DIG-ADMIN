import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import InnerNav from "../src/components/InnerNav";
import SideNav from "../src/components/SideNav";
import ParentContainer from "../src/components/ParentContainer";
import styles from "../styles/Home.module.css";
import Dashboard from "./dashboard";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="admin Dashboard" content="Admin dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ParentContainer>
          <div className="flex flex-row w-full max-h-screen overflow-y-auto max-w-screen">
            <SideNav />
            <Dashboard />
          </div>
        </ParentContainer>
      </body>
    </div>
  );
};

export default Home;
