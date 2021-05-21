import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

//Routing pages import
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Feed from "./Component/Feed";
import Users from "./Component/Users";
import Profile_Posts from "./Component/Profile_Posts";
import Profile_Follower from './Component/Profile_Follower';
import Profile_Following from './Component/Profile_Following';
import User_Profile from './Component/User_Profile';
import ForgotPassword from './Component/ForgotPassword';


//style sheet import
import "./App.css";

function App() {
  return (
    <Router>
      <div className = "App">
        <Route exact path="/" component={Login} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/users" component={Users} /> 
        <Route exact path="/profileposts" component={Profile_Posts} /> 
        <Route exact path="/profilefollower" component={Profile_Follower} /> 
        <Route exact path="/profilefollowing" component={Profile_Following} /> 
        <Route exact path="/userprofile" component={User_Profile} /> 
      </div>
    </Router>
  );
}

export default App;


