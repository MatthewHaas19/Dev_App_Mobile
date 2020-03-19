import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { green, blue, red , white} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getAllPostsFromDb} from '../API/PostApi'
import {getAllUsersFromDb} from '../API/UserApi'
import {getAllCommentFromPost} from '../API/CommentApi'
import {getAllReportFromPost} from '../API/ReportApi'
import AdminTablePost from '../Views/AdminTablePost'
import AdminTableUser from '../Views/AdminTableUser'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = theme => ({
  mainPage: {
    boxShadow: "10px 10px 10px #9E9E9E",
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    color:'white',
  },
  filterView: {
    backgroundColor:"blue",
  },
  actionProfileView: {
    backgroundColor:"red",
  },
  listView: {
    backgroundColor:"green",
  },
  table: {
    minWidth: 650,
  },
  nomColonne: {
    fontWeight: "bold",
    fontSize: 20,
  },
  table: {
    backgroundColor: "purple"
  },
  buttonMenu: {
    backgroundColor:"grey",
    color:"white",
    marginTop:50,
    width:200,
    hover : "red",
    "&:hover": {
     background: "red"
   },

  },
});



class AdminHome extends React.Component {
  state = {
    displayPost: true
  }

  constructor(props){
    super(props)

  }

  render(){

    const {classes} = this.props

    function TableDisplay(props) {
      const afficherPost = props.afficherPost
      if(afficherPost) {
        return (<AdminTablePost />)
      }
      else {
        return ( <AdminTableUser /> )
      }
    }

    return (

      <div className={classes.mainPage}>
      <Grid container>

      <Grid item className={classes.filterView} xs={3}>
      <h1 align="center"> Partie filter </h1>
      <Typography component="h3" variant="bold" align="center" fontFamily="bold">
      Afficher par :
    </Typography>
      <Grid container>
      <Grid item xs={12} align="center">
    <Button className={classes.buttonMenu} onClick={() => {this.setState({displayPost:true})}} >Les posts</Button>
    </Grid>
    <Grid item xs={12} align="center">
  <Button className={classes.buttonMenu} onClick={() => {this.setState({displayPost:false})}} >Les Utilisateurs</Button>
  </Grid>
    </Grid>
      </Grid>

      <Grid item className={classes.listView} xs={9}>
      <TableDisplay afficherPost={this.state.displayPost} users={this.state.users} posts={this.state.posts}/>

    </Grid>


    </Grid>
    </div>
  )
}
}

export default withStyles(useStyles)(AdminHome)
