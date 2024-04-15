import "./assets/styles.scss";
import { ConfigProvider, ThemeConfig } from "antd";
// import ProtectedRoutes from "./routes/ProtectedRoutes";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useState } from "react";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState("light");
  const config: ThemeConfig = {
    token: {
      colorPrimary: theme === "light" ? "#64b445" : "#64b445",
      fontFamily: "Inter",
    },
  };
  return (
    <>
      {/* <Button
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        Change theme
      </Button> */}
      <ConfigProvider theme={config}>
        {/* <Router>
          <DefaultLayout>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route exact path="/about" component={() => <About />} />
            </Switch>
          </DefaultLayout>
        </Router> */}
        <BrowserRouter>
          {/* <PublicRoutes /> */}
          <ProtectedRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
};

export default App;
