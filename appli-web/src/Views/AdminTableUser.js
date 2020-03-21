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
import {getAllUsersFromDb} from '../API/UserApi'
import {getPostByUser} from '../API/PostApi'
import {getAllCommentFromUser} from '../API/CommentApi'
import {getAllReportFromUser} from '../API/ReportApi'
import RowPostView from '../Views/RowPostView'
import AdminProfilUser from '../Views/AdminProfilUser'
import AdminPostsUser from '../Views/AdminPostsUser'
import AdminCommentsUser from '../Views/AdminCommentsUser'
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
  profilButton: {
    backgroundColor: "#FAB65F"
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




class AdminTableUser extends React.Component {
  state = {
    users:[],
    currentUser: {},
    openUser: false,
    openPosts: false,
    query: '',
    columnToQuery:'username',
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
    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
  }



  displayUsers(user){
    var action = { type: "TOGGLE_USER_ADMIN", currentUser:user}
    this.props.dispatch(action)
    this.setState({openUser:true, currentUser:user})
  }

  displayPosts(user){
    getPostByUser(user.email).then(listposts => {
      var action = { type: "ADMIN_LIST_POST", adminListPost:listposts}
      this.props.dispatch(action)
      var action = { type: "TOGGLE_USER_ADMIN", currentUser:user}
      this.props.dispatch(action)
      this.setState({openPosts:true, currentUser:user})
    })

  }

  displayComments(user){
    var action = { type: "TOGGLE_USER_ADMIN", currentUser:user}
    this.props.dispatch(action)
    this.setState({openComments:true, currentUser:user})
  }

  displayReports(user){
    var action = { type: "TOGGLE_USER_ADMIN", currentUser:user}
    this.props.dispatch(action)
    this.setState({openReports:true, currentUser:user})
  }


  render(){


    const {classes} = this.props
    const lowerCaseQuery = this.state.query.toLowerCase();
    const handleClose = () => {
        this.setState({openUser:false, openPosts:false});
      };


    return (

      <div className={classes.mainPage}>

      {this.state.users ? (
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
          <MenuItem value={"username"}> Username </MenuItem>
          <MenuItem value={"email"}> Email </MenuItem>
          <MenuItem value={"_id"}> IdUser </MenuItem>

        </Select>
        </Container>

      <TableContainer>
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
            <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">idUser</TableCell>
            <TableCell className={classes.nomColonne} align="center">Username</TableCell>
            <TableCell className={classes.nomColonne} align="center">Email</TableCell>
            <TableCell className={classes.nomColonne} align="center">Posts</TableCell>
            <TableCell className={classes.nomColonne} align="center">NbComment</TableCell>
            <TableCell className={classes.nomColonne} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.users.filter(x => x[this.state.columnToQuery].toLowerCase().includes(lowerCaseQuery)).map(currentUser => (
           <TableRow key={currentUser.id}>
           <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">{currentUser._id}</TableCell>
           <TableCell><Link onClick={() => this.displayUsers(currentUser)} className={classes.tableContent}> {currentUser.username} </Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayUsers(currentUser)} className={classes.tableContent}>{currentUser.email} </Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayPosts(currentUser)} className={classes.tableContent}> {currentUser.posts}</Link></TableCell>
             <TableCell align="center"><Link  className={classes.tableContent}> {currentUser.comments}</Link></TableCell>
             <TableCell align="center"><Button onClick={() => this.displayUsers(currentUser)} className={classes.profilButton}> Profil</Button></TableCell>
          </TableRow>

        )
      )}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  ) : "Il n'y a pas de users"}


  <Dialog
      open={this.state.openUser}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <AdminProfilUser user={this.state.currentUser}/>
  </Dialog>

  <Dialog
      maxWidth="md"
      open={this.state.openPosts}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
    <AdminPostsUser/>
  </Dialog>




    </div>
  )
}
}



const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentIdPost: state.posts.currentIdPost,
    userAdmin: state.userAdmin.user,
    adminListPost: state.posts.adminListPost
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminTableUser))
