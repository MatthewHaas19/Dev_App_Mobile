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
import { useParams } from 'react-router-dom';
import { getPostById } from '../API/PostApi';


class PostDetailViewTest extends React.Component{

  state = {
    posts:[]
  }

  constructor(props){
    super(props)
    let id = this.props.match.params.id
    getPostById(id).then(data => {
      const post = data
      this.setState({posts: data})
      console.log("Les post :" +data)
    }).catch((error) => {
      console.log("Erreur fetch")
    })
  }

  render(){

    const post = this.state.posts.map((post) =>
      <Grid item xs={12}>
      <RowPostView post={post} />
      </Grid>
    );
    return(
      <div>
       {post}


      </div>
    )
  }



}

export default (PostDetailViewTest)
