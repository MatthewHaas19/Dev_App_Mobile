import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Views/Login.js'
import NavBar from './Views/NavBar.js'
import AddPost from './Views/AddPost.js'
import Home from './Views/Home.js'
import HomeSwitcher from './Views/HomeSwitcher.js'
import Profile from './Views/Profile.js'
import Filter from './Views/Filter.js'
import PostDetailView from './Views/PostDetailView.js'
import PostDetailViewTest from './Views/PostDetailViewTest.js'
import Register from './Views/Register.js'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import cookie from 'react-cookies';
import {getAllPostsFromDb} from './API/PostApi'
import {getUserFromDb} from './API/UserApi'
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
        data: [],
        vue: 0,
        posts:[]
      };
    }

  componentDidMount() {
    fetch('https://dev-mobile-ig.herokuapp.com/users/users',{
    method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        this.setState({ data })
      });
  }


  componentWillMount() {
    var cooki = cookie.load('userId')
    if(cooki){
      var action = { type: "TOGGLE_AUTH"}
      this.props.dispatch(action)


      getUserFromDb(cooki)
        .then(data => {
          var action = { type: "TOGGLE_USER", currentUser: data[0]}
          this.props.dispatch(action)
        })


    }else{
      var action = { type: "TOGGLE_UNAUTH"}
      this.props.dispatch(action)
    }
    getAllPostsFromDb().then(data => {
      const posts = data
      this.setState({posts: data})
      console.log(data)

      var action = { type: "ADD_POSTS", posts: data}
      this.props.dispatch(action)

    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
  }

  handleSwitch(val){
    if(val==1 && !this.props.isAuth){
      history.push('/login')
    }
    else{
      if(val==0){
        history.push('/')
      }

      if(val != this.state.vue){
        this.setState({vue:val})
      }
      console.log(this.state.vue)
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
           <NavBar changeValue={(val) => this.handleSwitch(val)} />
          <Switch>
            <Route exact path="/">
              <HomeSwitcher val={this.state.vue} />
            </Route>

            <Route path="/addpost">
              <AddPost />
            </Route>

            <PrivateRegister path="/register">
              <Register />
            </PrivateRegister>

            <PrivateLogin path="/login">
              <Login />
            </PrivateLogin>

            <Route path="/filter">
              <HomeSwitcher val={0} />
            </Route>

            <Route path="/postdetailview/:id" component={PostDetailView} />

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


function PrivateRegister({ children, ...rest }) {
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
    currentUser: state.user.currentUser,
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps)(App)
