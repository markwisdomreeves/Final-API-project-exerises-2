import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/register"/> } />
        <Route path="/register" exact render={props => <Register {...props}/> } />
      </Switch>
    </Fragment>
  );
}

export default App;
