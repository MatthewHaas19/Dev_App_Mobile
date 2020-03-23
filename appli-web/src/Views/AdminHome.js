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
import AdminTableComment from '../Views/AdminTableComment'
import { connect } from 'react-redux'
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
    color:'black',
  },
  filterView: {
    backgroundColor:"#7bbcc0",
  },
  actionProfileView: {
    backgroundColor:"red",
  },
  listView: {
    backgroundColor:"#7bbcc0",
  },
  table: {
    minWidth: 650,
  },
  nomColonne: {
    fontWeight: "bold",
    fontSize: 20,
  },
  table: {
    backgroundColor: "#7bbcc0"
  },
  buttonMenu: {
    backgroundColor:"#CFCECD",
    color:"black",
    marginTop:50,
    width:200,
    "&:hover": {
     background: "#B7B7B6"
   },

  },
});



class AdminHome extends React.Component {
  state = {
    display: ""
  }

  constructor(props){
    super(props)

  }

  render(){

    const {classes} = this.props

    function TableDisplay(props) {
      const afficher = props.afficher
      console.log(afficher)
      if(afficher == "posts") {
        return (<AdminTablePost />)
      }
      else if (afficher == "users"){
        return ( <AdminTableUser /> )
      }
      else {
        return ( <AdminTableComment /> )
      }
    }

    return (

      <div className={classes.mainPage}>
      <Grid container>



      <Grid item className={classes.listView} xs={12}>
      <TableDisplay afficher={this.props.pageToShow}/>

    </Grid>


    </Grid>
    </div>
  )
}
}

const mapStateToProps = state =>{
  return {
    pageToShow: state.adminPage.pageToShow,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminHome))
