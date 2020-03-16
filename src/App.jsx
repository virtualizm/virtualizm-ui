import React, { useState } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Main from "./features/Main";
import Auth from "./features/pages/Auth";
import { StoreProvider } from "./components/StoreProvider";
import "antd/dist/antd.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <StoreProvider>
      <HashRouter>
        <Switch>
          <Route path="/auth">
            <Auth authStatus={{ isAuthenticated, setIsAuthenticated }} />
          </Route>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Switch>
      </HashRouter>
    </StoreProvider>
  );
}

export default App;
