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
import {getPostById} from '../API/PostApi'
import {getAllCommentFromPost} from '../API/CommentApi'
import {getAllReportFromPost} from '../API/ReportApi'
import RowPostView from '../Views/RowPostView'
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

const useStyles = theme => ({

  mainPage: {
    backgroundColor: "#FAA65F",
    width: 1000,
    height: 500,
    color: "black",

  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 20,
    marginTop:30,
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
    fontSize:23,
  },
  deleteButton: {
    marginTop:50,
    color:"white",
    backgroundColor:"red",
  },

});




class AdminPostDetail extends React.Component {
  state = {
    post:{}
  }

  constructor(props){
    super(props)
  }

  render(){


    const {classes} = this.props


    return (

      <div className={classes.mainPage}>
      <h1 align="center">Détail du post : </h1>

        <Grid container>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
        <Typography component="h3" variant="p" className={classes.title} >
          Note : {this.props.adminCurrentPost.note}
        </Typography>
        <Typography component="h3" variant="p" className={classes.title} >
          Email utilisateur : {this.props.adminCurrentPost.user}
        </Typography>
        <Typography component="h3" variant="p" className={classes.title} >
          Titre : {this.props.adminCurrentPost.titre}
        </Typography>
        <Typography component="h3" variant="p" className={classes.title} >
          Description : {this.props.adminCurrentPost.texte}
        </Typography>
        </Grid>

        <Grid item xs={1}>
        </Grid>
        </Grid>

        <Grid container>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} align="center">
        <Button className={classes.deleteButton} align="center">Supprimer le post</Button>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        </Grid>


      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    adminCurrentPost: state.posts.adminCurrentPost,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminPostDetail))
