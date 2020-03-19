import React, {Component} from 'react';
import { connect } from 'react-redux'
import cookie from 'react-cookies';
import history from '../history';
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
import EditIcon from '@material-ui/icons/Edit';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';
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
  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
  },
  subtitle: {
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  count:{
    marginTop: theme.spacing(4)
  },
  spacer:{
    marginTop: theme.spacing(8)
  },
  numbers:{
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Noteworthy Light',
    fontWeight:"fontWeightBold"
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


class Profile extends React.Component {

  constructor(props){
    super(props)

  }

  _Deco(){
    cookie.remove('userId', { path: '/' })
    var action = { type: "TOGGLE_UNAUTH"}
    this.props.dispatch(action)
    history.push('/filter');
  }

  render(){
    const {classes} = this.props
      return (
        <div>
        <Container component="main"  maxHeight="xs">
        <Card className={classes.card}>
          <CardContent>
          <CssBaseline />
          <Grid container
          direction="row"
          justify="space-between"
          alignItems="baseline">
          <Grid justify="flex-start">
          <IconButton aria-label="search" color="inherit" >
            <EditIcon />
          </IconButton>
          </Grid>
          <Grid justify="flex-end">
          <IconButton aria-label="search" color="red" onClick={()=>this._Deco()}>
            <PowerSettingsNewIcon />
          </IconButton>
          </Grid>
          </Grid>
          <div className={classes.paper}>

          <Typography component="h1" variant="p" className={classes.numbers} >
            Mon Profile
          </Typography>
            <Avatar alt="Remy Sharp" src="https://media-exp1.licdn.com/dms/image/C4D03AQEE5KO1Z6RuCQ/profile-displayphoto-shrink_200_200/0?e=1589414400&v=beta&t=9AxoJc_fUOa-wRgfFmObUI9_QiWOZ1ZGa3BLuswyL9c" className={classes.large} />

            <Typography component="h3" variant="p" className={classes.title} >
              {this.props.currentUser.username}
            </Typography>


            <Grid container
            direction="row"
            justify="space-around"
            alignItems="baseline" className={classes.count}>

            <Grid>
            <Grid container justify = "center" >

            <Typography component="h3" variant="p" className={classes.numbers} >
              0
            </Typography>
            <Typography component="h3" variant="p" className={classes.title} >
              Posts
            </Typography>
            </Grid>
            </Grid>

            <Grid>
            <Grid container justify = "center" >
            <Typography component="h3" variant="p"  className={classes.numbers} >
              0
            </Typography>
            <Typography component="h3" variant="p" className={classes.title} >
              Comments
            </Typography>
            </Grid>
            </Grid>

            </Grid>

        <Button variant="contained" color="primary" onClick={()=>this._Deco()} className={classes.spacer}>
          Deconnexion
        </Button>
        </div>
        </CardContent>
      </Card>
      </Container>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Profile))
