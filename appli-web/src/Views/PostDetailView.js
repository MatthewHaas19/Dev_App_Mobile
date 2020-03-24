import React, {Component} from 'react';
import ColorButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RowPostDetailView from '../Views/RowPostDetailView'
import RowCommentView from '../Views/RowCommentView'
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
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon';
import {getVoteByUser} from '../API/VoteApi'
import {getVoteCommentByUser} from '../API/VoteApi'
import cookie from 'react-cookies';
import {deletePost} from '../API/PostApi'
import history from '../history';

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
    '@media (max-width:600px)': {
      marginLeft: 5,
      marginRight: 5,
    }
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

class PostDetailView extends React.Component{

  state = {
    posts:[],
    comments:[],
    openAddComment:false,
    openAddSignalement:false,
    idPost:'',
    showDelete:false,
    showDialogComfirm:false,
    width: window.innerWidth,
    height: window.innerHeight,
    openImage: false,
    imageToDisplay:"",
  }

  constructor(props){
    super(props)
    let idPost = this.props.match.params.id
    getPostById(idPost).then(data => {
      const post = data
      this.setState({posts: data})
      this.setState({idPost: this.props.match.params.id})

      getAllCommentFromPost(this.props.match.params.id).then(data => {
         const comments = data
         this.setState({comments: data})
         var cooki = cookie.load('userId')
         if(cooki) {
           if (post[0].user == cooki) {
             this.setState({showDelete:true})
           }
         }
       }).catch((error) => {
         console.log("Erreur dans la recuperation des comments")
       })
    }).catch((error) => {
      console.log("Erreur fetch")
    })



  }

