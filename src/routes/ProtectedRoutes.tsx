import { Route, Switch } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../components/Home/Home";
import About from "../components/About";

const ProtectedRoutes = () => {
  return (
    <DefaultLayout>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/about" component={() => <About />} />
      </Switch>
    </DefaultLayout>
  );
};

export default ProtectedRoutes;
