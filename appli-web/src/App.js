import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Views/Login.js'
import NavBar from './Views/NavBar.js'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddPost from './Views/AddPost.js'
import Home from './Views/Home.js'
import HomeSwitcher from './Views/HomeSwitcher.js'
import Profile from './Views/Profile.js'
import Filter from './Views/Filter.js'
import PostDetailView from './Views/PostDetailView.js'
import Register from './Views/Register.js'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import cookie from 'react-cookies';
import {getAllPostsFromDb} from './API/PostApi'
import {getUserFromDb} from './API/UserApi'
import {getVoteByUser} from './API/VoteApi'
import {getVoteCommentByUser} from './API/VoteApi'
import AdminHome from './Views/AdminHome.js'
import AdminNavBar from './Views/AdminNavBar.js'
import Localisation from './Views/component/Localisation.js'
import AddIcon from '@material-ui/icons/Add';

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
        posts:[],
        open:false,
        openfilter:false,
        openprofile:false,
        positionActive: false,
        width: window.innerWidth,
        height: window.innerHeight,
        currentUser:null
      };


      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
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
          this.setState({currentUser:data[0]})
          var action = { type: "TOGGLE_USER", currentUser: data[0]}
          this.props.dispatch(action)
          getVoteByUser(data[0].email).then(votes => {
            var action = { type: "TOGGLE_USER_VOTE", userVote: votes}
            this.props.dispatch(action)

          })
          getVoteCommentByUser(data[0].email).then(votes => {
            var action = { type: "TOGGLE_USER_VOTE_COMMENT", userVote: votes}
            this.props.dispatch(action)

          })
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

  updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(newProps){
    if(newProps.currentUser != this.state.currentUser){
      this.setState({currentUser:newProps.currentUser})
    }
  }


  handleSwitch(val){
    if(val==1 && !this.props.isAuth){
      this.setState({open:true})
      this.setState({vue:0})
      history.push('/')
    }
    else{
      this.setState({open:false})
      this.setState({openfilter:false})
      this.setState({openprofile:false})
      if(val==0){
        history.push('/')
        this.setState({openfilter:true})
      }
      else{
        this.setState({openprofile:true})
      }
      if(val != this.state.vue){
        this.setState({vue:val})
      }
      console.log(this.state.vue)
    }

  }



  render(){

    const isAuth = this.props.isAuth
    const currentUser = this.props.currentUser
    if(isAuth){
      myAuth.isAuthenticated = true
    }else{
      myAuth.isAuthenticated = false
    }
    if(currentUser){
      myAuth.currentUser = currentUser
    }
    else{
      myAuth.currentUser = null
    }


    return (


      <Router history={history}>
        <div>

            <Localisation />
            <Switch>
             <PrivateAdmin exact path="/adminhome">
               <AdminNavBar />
             </PrivateAdmin>
             <Route path="/">
                <NavBar changeValue={(val) => this.handleSwitch(val)} currentUser={this.state.currentUser} />
             </Route>
           </Switch>



          <Switch>
            <Route exact path="/">

              {this.state.width > 1275 ? (<HomeSwitcher val={this.state.vue} close={()=>this.setState({openfilter:false,openprofile:false})} open={this.state.open} openfilter={this.state.openfilter} openprofile={this.state.openprofile}/>) : <Home switcher={true} close={()=>this.setState({openfilter:false,openprofile:false})} open={this.state.open} openfilter={this.state.openfilter} openprofile={this.state.openprofile}  />}

            </Route>

            <Route path="/addpost">
              <AddPost />
            </Route>

            <Route path="/localisation">
              <Localisation />
            </Route>

            <PrivateRegister path="/register">
              <Register />
            </PrivateRegister>

            <PrivateLogin path="/login">
              <Login />
            </PrivateLogin>

            <PrivateAdmin exact path="/adminhome">
             <AdminHome />
            </PrivateAdmin>

             <PrivateProfile path="/profile">
              <AdminHome />
              </PrivateProfile>

            <Route path="/filter">
                  {this.state.width > 1275 ? (<HomeSwitcher val={0} close={()=>this.setState({openfilter:false,openprofile:false})} open={this.state.open} openfilter={this.state.openfilter} openprofile={this.state.openprofile}/>) : <Home switcher={true} close={()=>this.setState({openfilter:false,openprofile:false})} open={this.state.open} openfilter={this.state.openfilter} openprofile={this.state.openprofile}  />}
            </Route>

            <Route path="/postdetailview/:id" component={PostDetailView} />

          </Switch>
          </div>
      </Router>

    );
  }
}

const myAuth = {
  isAuthenticated: false,
  currentUser:null,
  authenticate(cb) {
    myAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    myAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};




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

function PrivateProfile({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        myAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PrivateAdmin({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        myAuth.currentUser ? (
          myAuth.currentUser.isAdmin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    posts: state.posts.posts,
    position: state.position.position
  }
}

export default connect(mapStateToProps)(App)
