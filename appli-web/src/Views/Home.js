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



const useStyles = theme => ({
  mainPage: {
    boxShadow: "10px 10px 10px #9E9E9E",
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    color:'white',
  },
  filterView: {
    backgroundColor:"blue",
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
      <h1 align="center"> Partie filter </h1>
      <Typography component="h3" variant="bold" align="center" fontFamily="bold">
  Séléctionnez les catégories :
</Typography>
          <Grid className={classes.categoriesItem} container spacing={0}>
            <Grid item xs={6}>
              <FormControlLabel
              value="Amis"
              control={<Checkbox color="primary" />}
              label="Entre amis"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Couple"
              control={<Checkbox color="primary" />}
              label="Dans mon couple"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Ecole"
              control={<Checkbox color="primary" />}
              label="A l'école"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Famille"
              control={<Checkbox color="primary" />}
              label="En famille"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Rue"
              control={<Checkbox color="primary" />}
              label="Dans la rue"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Soiree"
              control={<Checkbox color="primary" />}
              label="En soirée"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Sport"
              control={<Checkbox color="primary" />}
              label="Au sport"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Transport"
              control={<Checkbox color="primary" />}
              label="Dans les transports"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Travail"
              control={<Checkbox color="primary" />}
              label="Au travail"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="TV"
              control={<Checkbox color="primary" />}
              label="A la télé"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Voisin"
              control={<Checkbox color="primary" />}
              label="Mes voisins"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Web"
              control={<Checkbox color="primary" />}
              label="Sur le web"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Autre"
              control={<Checkbox color="primary" />}
              label="Autres..."
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
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
