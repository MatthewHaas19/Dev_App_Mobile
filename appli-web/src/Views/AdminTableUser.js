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
import {getAllUsersFromDb} from '../API/UserApi'
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


const useStyles = theme => ({
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
  tableContent: {
    color: "black",
    fontSize: 17,
    textDecoration: "none",
  },
});




class AdminTableUser extends React.Component {
  state = {
    users:[],

  }

  constructor(props){
    super(props)
    getAllUsersFromDb().then(data => {
      const users = data
      this.setState({users:users})

    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
  }


  render(){


    const {classes} = this.props


    return (

      <div className={classes.mainPage}>

      {this.state.users ? (
      <TableContainer>
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
            <TableCell className={classes.nomColonne} align="center">Username</TableCell>
            <TableCell className={classes.nomColonne} align="center">Email</TableCell>
            <TableCell className={classes.nomColonne} align="center">Posts</TableCell>
            <TableCell className={classes.nomColonne} align="center">NbComment</TableCell>
            <TableCell className={classes.nomColonne} align="center">NbReports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.users.map(currentUser => (
           <TableRow key={currentUser.id}>
           <TableCell><Link className={classes.tableContent}> {currentUser.username} </Link></TableCell>
             <TableCell align="center"><Link className={classes.tableContent}>{currentUser.email} </Link></TableCell>
             <TableCell align="center"><Link className={classes.tableContent}>A faire </Link></TableCell>
             <TableCell align="center"><Link className={classes.tableContent}> A faire</Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>A faire</Link></TableCell>
          </TableRow>

        )
      )}
        </TableBody>
      </Table>
    </TableContainer>
  ) : "Il n'y a pas de posts"}




    </div>
  )
}
}

export default withStyles(useStyles)(AdminTableUser)
