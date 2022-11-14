import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {Preloader, Sidebar} from '../components'
import {Navbar, Container} from 'react-bootstrap';
import HomePage from "./home";
import Members from "./members";
import SignIn from "./signIn";

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Component {...props} />
      </>
    )}
    />
  );
};

const DashBoard = () => (
  <Switch>
    <RouteWithSidebar exact path='/' component={SignIn} title="CMS"/>
    <RouteWithSidebar exact path='/members' component={Members} title=""/>
    <RouteWithSidebar exact path='/stadium' component={Members} title=""/>
    <Redirect to="/"/>
  </Switch>
);

export default DashBoard;
