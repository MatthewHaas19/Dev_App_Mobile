import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Views/Login.js'
import NavBar from './Views/NavBar.js'
import AddPost from './Views/AddPost.js'
import Home from './Views/Home.js'
import Profile from './Views/Profile.js'
import Filter from './Views/Filter.js'

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




  render(){

    const users = this.state.data.map((n,key) => {
      return <p>{n.username}</p>;
    });


    return (


      <Router history={history}>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <Home />
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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb,100)
  },
  signout(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb,100)
  }
}

function PrivateProfile({ children, ...rest }) {
  return (
    <Route
    {...rest}
    render={({location}) =>
      fakeAuth.isAuthenticated ? (
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
      !fakeAuth.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to = {{
            pathname: "/profile",
            state: { from: location}
          }}
        />
      )
    }
    />
  )
}

export default App;
