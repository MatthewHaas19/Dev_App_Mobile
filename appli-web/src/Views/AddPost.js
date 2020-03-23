import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import history from '../history';
import cookie from 'react-cookies';
import UploadButton from './component/UploadButton'

import { green, blue, purple } from '@material-ui/core/colors';
import {setNewPostDb} from '../API/PostApi'

const useStyles = theme => ({
  card: {
    margin: 50
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fields: {
    marginBottom: theme.spacing(5)
  },

  categoriesItem: {
    marginBottom: theme.spacing(2)
  },

  backButton:{
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },

});

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: blue[400],
    '&:hover': {
      backgroundColor: blue[600],
    },
  },
}))(Button);


class AddPost extends React.Component {

  constructor(props){
    console.log("Je suis dans le constructor")
    super(props)
    this.state = {
      isAnonyme: false,
      titre: '',
      texte: '',
      image: null,
      listCategorie : ["Amis","Couple","Ecole","Famille","Rue","Soiree","Sport","Transport","Travail","TV","Voisin","Web","Autres"],
      categorie: [],
    }
  }

  onChange = (e) => {

    if (e.target.name == "isAnonyme") {
      this.setState({[e.target.name]: e.target.checked })
    }
    else if (e.target.name.match(/categorie.*/)) {
      if (e.target.checked) {
        var joined = this.state.categorie.concat(e.target.value);
        this.setState({["categorie"]: joined})
      }
      else {
        for (var i = 0; i < this.state.categorie.length; i++) {
          if (this.state.categorie[i] == e.target.value) {
            var newTab = this.state.categorie
            newTab.splice(i,1)
            this.setState({["categorie"]: newTab})
          }
        }
      }
    }
    else {
      this.setState({[e.target.name]: e.target.value })
    }
  }

  handleChangeUrl(url){
    this.setState({image:url})
  }


  onSubmit = (e) => {
    var colors = [
        [0/255,176/255,166/255],[5/255,93/255,107/255],[0/255,128/255,137/255],[225/255,170/255,18/255],[1/255,58/255,103/255],[7/255,36/255,70/255]
    ]

    var today = new Date()
    var yyyy = today.getFullYear()
    var mm = (today.getMonth()+1)
    var dd = today.getDate()
    var hh = today.getHours()
    var mn = today.getMinutes()
    var ss = today.getSeconds()

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    if(hh<10) hh='0'+hh;
    if(mn<10) mn='0'+mn;
    if(ss<10) ss='0'+ss;


    console.log("Submit")
    var userMail = "Anonyme"
    var cooki = cookie.load('userId')
    if(cooki){
      userMail=cooki
    }


    e.preventDefault();
    console.log(this.state.categorie)
    var localisation = []
    if(this.props.position){
      localisation = [this.props.position.latitude.toString(),this.props.position.longitude.toString()]
    }
      const post = {
        titre: this.state.titre,
        texte : this.state.texte,
        isAnonyme: this.state.isAnonyme,
        image: this.state.image,
        categorie: this.state.categorie,
        nbSignalement: 0,
        localisation: localisation,
        user: userMail,
        commentaire: [],
        date: yyyy + '-' + mm +'-' + dd + ' ' + hh + ":" + mn + ":" + ss ,
        couleur: colors[Math.floor((Math.random()*colors.length))],
        note: 0,
      };
      console.log(post)
      setNewPostDb(post)
        .then(data => {
          if(data == "{\"res\":\"correct\",\"message\":\"add post ok\"}"){
            console.log("Bien ajouté")
            this.props.back()
          }
          else{
            console.log("erreur add Post")
          }
        })
    }


  render(){

  const {classes} = this.props

  return (
    <Container component="main" maxWidth="xs" maxHeight="xs" className={classes.card}>

      <CssBaseline />
      <div className={classes.backButton}><IconButton aria-label="search" color="inherit" onClick={()=>this.props.back()}>
        <ArrowBackIcon />
      </IconButton></div>
      <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.title} >
        Ajouter un Post
      </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={this.onSubmit}>
          <FormControlLabel className={classes.fields}
          value="isAnonyme"
          name= "isAnonyme"
          checked= {this.state.isAnonyme}
          control={<Checkbox color="primary" />}
          label="Poster ce post en Anonyme"
          labelPlacement="end"
          onChange={this.onChange}
          />
          <TextField className={classes.fields} id="filled-basic"
          label="Titre"
          name="titre"
          placeholder="Titre du Post"
          required
          fullWidth
          autoFocus
          onChange={this.onChange}
          />
          <TextField className={classes.fields} id="outlined-multiline-static-label"
          label="Description"
          name="texte"
          placeholder="Décrivez ce qui vous est arrivé"
          multiline
          required
          fullWidth
          autoFocus
          marginTop
          onChange={this.onChange}
          />

          <Grid container justify='center' className={classes.fields}>
          <UploadButton changeValue={(url) => this.handleChangeUrl(url)} />
          </Grid>
{/* --------------Categories ---------------------------------------------------------- */}


<Typography component="h3" variant="bold" align="center" fontFamily="bold">
  Séléctionnez les catégories :
</Typography>
          <Grid className={classes.categoriesItem} container spacing={0}>


            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Amis"
              control={<Checkbox color="primary" />}
              label="Entre amis"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Couple"
              control={<Checkbox color="primary" />}
              label="Dans mon couple"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Ecole"
              control={<Checkbox color="primary" />}
              label="A l'école"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Famille"
              control={<Checkbox color="primary" />}
              label="En famille"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Rue"
              control={<Checkbox color="primary" />}
              label="Dans la rue"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Soiree"
              control={<Checkbox color="primary" />}
              label="En soirée"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Sport"
              control={<Checkbox color="primary" />}
              label="Au sport"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Transport"
              control={<Checkbox color="primary" />}
              label="Dans les transports"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Travail"
              control={<Checkbox color="primary" />}
              label="Au travail"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="TV"
              control={<Checkbox color="primary" />}
              label="A la télé"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Voisin"
              control={<Checkbox color="primary" />}
              label="Mes voisins"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Web"
              control={<Checkbox color="primary" />}
              label="Sur le web"
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <FormControlLabel
              name="categorie"
              value="Autre"
              control={<Checkbox color="primary" />}
              label="Autres..."
              labelPlacement="end"
              onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>

          <ColorButton variant="contained" color="primary" className={classes.margin} type="submit"
            fullWidth>
            Créer le post
          </ColorButton>

        </form>
      </div>

    </Container>
  );
}
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    position: state.position.position
  }
}



export default connect(mapStateToProps)(withStyles(useStyles)(AddPost))
