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
import {getPostByUser} from '../API/PostApi'
import {getAllCommentFromUser} from '../API/CommentApi'
import {getAllReportFromUser} from '../API/ReportApi'
import RowPostView from '../Views/RowPostView'
import AdminProfilUser from '../Views/AdminProfilUser'
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    currentUser: {},
    openUser: false,
    openPosts: false,
    openReports: false,
    openComments: false,
  }

  constructor(props){
    super(props)
    getAllUsersFromDb().then(data => {
      var users = data


        for(let i=0;i<users.length;i++){
          getPostByUser(users[i].email).then(res => {
            Object.assign(users[i], {posts: 0});
            if(res.length>0) {
              users[i].posts=res.length
            }
            getAllCommentFromUser(users[i].email).then(comments => {
              Object.assign(users[i], {comments: 0});
              if(comments.length>0) {
                users[i].comments=comments.length
              }

              getAllReportFromUser(users[i].email).then(reports => {
                Object.assign(users[i], {reports: 0});
                if(reports!=null) {
                  users[i].reports=reports.length
                }
                this.setState({users: users})
              })



            }).catch((error) => {
              console.log("Erreur dans le constructeur")
            })

          }).catch((error) => {
            console.log("Erreur dans le constructeur")
          })
        }
        console.log(users)
    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
  }

  handleClose = () => {
    this.setState({openUser:false, openPosts:false, openReports:false, openComments:false});
  };

  displayUsers(user){
    this.setState({openUser:true, currentUser:user})
  }
  displayPosts(user){
    this.setState({openPosts:true, currentUser:user})
  }
  displayComments(user){
    this.setState({openComments:true, currentUser:user})
  }
  displayReports(user){
    this.setState({openReports:true, currentUser:user})
  }


  render(){


    const {classes} = this.props
    console.log(this.state.users)

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
           <TableCell><Link onClick={() => this.displayUsers(currentUser)} className={classes.tableContent}> {currentUser.username} </Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayUsers(currentUser)} className={classes.tableContent}>{currentUser.email} </Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayPosts(currentUser)} className={classes.tableContent}> {currentUser.posts}</Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayComments(currentUser)} className={classes.tableContent}> {currentUser.comments}</Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayReports(currentUser)} className={classes.tableContent}> {currentUser.reports}</Link></TableCell>
          </TableRow>

        )
      )}
        </TableBody>
      </Table>
    </TableContainer>
  ) : "Il n'y a pas de posts"}


  <Dialog
      open={this.state.openUser}
      TransitionComponent={Transition}
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <AdminProfilUser user={this.state.currentUser}/>
  </Dialog>

  <Dialog
      open={this.state.openPosts}
      TransitionComponent={Transition}
      keepMounted
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
    <h1>TEST</h1>
  </Dialog>

  <Dialog
      open={this.state.openComments}
      TransitionComponent={Transition}
      keepMounted
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
    <h1>TEST</h1>
  </Dialog>

  <Dialog
      open={this.state.openReports}
      TransitionComponent={Transition}
      keepMounted
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <h1>TEST</h1>
  </Dialog>


    </div>
  )
}
}



export default withStyles(useStyles)(AdminTableUser)
