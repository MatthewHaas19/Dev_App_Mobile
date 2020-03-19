import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
import {filterPostDb} from '../API/PostApi'
import RowPostView from '../Views/RowPostView'
import Filter from '../Views/Filter'
import Profile from '../Views/Profile'
import { connect } from 'react-redux'


const useStyles = theme => ({
  mainPage: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    color:'white',
  },
  listView: {
    backgroundColor:"green",
  }
});



class Home extends React.Component {


  constructor(props){
    super(props)

  }

  filter(filter){
    console.log(filter)
    filterPostDb(filter).then(data => {
      const posts = data
      console.log(data)
      this.setState({posts: data})

      var action = { type: "ADD_POSTS", posts: data}
      this.props.dispatch(action)


    }).catch((error) => {
      console.log("erreur filter")
    })
  }

  render(){

    const {classes} = this.props

    return (

      <div>
      {this.props.switcher ? (

        <div className={classes.mainPage}>
        <Grid container>
        <Grid item className={classes.filterView} xs={4}>
        <Filter
          filter={(filterValue) => this.filter(filterValue)}
        />
        </Grid>


        <Grid item className={classes.listView} xs={8}>
        {this.props.posts ? (
          <Grid container className={classes.listView} >
          {this.props.posts.map(currentPost => (
            <Grid item xs={12}>

                  <RowPostView post={currentPost} />

            </Grid>
          )
        )}
        </Grid>
      ) : "Il n'y a pas de posts"}
      </Grid>
      </Grid>
      </div>


    ) : (
      <div className={classes.mainPage}>
      <Grid container>

      <Grid item className={classes.listView} xs={8}>
      {this.props.posts ? (
        <Grid container className={classes.listView} >
        {this.props.posts.map(currentPost => (
          <Grid item xs={12}>

                <RowPostView post={currentPost} />

          </Grid>
        )
      )}
      </Grid>
    ) : "Il n'y a pas de posts"}
    </Grid>
    <Grid item xs={4}>
    <Profile />
    </Grid>
    </Grid>
    </div>
    )}
    </div>
  )
}
}


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Home))
