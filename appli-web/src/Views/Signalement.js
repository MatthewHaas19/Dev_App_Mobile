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
import {setNewReport} from '../API/ReportApi'

import Noteworthy from '../fonts/Noteworthy-Lt.woff';
import cookie from 'react-cookies';
import {store} from '../Store/store'
import { connect } from 'react-redux'
import history from '../history';
import { setNewCommentDb } from '../API/CommentApi';
var bcrypt = require('bcryptjs');

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
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
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontWeight: 400,
    fontSize:15
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





class Signalement extends React.Component {

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

  onChange = (e) => {

    if (e.target.name == "isAnonyme") {
      this.setState({[e.target.name]: e.target.checked })
    }
    else {
      this.setState({[e.target.name]: e.target.value })
    }
  }

  onSubmit = (e) => {
    console.log("--------- Signalement ----------------")
    this.setState({idPost:this.props.idpost})
    if(this.props.isAuth){
      let report = {
        idPost: this.props.idpost,
        emailUser: this.props.currentUser.email
      }
      setNewReport(report).then(data => {
        console.log(data.res)
        this.props.back()
      })
    }else{
      console.log("tu ne peux pas voter sans être connecté")
      this.props.back()
    }


  }


  render(){

  const {classes} = this.props


  return (
    <Container component="main" maxWidth="xs" maxHeight="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title} >
          Signaler le post
        </Typography>
        <Typography component="h1" variant="h5" className={classes.subtitle} >
          Etes-vous sûr de vouloir signaler le post ?
        </Typography>
        <div className={classes.form}>

        <Grid container justify="space-between"
  alignItems="center">

          <Button  color="primary" className={classes.margin} onClick={() => this.props.back() }
            >
           Retour
          </Button>
          <Button  color="secondary" className={classes.margin} onClick={this.onSubmit}
            >
           Signaler
          </Button>
        </Grid>
        </div>
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

export default connect(mapStateToProps)(withStyles(useStyles)(Signalement))
