import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Main from './components/Main';
import { StoreProvider } from './StoreProvider';
import Auth from './components/pages/Auth';
import './App.css';

import {
  Switch,
  Route,
  Redirect,
  HashRouter
} from "react-router-dom";


const useStyles = makeStyles({
  rootContainer: {
    padding: '0 !important',
    minHeight: '100vh'
  },
  grid: {
    minHeight: '100vh'
  },
  table: {
    width: '100%',
    flexGrow: '1'
  },
  paper: {
    minHeight: '100vh'
  },
  formControl: {
    width: 100,
    marginRight: 20
  }
});


function App() {
  const classes = useStyles();

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
                          pathname: "/#auth",
                          state: { from: location }
                        }}
                    />
                )
            }
        />
    );
  }

  return (
    <StoreProvider>
      <div className="App">
        <Box height='100%' className={classes.rootContainer}>
          <HashRouter>
            <Switch>
              <Route path="/#auth">
                <Auth authStatus={{isAuthenticated, setIsAuthenticated}} />
              </Route>
              <PrivateRoute path="/">
                <Main />
              </PrivateRoute>
            </Switch>
          </HashRouter>
        </Box>
      </div>
    </StoreProvider>
  );
}

export default App;
