import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
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
  }
});

class PostDetailViewTest extends React.Component{
  
  state = {
    posts:[],
    comments:[]
  }

  constructor(props){
    super(props)
    let id = this.props.match.params.id
    getPostById(id).then(data => {
      const post = data
      this.setState({posts: data})
      console.log(data)
    }).catch((error) => {
      console.log("Erreur fetch")
    })
   getAllCommentFromPost(id).then(data => {
      const comments = data
      this.setState({comments: data})
      console.log(data)
    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
    console.log(this.state.comments)
  }

  render(){
    const {classes} = this.props
    const post = this.state.posts.map((post) =>
      <Grid item xs={12}>
      <RowPostView post={post} />
      </Grid>
    );

    const listcomments = this.state.comments.map((comment) =>
    <Grid item xs={12}>
      <RowCommentView comment={comment} />
      </Grid>
    )


    return(
      <div>
       {post}
       {listcomments}


      </div>
    )
  }



}

export default (PostDetailViewTest)
