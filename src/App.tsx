import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About";
import "./assets/styles.scss";
import DefaultLayout from "./layouts/DefaultLayout";

const App = () => {
  return (
    <>
      <Router>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <DefaultLayout>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </DefaultLayout>
        </div>
      </Router>
    </>
  );
};

export default App;
