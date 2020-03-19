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

import RowPostView from '../Views/RowPostView'
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
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





const AdminTablePost = (props) => {
    const classes = useStyles();


    async function NbComment(props) {
      getAllCommentFromPost(props.idPost, (comments => {
        return (<TableCell align="center"><Link className={classes.tableContent}>{comments.length}</Link></TableCell>)
      }))
    }


    return (

      <div className={classes.mainPage}>

      {props.posts ? (
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
        {props.posts.map(currentPost => (
           <TableRow key={currentPost.id}>
          <TableCell><Link className={classes.tableContent}> {currentPost.titre} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentPost.user} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentPost.note} </Link></TableCell>
          {NbComment(currentPost._id)}
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

export default (AdminTablePost)