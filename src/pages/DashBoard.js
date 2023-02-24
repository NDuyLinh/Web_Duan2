import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import {Preloader, Sidebar, Navbar} from '../components'
import { auth } from '../services/firebaseConfig';
import { routes } from "../routes";
import { setMembers, setRole } from "../reducer/slices/MembersSlice";
import { query, where, onSnapshot } from "firebase/firestore";
import { fireStoreRef } from "../services/firebaseConfig";

import HomePage from "./home";
import Report from "./report";
import SignIn from "./signIn";
import Register from "./register";
import Members from "./members";

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

        const members = query(fireStoreRef, where("mail", "==", user.email));
        onSnapshot(members, (snapShot) => {
          let member = [];
          snapShot.docs.forEach((doc) => {
            member.push({ ...doc.data(), id: doc.id});
          })
          dispatch(setRole(member[0] && member[0].role === "admin"));
        })
        
      } else {
        if(props.location.pathname === routes.home) {
          props.history.push("/login");
        }
      }
    });


  }, []);

  return (
    <Switch>
      <RouteWithSidebar exact path={routes.home} component={HomePage} title="Dashboard"/>
      <RouteWithSidebar exact path={routes.report} component={Report} title="Report"/>
      <RouteWithSidebar exact path={routes.user} component={Members} title="CMS"/>
      <RouteWithSidebar exact path={routes.register} component={Register} title="CMS"/>
      <RouteWithLoader exact path={routes.login} component={SignIn} title="CMS"/>
      <Redirect to="/"/>
    </Switch>
  )
}
  

export default withRouter(DashBoard);
