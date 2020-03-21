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
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = theme => ({
  root: {
    minWidth: 275,
    height:200,
    color:"black",
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
  }
});




class RowPostView extends React.Component{

  constructor(props){
    super(props)
    this.state={
      up:false,
      down:false
    }

  }


  getArrowDown(){
    var votes = this.props.votes
    let vote = votes.votes.filter(item => item.post == this.props.post._id)
    if(vote.length > 0){
      if(vote[0].like=="true"){
        console.log("true true")
        return 40
      }else{
        return 50
      }
    }
  }
  getArrowUp(){
    var votes = this.props.votes
    let vote = votes.votes.filter(item => item.post == this.props.post._id)
    if(vote.length > 0){
      if(vote[0].like=="true"){
        console.log("true true")
        return 50
      }else{
        return 40
      }
    }
  }

  vote(vote){
    this.props.handlevote(vote)
  }


  render(){
  const {classes} = this.props




  return(
    <div>
    <p></p>
    { this.props.post ? (
      <Card >

  <Grid container>
  <Grid item xs={10} align="left" style={{ background: `rgb(${[this.props.post.couleur[0]*255,this.props.post.couleur[1]*255,this.props.post.couleur[2]*255]}` }}>
  <CardActionArea className={classes.root}>
  <Link to={"/postdetailview/"+ this.props.post._id}  style={{ textDecoration: 'none' }} >

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
  </Link>
  </CardActionArea>
  </Grid>
  <Grid item xs={2} align="right" style={{ background: `rgb(${[this.props.post.couleur[0]*255,this.props.post.couleur[1]*255,this.props.post.couleur[2]*255]})` }}>
  <Grid item className={classes.notefleches} >
    <Grid container align="right">
      <Grid item xs={12} align="center">
        <Button onClick={() => this.vote("+")}><KeyboardArrowUpIcon style={{fontSize: this.props.votes ? this.getArrowUp() : 40}}className={classes.chevron} /></Button>
      </Grid>
      <Grid item xs={12} align="center">
        <div className={classes.note} align="center" >{this.props.post.note}</div>
      </Grid>
      <Grid item xs={12} align="center">
        <Button onClick={() => this.vote("-")}><KeyboardArrowDownIcon style={{fontSize: this.props.votes ? this.getArrowDown() : 40}} className={classes.chevron} /></Button>
      </Grid>
    </Grid>
  </Grid>
  </Grid>
  </Grid>

</Card>
    ): null
  }

  </div>
)
}}


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    posts: state.posts.posts,
    votes: state.votes
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(RowPostView))
