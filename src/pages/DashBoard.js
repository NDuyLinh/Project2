import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {Preloader, Sidebar, Navbar} from '../components'
import { auth } from '../services/firebaseConfig';

import HomePage from "./home";
import Members from "./members";
import SignIn from "./signIn";

const RouteWithLoader = ({ component: Component, ...rest }) => {
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
        <Sidebar />

        <main className="content">
          <Navbar/>
          <Component {...props} />
        </main>
      </>
    )}
    />
  );
};


const DashBoard = (props) => {
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if(user) {

      } else {
        props.history.push("/login");
      }
    })
  }, []);

  return (
    <Switch>
      <RouteWithSidebar exact path='/' component={HomePage} title="Dashboard"/>
      <RouteWithLoader exact path='/login' component={SignIn} title="CMS"/>
      <RouteWithSidebar exact path='/members' component={Members} title=""/>
      <RouteWithSidebar exact path='/stadium' component={Members} title=""/>
      <Redirect to="/"/>
    </Switch>
  )
}
  

export default withRouter(DashBoard);
