import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { green, blue, red , white} from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getAllPostsFromDb} from '../API/PostApi'
import {getAllCommentFromPost} from '../API/CommentApi'
import {getAllReportFromPost} from '../API/ReportApi'
import RowPostView from '../Views/RowPostView'
import Table from '@material-ui/core/Table';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'

const useStyles = theme => ({

  mainPage: {
    backgroundColor: "#FAA65F",
    width: 500,
    height: 500,
    color: "black",

  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 15,
    alignItems:"center"
  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 20,
    marginTop:30,
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
    fontSize:23,
  },
  deleteButton: {
    marginTop:50,
    color:"white",
    backgroundColor:"red",
  },
});




class AdminProfilUser extends React.Component {
  state = {
    user:{},
  }

  constructor(props){
    super(props)
    console.log(this.props.userAdmin)
  }

  deleteUserFunction(id){
    //eletePost(id).then(res => {
      this.props.show(false)
      this.props.userHasBeenDeleted()
  //  }).catch((error) => {
  //    console.log("Erreur dans la suppression")
  //  })
  }


  render(){


    const {classes} = this.props

    return (

      <div className={classes.mainPage}>



        <h1 align="center">Profil de l'utilisateur </h1>

        <Grid container>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} align="center">
        <Avatar alt="Remy Sharp" src="https://media-exp1.licdn.com/dms/image/C4D03AQEE5KO1Z6RuCQ/profile-displayphoto-shrink_200_200/0?e=1589414400&v=beta&t=9AxoJc_fUOa-wRgfFmObUI9_QiWOZ1ZGa3BLuswyL9c" className={classes.large} align="center" />
        </Grid>
        <Grid item xs={3}>
        </Grid>
        </Grid>


        <Typography component="h3" variant="p" className={classes.title} >
          Username : {this.props.userAdmin.username}
        </Typography>

        <Typography component="h3" variant="p" className={classes.title}  >
          Email : {this.props.userAdmin.email}
        </Typography>

        <Grid container>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} align="center">
        <Button className={classes.deleteButton} align="center" onClick={() => this.deleteUserFunction(this.props.userAdmin._id)}>Supprimer l'utilisateur</Button>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        </Grid>





      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    userAdmin: state.userAdmin.user
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AdminProfilUser))
