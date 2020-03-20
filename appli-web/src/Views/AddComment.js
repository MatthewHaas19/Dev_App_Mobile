import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, blue, purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {getUserFromDb} from '../API/UserApi'
import Noteworthy from '../fonts/Noteworthy-Lt.woff';
import cookie from 'react-cookies';
import {store} from '../Store/store'
import { connect } from 'react-redux'
import history from '../history';
import { setNewCommentDb } from '../API/CommentApi';
var bcrypt = require('bcryptjs');

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 15
  },
  margin: {
    margin: theme.spacing(1),
    margin: theme.spacing(3, 0, 2),
  },
  fields: {
    marginBottom: theme.spacing(5)
  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
  },
  spacer:{
    marginBottom: theme.spacing(7),
  }
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


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});





class AddComment extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      titreCom: '',
      texteCom: '',
      isAnonyme : false,
      idPost:''
    }

    console.log("test")

  }



  componentWillReceiveProps(nextProps) {
    console.log("test")
    console.log(nextProps.idpost)
    if (nextProps.idpost !== this.state.idPost) {
      this.setState({ idPost: nextProps.idpost });
    }


  }


  onChange = (e) => {

    if (e.target.name == "isAnonyme") {
      this.setState({[e.target.name]: e.target.checked })
    }
    else {
      this.setState({[e.target.name]: e.target.value })
    }
  }

  onSubmit = (e) => {
    this.setState({idPost:this.props.currentIdPost})
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
     const comment = {
        titreCom: this.state.titreCom,
        dateCom: yyyy + '-' + mm +'-' + dd + ' ' + hh + ":" + mn + ":" + ss ,
        isAnonyme: this.state.isAnonyme,
        user: userMail,
        texteCom : this.state.texteCom,
        voteCom: 0,
        postId : this.state.idPost, //A FAIRE
      };
      console.log(comment)
      setNewCommentDb(comment)
        .then(data => {
          if(data == "{\"res\":\"correct\",\"message\":\"add comment ok\"}"){
            console.log("Comment Bien ajouté")
            history.push('/');
          }
          else{
            console.log("erreur add Comment")
          }
        })
    }


  render(){

  const {classes} = this.props


  return (
    <Container component="main" maxWidth="xs" maxHeight="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title} >
          Ajouter un commentaire
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
        <FormControlLabel className={classes.fields}
          value="isAnonyme"
          name= "isAnonyme"
          checked= {this.state.isAnonyme}
          control={<Checkbox color="primary" />}
          label="Poster ce commentaire en Anonyme"
          labelPlacement="end"
          onChange={this.onChange}
          />
          <TextField className={classes.fields} id="filled-basic"
          label="Titre"
          name="titreCom"
          placeholder="Titre du commentaire"
          required
          fullWidth
          autoFocus
          onChange={this.onChange}
          />
          <TextField className={classes.fields} id="outlined-multiline-static-label"
          label="Description"
          name="texteCom"
          placeholder="Ecrivez votre commentaire"
          multiline
          required
          fullWidth
          autoFocus
          marginTop
          onChange={this.onChange}
          />


          <ColorButton variant="contained" color="primary" className={classes.margin} type="submit"
            fullWidth>
           Poster votre commentaire
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
    currentIdPost: state.posts.currentIdPost
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AddComment))