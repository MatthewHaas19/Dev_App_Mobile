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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = theme => ({

  mainPage: {
    backgroundColor: "#7bbcc0",
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
    showDialogComfirm: false,
  }

  constructor(props){
    super(props)
    console.log(this.props.userAdmin)
  }

  handleClose () {
    this.setState({showDialogComfirm:false});
  };

  deleteUserFunction(id){
    //eletePost(id).then(res => {
      this.state.showDialogComfirm = false
      this.props.show(false)
      this.props.userHasBeenDeleted()
  //  }).catch((error) => {
  //    console.log("Erreur dans la suppression")
  //  })
  }


  render(){


    const {classes} = this.props
    const handleClose = () => {
        this.setState({showDialogComfirm:false});
      };
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
        <Button className={classes.deleteButton} align="center" onClick={() => this.setState({showDialogComfirm:true})}>Supprimer l'utilisateur</Button>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        </Grid>


        <Dialog
            open={this.state.showDialogComfirm}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
          <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Supprimer un utilisateur est irréversible.
            Tous ses posts, commentaires et votes seront supprimés en même temps
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={() => this.deleteUserFunction(this.props.userAdmin._id)}
           style={{backgroundColor:"red", color:"white"}} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
        </Dialog>




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
