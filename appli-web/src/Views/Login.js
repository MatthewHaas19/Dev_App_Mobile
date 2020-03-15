import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, blue, purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
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

import history from '../history';

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





class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email : this.state.email,
      password: this.state.password
    };
    console.log(user);

    getUserFromDb(user.email)
      .then(data => {
        console.log(data)
        if(data.length==0){
          console.log("email incorrect")
        }
        else{
          if(data[0].password === user.password){
            console.log("correct password")
            history.push('/');
          }else{
            console.log("password incorrect")
          }
        }
      })
  }


  render(){

  const {classes} = this.props


  return (
    <Container component="main" maxWidth="xs" maxHeight="xs">
    <Card className={classes.card}>
      <CardContent>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Remy Sharp" src="/assets/H2R.png" className={classes.large} />

        <Typography component="h1" variant="h5" className={classes.title} >
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
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

          <ColorButton variant="contained" color="primary" className={classes.margin} type="submit"
            fullWidth>
            Login
          </ColorButton>

          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Pas encore de compte ?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </CardContent>
    </Card>
    </Container>
  );
}
}

export default withStyles(useStyles)(Login)
