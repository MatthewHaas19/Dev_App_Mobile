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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UpArrow from '@material-ui/icons/KeyboardArrowUp';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';
import orderBy from "lodash/orderBy"


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
    textDecoration: "none",
    color: "black",
  },
  table: {
  },
  tableContent: {
    color: "black",
    fontSize: 17,
    textDecoration: "none",
  },
  detailsButton: {
    backgroundColor: "#69aeb3"
  },
  searchfield: {
    marginTop:20,
    marginBottom:50,
    width:200,
    height:48,
  },
  titleSearch: {
    marginTop: 30,
    fontSize:21,
  },
});

const invertDirection = {
  asc: "desc",
  desc: "asc"
}


class AdminTableComment extends React.Component {
  state = {
    comments:[],
    openPost: false,
    openUser: false,
    openComment: false,
    currentComment: {},
    currentUser: {},
    query: '',
    columnToQuery:'titreCom',
    columnToSort: 'reports',
    sortDirection: 'desc',
  }

  constructor(props){
    super(props)
    getAllCommentFromDb().then(data => {
      var comments = data

        for(let i=0;i<comments.length;i++){

          if(comments[i].titreCom.length > 0 ) {
            comments[i].titreCom = comments[i].titreCom[0].toUpperCase() + comments[i].titreCom.slice(1)
          }

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


  handleSort(columnName) {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort===columnName ? invertDirection[state.sortDirection] : 'asc'
    }))
  }


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

    const handleClose = () => {
      this.setState({openUser:false, openPost:false, openComment:false});
    };

    const {classes} = this.props
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (

      <div className={classes.mainPage}>

      {this.state.comments ? (
        <div>
        <Container align="center" maxWidth="sm" >
        <Typography component="h3" variant="bold" align="center" fontFamily="bold" className={classes.titleSearch}>
        Faire une recherche :
      </Typography>
        <TextField className={classes.searchfield}
        label="Recherche"
        value={this.state.query}
        placeholder="Recherche"
        onChange={e => this.setState({query: e.target.value})}
        />

        <Select className={classes.searchfield}
          floatingLabelText="Selectionnez un champ : "
          value={this.state.columnToQuery}
          onChange={(event) => this.setState({columnToQuery:event.target.value})}
        >
          <MenuItem value={"titreCom"}> Titre </MenuItem>
          <MenuItem value={"user"}> Utilisateur </MenuItem>
          <MenuItem value={"_id"}> IdCommentaire </MenuItem>

        </Select>
        </Container>

      <TableContainer>
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
          <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">idComment</TableCell>



            <TableCell className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("titreCom")}>
            <span>
            Commentaire
            </span>
            {this.state.columnToSort==="titreCom" ? (this.state.sortDirection==="asc" ? (
              <UpArrow/>
            ) : (
              <DownArrow/>
            )): null }
            </Link>
            </TableCell>



            <TableCell className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("user")}>
            <span>
            User
            </span>
            {this.state.columnToSort==="user" ? (this.state.sortDirection==="asc" ? (
              <UpArrow/>
            ) : (
              <DownArrow/>
            )): null }
            </Link>
            </TableCell>



            <TableCell className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("voteCom")}>
            <span>
            Note
            </span>
            {this.state.columnToSort==="voteCom" ? (this.state.sortDirection==="asc" ? (
              <UpArrow/>
            ) : (
              <DownArrow/>
            )): null }
            </Link>
            </TableCell>



            <TableCell className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("reports")}>
            <span>
            Reports
            </span>
            {this.state.columnToSort==="reports" ? (this.state.sortDirection==="asc" ? (
              <UpArrow/>
            ) : (
              <DownArrow/>
            )): null }
            </Link>
            </TableCell>



            <TableCell className={classes.nomColonne} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orderBy(this.state.comments,this.state.columnToSort,this.state.sortDirection).filter(x => x[this.state.columnToQuery].toLowerCase().includes(lowerCaseQuery)).map(currentComment => (
           <TableRow key={currentComment.id}>
           <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">{currentComment._id}</TableCell>
          <TableCell><Link onClick={() => this.displayPost(currentComment, currentComment.postId)} className={classes.tableContent}> {currentComment.titreCom} </Link></TableCell>
          <TableCell align="center"><Link onClick={() => this.displayUser(currentComment.user)} className={classes.tableContent} style={{fontWeight:"bold"}}>{currentComment.user} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentComment.voteCom} </Link></TableCell>
          <TableCell align="center"><Link className={classes.tableContent}>{currentComment.reports} </Link></TableCell>
          <TableCell align="center"><Button onClick={() => this.displayPost(currentComment, currentComment.postId)} className={classes.detailsButton}> détails </Button></TableCell>
          </TableRow>

        )
      )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  ) : "Il n'y a pas de posts"}




    <Dialog
        maxWidth="md"
        open={this.state.openPost}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <AdminCommentDetail
        postHasBeenDeleted= {() => {
          const newComments = this.state.comments.filter(comment => comment.postId !== this.props.adminCurrentPost._id);
          this.setState({ comments: newComments, openPost:false });
        }}
        commentHasBeenDeleted= {() => {
          const newComments = this.state.comments.filter(comment => comment._id !== this.props.adminCurrentComment._id);
          this.setState({ comments: newComments, openPost:false });
        }}
      />
    </Dialog>

    <Dialog
        open={this.state.openUser}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AdminProfilUser
        show={(val) => this.setState({openUser:val})}
        userHasBeenDeleted={() => {
          const newComments = this.state.comments.filter(comment => comment.user !== this.props.userAdmin.email);
          this.setState({ comments: newComments });
        }}
        />
    </Dialog>


    </div>
  )
}
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    adminCurrentPost: state.posts.adminCurrentPost,
    adminCurrentComment: state.comments.adminCurrentComment,
    userAdmin: state.userAdmin.user,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminTableComment))
