import "regenerator-runtime/runtime";
import SignUp from "src/components/signupPage";
import MyDocument from "./_document";
const Home = () => {
  if (typeof window === "undefined") return <div></div>;
  return <SignUp />;
};

export default Home;
