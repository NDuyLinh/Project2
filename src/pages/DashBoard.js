import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {Preloader, Sidebar, Navbar} from '../components'
import { auth } from '../services/firebaseConfig';
import { routes } from "../routes";
import { setMembers } from "../reducer/slices/MembersSlice";

import HomePage from "./home";
import Report from "./report";
import SignIn from "./signIn";
import Register from "./register";

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
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        dispatch(setMembers({
          email: user.email,
          token: user.token
        }))
      } else {
        if(props.location.pathname === routes.home) {
          props.history.push("/login");
        }
      }
    })
  }, []);

  return (
    <Switch>
      <RouteWithSidebar exact path={routes.home} component={HomePage} title="Dashboard"/>
      <RouteWithSidebar exact path={routes.report} component={Report} title="Report"/>
      <RouteWithLoader exact path={routes.login} component={SignIn} title="CMS"/>
      <RouteWithLoader exact path={routes.register} component={Register} title="CMS"/>
      <Redirect to="/"/>
    </Switch>
  )
}
  

export default withRouter(DashBoard);
