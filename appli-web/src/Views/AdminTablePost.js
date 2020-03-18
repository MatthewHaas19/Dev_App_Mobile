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
import RowPostView from '../Views/RowPostView'
import Table from '@material-ui/core/Table';
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
});



class AdminTablePost extends React.Component {
  state = {
    posts:[]
  }

  constructor(props){
    super(props)
    getAllPostsFromDb().then(data => {
      const posts = data
      this.setState({posts: data})
      console.log(data)
    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
  }

  render(){

    const {classes} = this.props

    return (

      <div className={classes.mainPage}>

      {this.state.posts ? (
      <TableContainer>
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
            <TableCell className={classes.nomColonne} align="center">Post</TableCell>
            <TableCell className={classes.nomColonne} align="center">User</TableCell>
            <TableCell className={classes.nomColonne} align="center">Note</TableCell>
            <TableCell className={classes.nomColonne} align="center">NbComment</TableCell>
            <TableCell className={classes.nomColonne} align="center">NbReports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.posts.map(currentPost => (
           <TableRow key={currentPost.id}>
          <TableCell > {currentPost.titre} </TableCell>
          <TableCell align="center">{currentPost.user}</TableCell>
          <TableCell align="center">{currentPost.note}</TableCell>
          <TableCell align="center">A faire</TableCell>
          <TableCell align="center">A faire</TableCell>
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

export default withStyles(useStyles)(AdminTablePost)
