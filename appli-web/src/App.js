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
            <Localisation />
            <Switch>
             <Route exact path="/adminhome">
               <AdminNavBar />
             </Route>
             <Route path="/">
                <NavBar changeValue={(val) => this.handleSwitch(val)} />
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

            <Route path="/adminhome">
             <AdminHome />
           </Route>

            <Route path="/filter">
              <HomeSwitcher val={0} />
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


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    posts: state.posts.posts,
    position: state.position.position
  }
}

export default connect(mapStateToProps)(App)
