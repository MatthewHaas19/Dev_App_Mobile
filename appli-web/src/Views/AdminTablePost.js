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




class AdminTablePost extends React.Component {
  state = {
    posts:[],
  }

  constructor(props){
    super(props)
    getAllPostsFromDb().then(data => {
      var posts = data

      Object.assign(posts, {reports: []});
        for(let i=0;i<posts.length;i++){
          getAllCommentFromPost(posts[i]._id).then(res => {
            posts[i].commentaire.push(res.length)
            getAllReportFromPost(posts[i]._id).then(reports => {
              console.log(reports)
              this.setState({posts: posts})
            })
          })
        }

        console.log(posts)

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
          <TableCell><Link className={classes.tableContent}> {currentPost.titre} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentPost.user} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentPost.note} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{(currentPost.commentaire.length>0) ? currentPost.commentaire[0] : 0 }</Link></TableCell>
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
