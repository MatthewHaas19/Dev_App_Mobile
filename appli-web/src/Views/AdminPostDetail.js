import React, {Component} from 'react';
import ColorButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RowPostViewAdmin from '../Views/RowPostViewAdmin'
import RowCommentViewAdmin from '../Views/RowCommentViewAdmin'
import { useParams } from 'react-router-dom';
import { getPostById } from '../API/PostApi';
import {votePost} from '../API/PostApi'
import {voteComment} from '../API/CommentApi'
import {getAllPostsFromDb} from '../API/PostApi'
import {addVote} from '../API/VoteApi'
import {addVoteComment} from '../API/VoteApi'
import { getAllCommentFromPost } from '../API/CommentApi';
import AddComment from './AddComment';
import Signalement from './Signalement';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon';
import {getVoteByUser} from '../API/VoteApi'
import {getVoteCommentByUser} from '../API/VoteApi'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = theme => ({
  dialog: {
    backgroundColor:"#d7edef",
    width:800,
    height:500,
  },
  mainPage: {
    color:'black',
    backgroundColor:"#d7edef"
  },
scrollableView: {
  backgroundColor:"#d7edef"
},

  fields: {
    marginBottom: theme.spacing(5)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  button:{
    marginTop: theme.spacing(5),
  },
  title:{
    fontSize:24,
    marginBottom:50,
  },
});

class AdminPostDetail extends React.Component{

  state = {
    posts:[],
    comments:[],
    openAddComment:false,
    openAddSignalement:false,
    idPost:''
  }

  constructor(props){
    super(props)

  }

  handleClickOpen = () => {
    if(this.state.idPost!='' && this.state.idPost!=this.props.currentIdPost){
      var action = { type: "CURRENT_POST", currentIdPost: this.state.idPost}
      this.props.dispatch(action)

    }
    this.setState({openAddComment:true});
  };

  handleSignalement = () => {
    var action = { type: "CURRENT_POST", currentIdPost: this.state.idPost}
    this.props.dispatch(action)

    this.setState({openAddSignalement:true});
  };

  handleClose = () => {
    this.setState({openAddComment:false});
    this.setState({openAddSignalement:false});
  };





  render(){


    const {classes} = this.props



    const post =
      <Grid item xs={12}>
      <RowPostViewAdmin post={this.props.adminCurrentPost} postHasBeenDeleted={() => {
        this.props.postHasBeenDeleted()
      }} />  <br /><br />    </Grid>
    ;



    const listcomments = this.props.infosHome.comments.filter(comment => comment.postId == this.props.adminCurrentPost._id).map((comment) =>
    <Grid container>
    <Grid item xs={1}>
    </Grid>
    <Grid item xs={11}>
    <RowCommentViewAdmin comments={comment}
    commentHasBeenDeleted={() => {


      const newUser = this.props.infosHome.users
      const newPosts = this.props.infosHome.posts
      const newComments = this.props.infosHome.comments.filter(com => com._id !== comment._id);
      var action = { type: "TOGGLE_ADMIN_INFOS", listInfos: {posts:newPosts,comments:newComments,users:newUser }}
      this.props.dispatch(action)
      this.setState({comments:newComments})

    }}
    />
    <br />
    </Grid>
    </Grid>
    )






    return(
      <div className={classes.dialog}>
      <Container className={classes.mainPage}>
        <Grid item xs={12} className={classes.scrollableView}>
        <Typography component="h3" variant="p" className={classes.title}  >
          Détail du post :
        </Typography>
       {post}
       {this.props.adminCurrentPost.image ?

         <img src={this.props.adminCurrentPost.image}  />

        : null}
       {listcomments}
      </Grid>
      </Container>



      </div>
    )
  }



}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    currentIdPost: state.posts.currentIdPost,
    adminCurrentPost: state.posts.adminCurrentPost,
    infosHome: state.adminHome.infos,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminPostDetail))
