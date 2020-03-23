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
import {setUserDb, getUserFromDb} from '../API/UserApi'
import Noteworthy from '../fonts/Noteworthy-Lt.woff';
import cookie from 'react-cookies';
import {store} from '../Store/store'
import { connect } from 'react-redux'
import history from '../history';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  card: {
    boxShadow: "10px 10px 10px #9E9E9E",
    marginTop: 50
  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
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


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});





class Register extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      cpassword:'',
      errorMsg:'',
    }
  }


  validate = (i) => {
    let errorMsg = '';

    if(i == "mail" ) {
      errorMsg = "Il existe déja un compte lié à cet email";
    }
    else {
      if(i == "mdp" ) {
        errorMsg = "Les deux mots de passe ne sont pas identiques";
      }
    }
    if(errorMsg) {
      this.setState({errorMsg})
    }
  }


  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }


  onSubmit = (e) => {
    e.preventDefault();
  
    if(this.state.password == this.state.cpassword){
      const user = {
        username: this.state.username,
        post : [],
        password: bcrypt.hashSync(this.state.password, salt),
        email : this.state.email,
      };
      
      getUserFromDb(user.email)
      .then(data => {
        console.log(data)
        if(!(data.length==0)){
          console.log("email deja utilisé")
          this.validate("mail")
        }
        else {
          setUserDb(user)
          .then(data => {
            if(data == "{\"res\":\"correct\",\"message\":\"register ok\"}"){
              history.push('/login');
            }
            else{
              console.log("erreur register")
            }
          })
        }
      })
    }
    else {
      this.validate("mdp");
    }
  }


  render(){

  const {classes} = this.props


  return (
    <Container component="main" maxWidth="xs" maxHeight="xs">
    <Card className={classes.card}>
      <CardContent>
        <Link to="/login">
          <IconButton  aria-label="search">
            <ArrowBackIcon />
          </IconButton>
        </Link>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Remy Sharp" src="/assets/H2R.png" className={classes.large} />

        <Typography component="h1" variant="h5" className={classes.title} >
          Register
        </Typography>
        { this.state.errorMsg ? (
          <div style = {{color:"red", fontSize : 15}}>{this.state.errorMsg}</div>
          ) : null }
        <form className={classes.form}  onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Pseudo"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirmation mot de passe"
            type="password"
            id="cpassword"
            autoComplete="confirmed-password"
            onChange={this.onChange}
          />

          <ColorButton variant="contained" color="primary" className={classes.margin} type="submit"
            fullWidth>
            Register
          </ColorButton>

        </form>
      </div>
      </CardContent>
    </Card>
    </Container>
  );
}
}


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Register))
