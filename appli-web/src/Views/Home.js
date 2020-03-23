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
import AddPost from './AddPost.js'
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
      openAdd:false,
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

      var res = []

      for(var i=0;i<posts.length;i++){
        if(this.getDistance(posts[i].localisation)<filter.localisation){
          res.push(posts[i])
        }
      }



      this.setState({posts: res})

      var action = { type: "ADD_POSTS", posts: res}
      this.props.dispatch(action)
      window.scroll({top: 0, left: 0, behavior: 'smooth' })

    }).catch((error) => {
      console.log("erreur filter")
    })
  }

  getDistance(postPosition){
    var userPosition = this.props.position

    if(postPosition.length>1){
      if(postPosition[0] && postPosition[1]){
        return parseInt(this.distance(postPosition[0],postPosition[1],userPosition.latitude,userPosition.longitude,"K"))
      }
    }
    return "Not known"
  }

  distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}



  handleDrawerToggle = () => {
    this.setState({openfilter:false});
    this.setState({openprofile:false});
    this.props.close()
  };

  handleClickOpen = () => {
    this.setState({open:true});
  };

  handleClickOpenAdd = () => {
    this.setState({openAdd:true});
  };

  handleClose = () => {
    this.setState({open:false,openAdd:false});
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
                  console.log("add")
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
    <Profile openAddPost={this.handleClickOpenAdd} />
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
    <Filter back={this.handleDrawerToggle} filter={(filterValue) => this.filter(filterValue)}/>
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
      {this.state.openprofile ? <Profile openAddPost={this.handleClickOpenAdd}/> : null}
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

    <Dialog
        open={this.state.openAdd}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <AddPost back={this.handleClose} />
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
    votes: state.votes,
    position: state.position.position
  }
}

export default connect(mapStateToProps)(withTheme(withStyles(useStyles)(Home)))
