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
import {getAllPostsFromDb} from '../API/PostApi'
import {getUserFromDb} from '../API/UserApi'
import {getAllCommentFromPost} from '../API/CommentApi'
import {getAllReportFromPost} from '../API/ReportApi'
import RowPostView from '../Views/RowPostView'
import AdminPostDetail from '../Views/AdminPostDetail'
import AdminProfilUser from '../Views/AdminProfilUser'
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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





class AdminTablePost extends React.Component {
  state = {
    posts:[],
    openPost: false,
    openUser: false,
    currentPost: {},
    currentUser: {},
    query: '',
    columnToQuery:'titre',
    columnToSort: 'reports',
    sortDirection: 'desc',
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


  displayPost(post){
    var action = { type: "ADMIN_CURRENT_POST", adminCurrentPost: post}
    this.props.dispatch(action)
    this.setState({openPost:true, currentPost:post})
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
    const lowerCaseQuery = this.state.query.toLowerCase();
    const handleClose = () => {
      this.setState({openUser:false, openPost:false});
    };

    return (

      <div className={classes.mainPage}>

      {this.state.posts ? (
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
          <MenuItem value={"titre"}>Titre </MenuItem>
          <MenuItem value={"user"}> Utilisateur </MenuItem>
          <MenuItem value={"_id"}> IdPost </MenuItem>

        </Select>
        </Container>
      <TableContainer>
      <Table className={classes.table}>
        <TableHead >
          <TableRow >
            <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">idPost</TableCell>


            <TableCell align="center">
            <Link
            style={{display:"flex", justifyContent: "center", alignItems:"center"}}
            className={classes.nomColonne}
            onClick={() => this.handleSort("titre")}>
            <span>
            Post
            </span>
            {this.state.columnToSort==="titre" ? (this.state.sortDirection==="asc" ? (
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
            onClick={() => this.handleSort("note")}>
            <span>
            Note
            </span>
            {this.state.columnToSort==="note" ? (this.state.sortDirection==="asc" ? (
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
            onClick={() => this.handleSort("commentaire")}>
            <span>
            Com
            </span>
            {this.state.columnToSort==="commentaire" ? (this.state.sortDirection==="asc" ? (
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
        {
          orderBy(this.props.infosHome.posts,this.state.columnToSort,this.state.sortDirection).filter(x => x[this.state.columnToQuery].toLowerCase().includes(lowerCaseQuery)).map(currentPost => (
           <TableRow key={currentPost.id}>
          <TableCell style={{display:"none"}} className={classes.nomColonne} align="center">{currentPost._id}</TableCell>
          <TableCell ><Link onClick={() => this.displayPost(currentPost)} className={classes.tableContent}> {currentPost.titre} </Link></TableCell>
          <TableCell align="center"><Link onClick={() => this.displayUser(currentPost.user)} className={classes.tableContent}  style={{fontWeight:"bold"}}>{currentPost.user} </Link></TableCell>
          <TableCell align="center" className={classes.tableContent}>{currentPost.note}</TableCell>
          <TableCell align="center" className={classes.tableContent}>
          {this.props.infosHome.comments.filter(comment => comment.postId == currentPost._id).length}
          </TableCell>
          <TableCell align="center" className={classes.tableContent}>{currentPost.reports} </TableCell>
          <TableCell align="center"><Button onClick={() => this.displayPost(currentPost)} className={classes.detailsButton}> détails </Button></TableCell>

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
      <AdminPostDetail
      show={(val) => this.setState({openPost:val})}
      postHasBeenDeleted={() => {
        const newUser = this.props.infosHome.users
        const newPosts = this.props.infosHome.posts.filter(post => post._id !== this.props.adminCurrentPost._id);
        const newComments = this.props.infosHome.comments.filter(comment => comment.postId !== this.props.adminCurrentPost._id);
        var action = { type: "TOGGLE_ADMIN_INFOS", listInfos: {posts:newPosts,comments:newComments,users:newUser }}
        this.props.dispatch(action)
        this.setState({  openPost:false});
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
          const newUser = this.props.infosHome.users.filter(user => user._id !== this.props.userAdmin._id);
          const newPosts = this.props.infosHome.posts.filter(post => post.user !== this.props.userAdmin.email);
          const newComments = this.props.infosHome.comments.filter(comment => comment.user !== this.props.userAdmin.email);
          var action = { type: "TOGGLE_ADMIN_INFOS", listInfos: {posts:newPosts,comments:newComments,users:newUser }}
          this.props.dispatch(action)
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
    userAdmin: state.userAdmin.user,
    infosHome: state.adminHome.infos,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminTablePost))
