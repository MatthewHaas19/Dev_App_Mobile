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
    backgroundColor: "#a1d0d3"
  },
  tableContent: {
    color: "black",
    fontSize: 17,
    textDecoration: "none",
  },
  profilButton: {
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




class AdminTableUser extends React.Component {
  state = {
    users:[],
    currentUser: {},
    openUser: false,
    openPosts: false,
    query: '',
    columnToQuery:'username',
    columnToSort: 'posts',
    sortDirection: 'desc',
    nbDelete: 0,
  }

  constructor(props){
    super(props)

  }



  handleSort(columnName) {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection: state.columnToSort===columnName ? invertDirection[state.sortDirection] : 'asc'
    }))
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




  render(){


    const {classes} = this.props
    const lowerCaseQuery = this.state.query.toLowerCase();
    const handleClose = () => {
        this.setState({openUser:false, openPosts:false});
      };

    const handleClosePostUser = async () => {
      if(this.state.nbDelete > 0) {
        const newUser = this.props.infosHome.users
        const index = await newUser.findIndex((user) => user._id == this.props.userAdmin._id)
        newUser[index].posts =   newUser[index].posts - this.state.nbDelete
      }
        this.setState({openUser:false, openPosts:false, nbDelete:0});
      };




    return (

      <div className={classes.mainPage}>

      {this.props.infosHome.users ? (
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



            <TableCell className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("username")}>
            <span>
            Username
            </span>
            {this.state.columnToSort==="username" ? (this.state.sortDirection==="asc" ? (
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
            onClick={() => this.handleSort("email")}>
            <span>
            Email
            </span>
            {this.state.columnToSort==="email" ? (this.state.sortDirection==="asc" ? (
              <UpArrow/>
            ) : (
              <DownArrow/>
            )): null }
            </Link>
            </TableCell>



            <TableCell onClick={() => this.handleSort("posts")} className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("posts")}>
            <span>
            Posts
            </span>
            {this.state.columnToSort==="posts" ? (this.state.sortDirection==="asc" ? (
              <UpArrow/>
            ) : (
              <DownArrow/>
            )): null }
            </Link>
            </TableCell>



            <TableCell onClick={() => this.handleSort("comments")} className={classes.nomColonne} align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("comments")}>
            <span>
            Comments
            </span>
            {this.state.columnToSort==="comments" ? (this.state.sortDirection==="asc" ? (
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
        {orderBy(this.props.infosHome.users,this.state.columnToSort,this.state.sortDirection).filter(x => x[this.state.columnToQuery].toLowerCase().includes(lowerCaseQuery)).map(currentUser => (
           <TableRow key={currentUser.id}>
           <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">{currentUser._id}</TableCell>
           <TableCell><Link onClick={() => this.displayUsers(currentUser)} className={classes.tableContent}> {currentUser.username} </Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayUsers(currentUser)} className={classes.tableContent}>{currentUser.email} </Link></TableCell>
             <TableCell align="center"><Link onClick={() => this.displayPosts(currentUser)} className={classes.tableContent}> {currentUser.posts}</Link></TableCell>
             <TableCell align="center" className={classes.tableContent} > {currentUser.comments}</TableCell>
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
    <AdminProfilUser
    show={(val) => this.setState({openUser:val})}
    userHasBeenDeleted={() => {
      const newUser = this.props.infosHome.users.filter(user => user._id !== this.props.userAdmin._id);
      const newPosts = this.props.infosHome.posts.filter(post => post.user !== this.props.userAdmin.email);
      const newComments = this.props.infosHome.comments.filter(comment => comment.user !== this.props.userAdmin.email);
      var action = { type: "TOGGLE_ADMIN_INFOS", listInfos: {posts:newPosts,comments:newComments,users:newUser }}
      this.props.dispatch(action)
    }}
    />
  </Dialog>

  <Dialog
      maxWidth="md"
      open={this.state.openPosts}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
    <AdminPostsUser
    show={(val) => this.setState({openPost:val})}
    hasBeenModified={()=> this.setState({openPost:true}) }
    />
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
    adminListPost: state.posts.adminListPost,
    infosHome: state.adminHome.infos,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminTableUser))
