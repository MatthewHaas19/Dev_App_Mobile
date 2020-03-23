import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExploreTwoToneIcon from '@material-ui/icons/ExploreTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {deletePost} from '../API/PostApi'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = theme => ({
  root: {
    minWidth: 275,
    minhHeight:200,
    color:"black",
  },
  content: {
    marginTop:20,
  },

  username: {
    fontSize: 14,
    fontWeight: "bold",
    color:"white",
  },
  texte: {
    marginTop:18,
  },
  titre: {
    fontSize:22,
  },
  note: {
    fontSize:20,
    fontWeight:"bold",
    alignItems:"center",
    color:"white"
  },
  chevron: {
    fontSize:40,
    alignItems:"center",
    color:"white"
  },
  notefleches:{
    marginTop:35,
    margin:20,
    color:"white",
  },
  localisation: {
    marginRight:20,
    fontWeight:"bold",
    color:"white",
  },
  logosTop: {
    fontSize:20,
    marginRight:10,
    color:"white",
  },
  text:{
    margin:20,
    color:"white",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
     marginTop: 80,
     "&:hover": {
      background: "grey"
    },
  }
});




class RowPostViewAdmin extends React.Component{

  state = {
    showDialogComfirm:false,
    modif:false,
  }

  constructor(props){
    super(props)

  }

  deletePostFunction(id){
    //deletePost(id).then(res => {
      this.setState({showDialogComfirm:false, modif:true})
      this.props.postHasBeenDeleted()
    //}).catch((error) => {
    //  console.log("Erreur dans la suppression")
  //  })
  }


  render(){
  const {classes} = this.props
  const handleClose = () => {
    this.setState({showDialogComfirm:false});
    };



  return(
    <div>
    { this.props.post ? (
      <Card >

  <Grid container style={{verticalAlign: 'baseline'}}>
  <Grid item xs={10} align="left" style={{ background: `rgb(${[this.props.post.couleur[0]*255,this.props.post.couleur[1]*255,this.props.post.couleur[2]*255]}` }}>

  <Grid container alignItems="center" className={classes.content} >
  <Grid item xs={1} align="right">
  <AccountCircleIcon className={classes.logosTop}/>
  </Grid>
  <Grid item xs={7} >
    <div className={classes.username} >
      {this.props.post.user}
    </div>
    </Grid>
    <Grid item xs={3} align="right">
    <Typography className={classes.localisation}  gutterBottom>
     123 km
    </Typography>
    </Grid>
    <Grid item xs={1} align="left">
    <ExploreTwoToneIcon className={classes.logosTop}/>
    </Grid>
  </Grid>

  <Grid container alignItems="center">

    <Grid item  className={classes.text} alignItems="center">
      <Typography className={classes.titre}>
        {this.props.post.titre}
      </Typography>
      <Typography className={classes.texte} >
        {this.props.post.texte}
      </Typography>
    </Grid>


  </Grid>


  </Grid>
  <Grid item xs={2} align="center" style={{ background: `rgb(${[this.props.post.couleur[0]*255,this.props.post.couleur[1]*255,this.props.post.couleur[2]*255]})` }}>
    <Button className={classes.deleteButton} onClick={() => this.setState({showDialogComfirm:true})} > {<DeleteIcon />} </Button>
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
      Supprimer un post est irréversible.
      Tous ses commentaires et votes seront supprimés en même temps
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Annuler
    </Button>
    <Button onClick={() => this.deletePostFunction(this.props.post._id)}
     style={{backgroundColor:"red", color:"white"}} autoFocus>
      Supprimer
    </Button>
  </DialogActions>
  </Dialog>



</Card>




    ): null
  }

  </div>
)
}}

export default withStyles(useStyles)(RowPostViewAdmin)
