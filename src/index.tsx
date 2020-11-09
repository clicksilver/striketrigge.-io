import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import JoinPage from "./components/JoinPage";
import React from "react";
import ReactDOM from "react-dom";

const serverURL = process.env.REACT_APP_URL ?? "http://localhost:8000";

const App = () => (
  
  // This is the entrypoint for our app: a Router which will direct us to either
  // * the Home page, which has a create game button
  // * the Join page, which is parametrized by a matchID and playerID to join as

  <Router>
    <Switch>
      <Route exact path="/join/:matchID/:player">
        <JoinPage serverURL={serverURL} />
      </Route>
      <Route exact path="/">
        <HomePage serverURL={serverURL} />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
