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
import {getVoteByUser} from '../API/VoteApi'
import Noteworthy from '../fonts/Noteworthy-Lt.woff';
import cookie from 'react-cookies';
import {store} from '../Store/store'
import { connect } from 'react-redux'
import history from '../history';
var bcrypt = require('bcryptjs');

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
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





class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMsg:'',
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }
  validate = (i) => {
    let errorMsg = '';

    if(i == "mail" ) {
      errorMsg = "Aucun compte n'est lié à cet email";
    }
    else {
      if(i == "mdp" ) {
      errorMsg = "Mot de passe incorrect";
    }
    else{
      if(i == "vide" ) {
        errorMsg = "Les champs de saisie sont vides";
      }

    }
    }
    
    if(errorMsg) {
      this.setState({errorMsg})
    }
    

  }
 

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email : this.state.email,
      password: this.state.password
    };
    console.log(user);
    if ( !(user.email.length > 0) && !(user.email.password > 0)) {
      this.validate("vide")
    }
    else {
    getUserFromDb(user.email)
      .then(data => {
        console.log(data)
        if(data.length==0){
          console.log("email incorrect")
          this.validate("mail")
        }
        else{
          if(bcrypt.compareSync(user.password,data[0].password)){
            getVoteByUser(data[0].email).then(votes => {
              var action = { type: "TOGGLE_USER_VOTE", userVote: votes}
              this.props.dispatch(action)

            })

            var action = { type: "TOGGLE_USER", currentUser: data[0]}
            this.props.dispatch(action)

            cookie.save('userId', user.email, { path: '/' })

            action = { type: "TOGGLE_AUTH"}
            this.props.dispatch(action)
            this.props.back()
            history.push("/")
          }else{
            console.log("password incorrect")
            this.validate("mdp")
          }
        }
      })
    }
  }


  render(){

  const {classes} = this.props


  return (
    <Container component="main" maxWidth="xs" maxHeight="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Remy Sharp" src="/assets/H2R.png" className={classes.large} />

        <Typography component="h1" variant="h5" className={classes.title} >
          Login
        </Typography>
        { this.state.errorMsg ? (
          <div style = {{color:"red", fontSize : 15}}>{this.state.errorMsg}</div>
          ) : null }
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
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

          <ColorButton variant="contained" color="primary" className={classes.margin} onClick={this.onSubmit}
            fullWidth>
            Login
          </ColorButton>

          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item className={classes.spacer}>
              <Link to="/register">
                {"Pas encore de compte ?"}
              </Link>
            </Grid>
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
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Login))
