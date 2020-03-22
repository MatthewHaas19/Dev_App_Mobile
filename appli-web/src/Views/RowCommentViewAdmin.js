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
import { getPostById } from '../API/PostApi';
import DeleteIcon from '@material-ui/icons/Delete';
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
    height:200,
    color:"black",
  },
  content: {
    margin:20,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
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
  },
  chevron: {
    fontSize:40,
    alignItems:"center",
    color:"black"
  },
  notefleches:{
    margin:0,
  },
  localisation: {
    marginRight:20,
    fontWeight:"bold",
  },
  logosTop: {
    fontSize:20,
    marginRight:10,
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
     marginTop: 30,
     "&:hover": {
      background: "grey"
    },
  }
});

class RowCommentViewAdmin extends React.Component{

  state = {
      showDialogComfirm:false,
    }

    constructor(props){
      super(props)
    }

    deleteCommentFunction(id){
      //deleteComment(id).then(res => {
        this.setState({showDialogComfirm:false})
        this.props.commentHasBeenDeleted()
      //}).catch((error) => {
      //  console.log("Erreur dans la suppression")
    //  })
    }


  render(){
      const {classes} = this.props
      const handleClose = () => {
        this.setState({showDialogComfirm:false});
      }



    return(
      <div>
      { this.props.comments ? (
        <Card >
    <CardContent className={classes.root} style={{ background: `rgb([100,50,10])` }}>
    <Container className={classes.content}>
    <Grid container alignItems="center">
    <Grid item xs={1} align="right">
    <AccountCircleIcon className={classes.logosTop}/>
    </Grid>
    <Grid item xs={7} >
      <div className={classes.username} >
        { this.props.comments.user}
      </div>
      </Grid>

    </Grid>

    <Grid container>

      <Grid item xs={10}>
        <Typography className={classes.titre}>
          { this.props.comments.titreCom}
        </Typography>
        <Typography className={classes.texte} >
          { this.props.comments.texteCom}
        </Typography>
      </Grid>

      <Grid item xs={2} className={classes.notefleches}>

        <Button className={classes.deleteButton} onClick={() => this.setState({showDialogComfirm:true})} > {<DeleteIcon />} </Button>
        </Grid>





    </Grid>
    </Container>
    </CardContent>

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
        Supprimer un Commentaire est irréversible.
        Tous ses votes seront supprimés en même temps
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Annuler
      </Button>
      <Button onClick={() => this.deleteCommentFunction(this.props.comments._id)}
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
  }
}



  export default withStyles(useStyles)(RowCommentViewAdmin)
