import { Route, Switch } from "react-router-dom";
import DefaultLayoutLogin from "../layouts/DefaultLayoutLogin";
import Login from "../views/Login";
import routesObject from "../utils/routes";
import Zalo from "../views/Login/Zalo";

const PublicRoutes = () => {
  return (
    <DefaultLayoutLogin>
      <Switch>
        <Route exact path={routesObject.login} component={() => <Login />} />
        <Route
          exact
          path={routesObject.loginWithZalo}
          component={() => <Zalo />}
        />
      </Switch>
    </DefaultLayoutLogin>
  );
};

export default PublicRoutes;
