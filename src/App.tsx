import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About";
import "./assets/styles.scss";
import DefaultLayout from "./layouts/DefaultLayout";
import { Button, ConfigProvider, ThemeConfig } from "antd";
import { useState } from "react";
const App = () => {
  const [theme, setTheme] = useState("light");
  const config: ThemeConfig = {
    token: {
      colorPrimary: theme === "light" ? "#64b445" : "#272a19",
    },
  };
  return (
    <>
      <Button
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        Change theme
      </Button>
      <ConfigProvider theme={config}>
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
                <Route exact path="/about" component={() => <About />} />
              </Switch>
            </DefaultLayout>
          </div>
        </Router>
      </ConfigProvider>
    </>
  );
};

export default App;
