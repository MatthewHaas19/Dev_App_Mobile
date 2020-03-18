import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { green, blue, red , white} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getAllPostsFromDb} from '../API/PostApi'
import RowPostView from '../Views/RowPostView'
import Filter from '../Views/Filter'



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



class Home extends React.Component {
  state = {
    posts:[]
  }

  constructor(props){
    super(props)
    getAllPostsFromDb().then(data => {
      const posts = data
      this.setState({posts: data})
      console.log(data)
    }).catch((error) => {
      console.log("Erreur dans le constructeur")
    })
  }

  render(){

    const {classes} = this.props

    return (

      <div className={classes.mainPage}>
      <Grid container>
      <Grid item className={classes.filterView} xs={3}>
      <Filter />
      </Grid>


      <Grid item className={classes.listView} xs={6}>
      {this.state.posts ? (
        <Grid container className={classes.listView} >
        {this.state.posts.map(currentPost => (
          <Grid item xs={12}>
             
                <RowPostView post={currentPost} />
            
          </Grid>
        )
      )}
      </Grid>
    ) : "Il n'y a pas de posts"}
    </Grid>

    <Grid item className={classes.actionProfileView} xs={3}>
    <h1 align="center" > Partie profil </h1>
    </Grid>
    </Grid>
    </div>
  )
}
}

export default withStyles(useStyles)(Home)