  handleClickOpen = () => {
    if(this.state.idPost!='' && this.state.idPost!=this.props.currentIdPost){
      var action = { type: "CURRENT_POST", currentIdPost: this.state.idPost}
      this.props.dispatch(action)

    }
    this.setState({openAddComment:true});
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleSignalement = () => {
    var action = { type: "CURRENT_POST", currentIdPost: this.state.idPost}
    this.props.dispatch(action)

    this.setState({openAddSignalement:true});
  };

  handleClose = () => {
    this.setState({openAddComment:false});
    this.setState({openAddSignalement:false});
  };

  handleCloseAdd = (com) => {
    this.setState({openAddComment:false});
    this.setState({openAddSignalement:false});
    var comments = this.state.comments
    comments.unshift(com)
    this.setState({comments:comments})
  };

  deletePostFunction(id){
    deletePost(id).then(res => {
      this.setState({showDialogComfirm:false})
      var newPost = this.props.postsStore.filter(post => post._id !== id)
      var action = { type: "ADD_POSTS", posts: newPost}
      this.props.dispatch(action)
      history.push('/')
    }).catch((error) => {
      console.log(error)
      console.log("Erreur dans la suppression")
    })
  }

  handleCloseConfirm() {
    this.setState({showDialogComfirm:false})
  }

  handleVote(val,post){
    if(this.props.currentUser){

      var add = "true"
      if(val=="-"){
        add="false"
      }
      const vote = {
        user:this.props.currentUser.email,
        post:post._id,
        like:add
      }

      addVote(vote).then(data => {
        console.log(data)
        if(data.res=='exists'){
          console.log("tu as deja voté pour ce post")
        }else{
          if(data.res=="change"){
            votePost(val,post).then(res=>{
              votePost(val,post).then(data=>{
                  var posts = this.state.posts


                  var index = posts.indexOf(post);
                  if (index !== -1) {
                    if(val=="-"){
                      post.note = post.note - 2
                    }else{
                      post.note =  post.note + 2
                    }
                      posts[index] = post;
                      this.setState({posts: posts})
                      getVoteByUser(this.props.currentUser.email).then(votes => {
                        var action = { type: "TOGGLE_USER_VOTE", userVote: votes}
                        this.props.dispatch(action)

                      })
                  }
              })
            })
          }else{
            if(data.res=="correct"){
              votePost(val,post).then(data=>{
                    var posts = this.state.posts


                    var index = posts.indexOf(post);
                    if (index !== -1) {
                      if(val=="-"){
                        post.note = post.note - 1
                      }else{
                        post.note =  post.note + 1
                      }
                        posts[index] = post;

                        this.setState({posts: posts})
                        getVoteByUser(this.props.currentUser.email).then(votes => {
                          var action = { type: "TOGGLE_USER_VOTE", userVote: votes}
                          this.props.dispatch(action)

                        })
                    }
              })
            }
          }
        }
      })
    }
  }



  handleVoteComment(val,comment){
    if(this.props.currentUser){

      var add = "true"
      if(val=="-"){
        add="false"
      }
      const vote = {
        user:this.props.currentUser.email,
        comment:comment._id,
        like:add
      }


      addVoteComment(vote).then(data => {

        if(data.res=='exists'){
          console.log("tu as deja voté pour ce commentaire")
        }else{
          if(data.res=="change"){
            voteComment(val,comment).then(res=>{
              voteComment(val,comment).then(data=>{

                  var comments = this.state.comments

                  var index = comments.indexOf(comment);
                  if (index !== -1) {
                    if(val=="-"){
                      comment.voteCom = comment.voteCom - 2
                    }else{
                      comment.voteCom =  comment.voteCom + 2
                    }
                      comments[index] = comment;
                      this.setState({comments: comments})
                      getVoteCommentByUser(this.props.currentUser.email).then(votes => {
                        var action = { type: "TOGGLE_USER_VOTE_COMMENT", userVote: votes}
                        this.props.dispatch(action)

                      })
                  }
              })
            })
          }else{
            if(data.res=="correct"){
              voteComment(val,comment).then(data=>{

                    var comments = this.state.comments


                    var index = comments.indexOf(comment);
                    if (index !== -1) {
                      if(val=="-"){
                        comment.voteCom = comment.voteCom - 1
                      }else{
                        comment.voteCom =  comment.voteCom + 1
                      }
                        comments[index] = comment;

                        this.setState({comments: comments})
                        getVoteCommentByUser(this.props.currentUser.email).then(votes => {
                          var action = { type: "TOGGLE_USER_VOTE_COMMENT", userVote: votes}
                          this.props.dispatch(action)

                        })
                    }
              })
            }
          }
        }
      })
    }
  }

  handleCloseImage() {
    this.setState({openImage:false});
  }


  render(){


    const {classes} = this.props

    const post = this.state.posts.map((post) =>

    <Grid container >
    <Grid item xs={1}>
    </Grid>
      <Grid item xs= {this.state.width>800 ? 10 : 12} align="center">
      <RowPostDetailView post={post} handlevote={(val) => this.handleVote(val,post)} />

      {post.image ? <img onClick={() => this.setState({openImage:true, imageToDisplay:post.image})} src={post.image} style={{maxWidth:500, maxHeight:500, marginTop:20}}   />: null}

      </Grid>
      <Grid item xs={1}>
      </Grid>
      </Grid>

    );


    const listcomments = this.state.comments.map((comment) =>
    <Grid container >
    <Grid item xs={2}>
    </Grid>
    <Grid item xs={9}>
      <RowCommentView comments={comment} handlevote={(val) => this.handleVoteComment(val,comment)} />
      </Grid>
      <Grid item xs={0}>
      </Grid>
      </Grid>
    )






    return(
      <div>

      <Card className={classes.mainPage} style={{marginRight: this.state.width>1670 ? 50 : 0 ,
        marginLeft: this.state.width>1670 ? 50 : 5}}>
      <Grid container>
        <Grid item xs={12}>
       {post}
       <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', paddingTop: '50px',paddingBottom: '30px'}}>
        <ColorButton variant="outlined" color="primary" onClick={this.handleClickOpen} >
        Ajouter un commentaire
      </ColorButton>
      <ColorButton variant="outlined" color="secondary" onClick={this.handleSignalement} >
       Signaler ce Post
       </ColorButton>
       {
         this.state.showDelete ?
           <ColorButton variant="outlined" color="secondary" onClick={() => this.setState({showDialogComfirm:true})} >
            Supprimer ce post
          </ColorButton>
      :  null }


       </div>
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
        <AddComment idpost={this.state.idPost} back={(com) => this.handleCloseAdd(com)} leave={() => this.setState({openAddComment:false})}/>
      </Dialog>

      <Dialog
        open={this.state.openAddSignalement}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Signalement idpost={this.state.idPost} back={this.handleClose}/>
      </Dialog>
      </Grid>
      <br /><br /><br /><br />
      </Card>

      <Dialog
          open={this.state.showDialogComfirm}
          TransitionComponent={Transition}
          onClose={() => this.handleCloseConfirm()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Supprimer un post est irréversible.
          Tous ses commentaires et votes seront supprimés en même temps
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.handleCloseConfirm()} color="primary">
          Annuler
        </Button>
        <Button onClick={() => this.deletePostFunction(this.state.posts[0]._id)}
         style={{backgroundColor:"red", color:"white"}} autoFocus>
          Supprimer
        </Button>
      </DialogActions>
      </Dialog>
      <Dialog
          maxWidth="md"
          open={this.state.openImage}
          TransitionComponent={Transition}
          onClose={() => this.handleCloseImage()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        {this.state.imageToDisplay ? <img src={this.state.imageToDisplay} style={{maxWidth:900, maxHeight:900, marginTop:20}}   />: null}
      </Dialog>
      </div>
    )
  }



}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    currentIdPost: state.posts.currentIdPost,
    postsStore : state.posts.posts
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(PostDetailView))
