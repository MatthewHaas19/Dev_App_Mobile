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
import { connect } from 'react-redux'

const useStyles = theme => ({

  mainPage: {
    backgroundColor: "purple",
    width: 500,
    height: 500,
    color: "white",

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
      <h1>Détail du post : </h1>
      {this.props.adminCurrentPost ?

        <h1>{this.props.adminCurrentPost.titre}</h1>



      : <h1>ça marche pas</h1>}



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
