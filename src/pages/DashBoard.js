import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {Preloader, Sidebar} from '../components'
import {Navbar, Container} from 'react-bootstrap';
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
          {rest.title && (<Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
            <Container fluid className="px-0">
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex align-items-center">
                  <h1 className="h2">{rest.title}</h1>
                </div>
              </div>
            </Container>
          </Navbar>)}
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
      if(user) {

      } else {
        props.history.push("/login");
      }
    })
  }, [])

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
