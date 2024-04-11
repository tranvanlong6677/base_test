import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import routesObject from "../utils/routes";
import { useEffect } from "react";
import PublicRoutes from "./PublicRoutes";
import Home from "../views/Home/Home";
import About from "../views/About";
import QuestionsBank from "../views/QuestionsBank";

const ProtectedRoutes = () => {
  const history = useHistory();
  const location = useLocation();
  const user: string | null = localStorage.getItem("access_token");
  useEffect(() => {
    if (user === null) {
      history.push(routesObject.login);
    }
    if (
      user !== null &&
      !Object.values(routesObject).includes(location.pathname)
    ) {
      history.push(routesObject.home);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      {user === null ? (
        <PublicRoutes />
      ) : (
        <DefaultLayout>
          <Switch>
            <Route exact path={routesObject.home} component={() => <Home />} />
            <Route
              exact
              path={routesObject.about}
              component={() => <About />}
            />
            <Route
              exact
              path={routesObject.questionsBank}
              component={() => <QuestionsBank />}
            />
          </Switch>
        </DefaultLayout>
      )}
    </>
  );
};

export default ProtectedRoutes;
