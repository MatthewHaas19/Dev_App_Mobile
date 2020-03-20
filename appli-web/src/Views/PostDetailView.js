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
import RowPostView from '../Views/RowPostView'
import RowCommentView from '../Views/RowCommentView'
import { useParams } from 'react-router-dom';
import { getPostById } from '../API/PostApi';
import { getAllCommentFromPost } from '../API/CommentApi';
import AddComment from './AddComment';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = theme => ({
  mainPage: {
    boxShadow: "10px 10px 10px #9E9E9E",
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    color:'white',
  },
  actionProfileView: {
    backgroundColor:"red",
  },
  listView: {
    backgroundColor:"green",
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
  }
});

class PostDetailViewTest extends React.Component{

  state = {
    posts:[],
    comments:[],
    openAddComment:false,
    idPost:''
  }

  constructor(props){
    super(props)
    let idPost = this.props.match.params.id
    console.log("l'id du post"+idPost)
    getPostById(idPost).then(data => {
      const post = data
      this.setState({posts: data})
      this.setState({idPost: idPost})
      console.log("id"+this.state.idPost)
      console.log("Le post" +data)

    }).catch((error) => {
      console.log("Erreur fetch")
    })
   getAllCommentFromPost(idPost).then(data => {
      const comments = data
      this.setState({comments: data})
      console.log("dans get all comments les com :" + data)
    }).catch((error) => {
      console.log("Erreur dans la recuperation des comments")
    })


  }

  handleClickOpen = () => {
    var action = { type: "CURRENT_POST", currentIdPost: this.state.idPost}
    this.props.dispatch(action)
    this.setState({openAddComment:true});
  };

  handleClose = () => {
    this.setState({openAddComment:false});
  };


  render(){


    const {classes} = this.props

    this.state.posts.map((post) =>
        console.log("couleur" + post.couleur)
    );
    const post = this.state.posts.map((post) =>
      <Grid item xs={12}>
      <RowPostView post={post} />
      </Grid>
    );


    const listcomments = this.state.comments.map((comment) =>
    <Grid item xs={12}>
      <RowCommentView comments={comment} />
      </Grid>
    )






    return(
      <div>
        <Grid item xs={12}>
       {post}
       <ColorButton variant="outlined" color="primary" onClick={this.handleClickOpen} >
        Ajouter un commentaire
      </ColorButton>
       {listcomments}
      </Grid>

      <Dialog
        open={this.state.openAddComment}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AddComment idpost={this.state.idPost}/>
      </Dialog>


      </div>
    )
  }



}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    currentIdPost: state.posts.currentIdPost
  }
}

export default connect(mapStateToProps)(PostDetailViewTest)
