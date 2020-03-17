import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Views/Login.js'
import NavBar from './Views/NavBar.js'
import AddPost from './Views/AddPost.js'
import Home from './Views/Home.js'
import Profile from './Views/Profile.js'
import Filter from './Views/Filter.js'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import cookie from 'react-cookies';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import history from './history'
import {store} from './Store/store'

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

  componentDidMount() {
    fetch('https://dev-mobile-ig.herokuapp.com/users/users',{
    method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ data })
      });
  }


  componentWillMount() {
    var cooki = cookie.load('userId')
    if(cooki){
      var action = { type: "TOGGLE_AUTH"}
      this.props.dispatch(action)
    }
  }


  render(){

    const isAuth = this.props.isAuth

    if(isAuth){
      myAuth.isAuthenticated = true
    }else{
      myAuth.isAuthenticated = false
    }

    return (


      <Router history={history}>
        <div>
           <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/addpost">
              <AddPost />
            </Route>

            <PrivateLogin path="/login">
              <Login />
            </PrivateLogin>

            <PrivateLogin path="/filter">
              <Filter />
            </PrivateLogin>

            <PrivateProfile path="/profile">
              <Profile />
            </PrivateProfile>

          </Switch>
          </div>
      </Router>

    );
  }
}

const myAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    myAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    myAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


function PrivateProfile({ children, ...rest }) {
  return (
    <Route
    {...rest}
    render={({location}) =>
      myAuth.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to = {{
            pathname: "/login",
            state: { from: location}
          }}
        />
      )
    }
    />
  )
}



function PrivateLogin({ children, ...rest }) {
  return (
    <Route
    {...rest}
    render={({location}) =>
      myAuth.isAuthenticated ? (
        <Redirect
          to = {{
            pathname: "/profile",
            state: { from: location}
          }}
        />
      ) : (
        children
      )
    }
    />
  )
}


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(App)
