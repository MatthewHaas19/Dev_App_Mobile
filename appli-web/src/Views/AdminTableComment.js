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
import { connect } from 'react-redux'
import {getAllCommentFromDb} from '../API/CommentApi'
import {getUserFromDb} from '../API/UserApi'
import {getPostById} from '../API/PostApi'
import {getAllReportFromComment} from '../API/ReportApi'
import RowPostView from '../Views/RowPostView'
import AdminCommentDetail from '../Views/AdminCommentDetail'
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
    backgroundColor: "#FAA65F"
  },
  tableContent: {
    color: "black",
    fontSize: 17,
    textDecoration: "none",
  },
  detailsButton: {
    backgroundColor: "#FAB65F"
  },
});




class AdminTableComment extends React.Component {
  state = {
    comments:[],
    openPost: false,
    openUser: false,
    openComment: false,
    currentComment: {},
    currentUser: {}
  }

  constructor(props){
    super(props)
    getAllCommentFromDb().then(data => {
      var comments = data

        for(let i=0;i<comments.length;i++){
          Object.assign(comments[i], {reports: 0});

            getAllReportFromComment(comments[i]._id).then(reports => {
              if(reports.length>0) {
                comments[i].reports=reports.length
              }

                this.setState({comments: comments})

          }).catch((error) => {
            console.log("Erreur dans le constructeur 1")
          })
        }

    }).catch((error) => {
      console.log("Erreur dans le constructeur 2")
    })
  }

  handleClose = () => {
    this.setState({openUser:false, openPost:false, openComment:false});
  };



  displayPost(comment,idPost){
    getPostById(idPost).then(post => {
      console.log(post)
      console.log(comment)
      var action = { type: "ADMIN_CURRENT_COMMENT", adminCurrentComment: comment}
      this.props.dispatch(action)

      var action = { type: "ADMIN_CURRENT_POST", adminCurrentPost: post[0]}
      this.props.dispatch(action)

      this.setState({openPost:true, currentComment:comment})
    })

  }

  displayUser(emailUser){
    getUserFromDb(emailUser).then(user => {
      var action = { type: "TOGGLE_USER_ADMIN", currentUser:user[0]}
      this.props.dispatch(action)
      this.setState({openUser:true, currentUser:user[0]})
    })

  }

  render(){


    const {classes} = this.props

    return (

      <div className={classes.mainPage}>

      {this.state.comments ? (
      <TableContainer>
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
            <TableCell className={classes.nomColonne} align="center">Commentaire</TableCell>
            <TableCell className={classes.nomColonne} align="center">User</TableCell>
            <TableCell className={classes.nomColonne} align="center">Note</TableCell>
            <TableCell className={classes.nomColonne} align="center">Reports</TableCell>
            <TableCell className={classes.nomColonne} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.comments.map(currentComment => (
           <TableRow key={currentComment.id}>
          <TableCell><Link onClick={() => this.displayPost(currentComment, currentComment.postId)} className={classes.tableContent}> {currentComment.titreCom} </Link></TableCell>
          <TableCell align="center"><Link onClick={() => this.displayUser(currentComment.user)} className={classes.tableContent}>{currentComment.user} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentComment.voteCom} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentComment.reports} </Link></TableCell>
          <TableCell align="center"><Button onClick={() => this.displayPost(currentComment, currentComment.postId)} className={classes.detailsButton}> détails </Button></TableCell>
          </TableRow>

        )
      )}
        </TableBody>
      </Table>
    </TableContainer>
  ) : "Il n'y a pas de posts"}




    <Dialog
        maxWidth="md"
        open={this.state.openPost}
        TransitionComponent={Transition}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <AdminCommentDetail/>
    </Dialog>

    <Dialog
        open={this.state.openUser}
        TransitionComponent={Transition}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AdminProfilUser/>
    </Dialog>


    </div>
  )
}
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    adminCurrentPost: state.posts.adminCurrentPost,
    adminCurrentComment: state.comments.adminCurrentComment
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminTableComment))
