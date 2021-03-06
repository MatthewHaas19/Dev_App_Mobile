import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { green, blue, red , white} from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getAllPostsFromDb} from '../API/PostApi'
import {getAllCommentFromPost} from '../API/CommentApi'
import {getAllReportFromPost} from '../API/ReportApi'
import RowPostViewAdmin from '../Views/RowPostViewAdmin'
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = theme => ({

  mainPage: {
    backgroundColor: "#7bbcc0",
    width: 800,
    height: 500,
    color: "white",
  },
  scollableView: {
    backgroundColor: "#7bbcc0",

  },
  maintitle: {
    marginLeft: 20,
    fontSize:40,
  }

});




class AdminPostsUser extends React.Component {
  state = {
    currentPostAction: {},
    openMenu: false,
  }

  constructor(props){
    super(props)

  }


  render(){


    const {classes} = this.props



    return (



      <div className={classes.mainPage}>
      <Typography component="h3" variant="p" className={classes.maintitle} > Posts de l'utilisateur </Typography>


      <Typography component="h3" variant="p" className={classes.title} align="center" > Utilisateur : {this.props.userAdmin.username} </Typography>
      <br /><br />
      <Grid container className={classes.scollableView}>
      <Grid xs={2}>
      </Grid>
      <Grid xs={8}>
      {  this.props.infosHome.posts.filter(post => post.user == this.props.userAdmin.email).reverse().map(currentPostUser => (
          <RowPostViewAdmin
          post={currentPostUser}
          postHasBeenDeleted={() => {
            const newPosts2 = this.props.infosHome.posts.filter(post => post._id !== currentPostUser._id);
            const newComments = this.props.infosHome.comments.filter(comment => comment.postId !== currentPostUser._id)
            const newUser = this.props.infosHome.users
            var action = { type: "TOGGLE_ADMIN_INFOS", listInfos: {posts:newPosts2,comments:newComments,users:newUser }}
            this.props.dispatch(action)

          }}

           />
      ))}
      <br /><br />
      </Grid>
      <Grid xs={2}>

      </Grid>
      </Grid>

      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    userAdmin: state.userAdmin.user,
    adminListPost: state.posts.adminListPost,
    infosHome: state.adminHome.infos,

  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminPostsUser))
