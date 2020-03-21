import React, {Component} from 'react';
import { createMuiTheme, withStyles,withTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { green, blue, red , white} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getAllPostsFromDb} from '../API/PostApi'
import {getVoteByUser} from '../API/VoteApi'
import {addVote} from '../API/VoteApi'
import {filterPostDb} from '../API/PostApi'
import {votePost} from '../API/PostApi'
import RowPostView from '../Views/RowPostView'
import Filter from '../Views/Filter'
import Profile from '../Views/Profile'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import Login from './Login.js'
import Slide from '@material-ui/core/Slide';
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = theme => ({
  mainPage: {
    marginTop: 50,
    marginBottom: 50,
    color:'white',
  },
  filterView:{
    margin:0
  }
});



class Home extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      open:false,
      width: window.innerWidth,
      height: window.innerHeight,
      mobileOpen: false
    }


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

  componentWillReceiveProps(nextProps) {

    if (nextProps.open !== this.state.open) {
      this.setState({ open: nextProps.open });
    }

    if (nextProps.openfilter !== this.state.openfilter) {
      this.setState({ openfilter: nextProps.openfilter });
    }

    if (nextProps.openprofile !== this.state.openprofile) {
      this.setState({ openprofile: nextProps.openprofile });
    }
  }

  filter(filter){
    console.log(filter)
    filterPostDb(filter).then(data => {
      const posts = data
      console.log(data)
      this.setState({posts: data})

      var action = { type: "ADD_POSTS", posts: data}
      this.props.dispatch(action)
      window.scroll({top: 0, left: 0, behavior: 'smooth' })

    }).catch((error) => {
      console.log("erreur filter")
    })
  }

  handleDrawerToggle = () => {
    this.setState({openfilter:false});
    this.setState({openprofile:false});
  };

  handleClickOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open:false});
  };

  handleVote(val,post){
    console.log(post)
    if(this.props.currentUser){

      var add = "true"
      if(val=="-"){
        add="false"
      }
      const vote = {
        user:this.props.currentUser.email,
        post:post._id,
        like:add
      }
      console.log(vote)

      addVote(vote).then(data => {
        console.log(data)
        if(data.res=='exists'){
          console.log("tu as deja voté pour ce post")
        }else{
          if(data.res=="change"){
            votePost(val,post).then(res=>{
              votePost(val,post).then(data=>{
                console.log("change")
                console.log(data)
                  var posts = this.props.posts


                  var index = posts.indexOf(post);
                  if (index !== -1) {
                    if(val=="-"){
                      post.note = post.note - 2
                    }else{
                      post.note =  post.note + 2
                    }
                      posts[index] = post;
                      var action = { type: "ADD_POSTS", posts: posts}
                      this.props.dispatch(action)
                      this.setState({posts: data})
                      console.log("vote")
                      getVoteByUser(this.props.currentUser.email).then(votes => {
                        var action = { type: "TOGGLE_USER_VOTE", userVote: votes}
                        this.props.dispatch(action)

                      })
                  }
              })
            })
          }else{
            if(data.res=="correct"){
              votePost(val,post).then(data=>{
                votePost(val,post).then(data=>{
                  console.log("add")
                  console.log("change")
                  console.log(data)
                    var posts = this.props.posts


                    var index = posts.indexOf(post);
                    if (index !== -1) {
                      if(val=="-"){
                        post.note = post.note - 1
                      }else{
                        post.note =  post.note + 1
                      }
                        posts[index] = post;
                        var action = { type: "ADD_POSTS", posts: posts}
                        this.props.dispatch(action)
                        this.setState({posts: data})
                        console.log("vote")
                        getVoteByUser(this.props.currentUser.email).then(votes => {
                          var action = { type: "TOGGLE_USER_VOTE", userVote: votes}
                          this.props.dispatch(action)

                        })
                    }
                })
              })
            }
          }
        }
      })
    }
  }


  render(){

    const {classes,theme} = this.props
    return (

      <div>
      {this.state.width > 1275 ?(
        <div>
      {this.props.switcher ? (

        <div className={classes.mainPage} style={{marginRight: this.state.width>1670 ? 50 : 0 ,
        marginLeft: this.state.width>1670 ? 50 : 5}}>
        <Grid container>
        <Grid item className={classes.filterView} xs={4}>
        <Filter
          filter={(filterValue) => this.filter(filterValue)}
        />
        </Grid>


        <Grid item  xs={8}>
        {this.props.posts ? (
          <Grid container className={classes.listView} >
          {this.props.posts.map(currentPost => (
            <Grid item xs={12}>

                  <RowPostView post={currentPost}  handlevote={(val) => this.handleVote(val,currentPost)} />

            </Grid>
          )
        )}
        </Grid>
      ) : <CircularProgress />}
      </Grid>
      </Grid>
      </div>


    ) : (
      <div className={classes.mainPage}>
      <Grid container>

      <Grid item  xs={8}>
      {this.props.posts ? (
        <Grid container className={classes.listView} >
        {this.props.posts.map(currentPost => (
          <Grid item xs={12}>

                <RowPostView post={currentPost}  handlevote={(val) => this.handleVote(val,currentPost)} />

          </Grid>
        )
      )}
      </Grid>
    ) : <CircularProgress />}
    </Grid>
    <Grid item xs={4}>
    <Profile />
    </Grid>
    </Grid>
    </div>
    )}
    </div>
  ) : (



    <div className={classes.mainPage}>
    <Grid container>



    <Grid item  xs={12}>
    {this.props.posts ? (
      <Grid container className={classes.listView} >
      {this.props.posts.map(currentPost => (
        <Grid item xs={12}>

              <RowPostView post={currentPost}  handlevote={(val) => this.handleVote(val,currentPost)} />

        </Grid>
      )
    )}
    </Grid>
  ) : <CircularProgress />}
  </Grid>
  </Grid>




  <Drawer
    variant="temporary"
    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
    open={this.state.openfilter}
    onClose={this.handleDrawerToggle}
    classes={{
    paper: classes.drawerPaper,
    }}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
    >
    <Filter back={this.handleDrawerToggle}/>
    </Drawer>

    <Drawer
      variant="temporary"
      anchor={theme.direction === 'rtl' ? 'left' : 'right'}
      open={this.state.openprofile}
      onClose={this.handleDrawerToggle}
      classes={{
      paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      >
      {this.state.openprofile ? <Profile /> : null}
      </Drawer>
  </div>




  )}

    <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <Login />
    </Dialog>





    </div>
  )
}
}


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    posts: state.posts.posts,
    votes: state.votes
  }
}

export default connect(mapStateToProps)(withTheme(withStyles(useStyles)(Home)))
