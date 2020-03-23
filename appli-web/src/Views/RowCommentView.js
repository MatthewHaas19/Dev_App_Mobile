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
import { connect } from 'react-redux'

const useStyles = theme => ({
  root: {
    minWidth: 275,
    minHeight:200,
    color:"black"
  },

  username: {
    fontSize: 14,
    fontWeight: "bold",

  },
  texte: {
    marginTop:18,
    paddingLeft : 20,
  },
  titre: {
    fontSize:22,
    paddingLeft : 20,
  },
  note: {
    fontSize:20,
    fontWeight:"bold",
  },
  chevron: {

    alignItems:"center",
    color:"black",
  },
  notefleches:{
    margin:0,
  },

  logosTop: {
    fontSize:20,
    marginRight:10,
    flexBasis : 0,
  },

});




class RowCommentView extends React.Component {

  constructor(props){
    super(props)

  }

  vote(vote){
    this.props.handlevote(vote)
  }

  getArrowDown(){
    var votes = this.props.votes
    console.log(votes)
    let vote = votes.votesComment.filter(item => item.comment == this.props.comments._id)
    if(vote.length > 0){
      if(vote[0].like=="true"){
        console.log("true true")
        return 40
      }else{
        return 50
      }
    }else{
      return 40
    }
  }
  getArrowUp(){
    var votes = this.props.votes
    let vote = votes.votesComment.filter(item => item.comment == this.props.comments._id)
    if(vote.length > 0){
      if(vote[0].like=="true"){
        console.log("true true")
        return 50
      }else{
        return 40
      }
    }else{
      return 40
    }
  }



  render(){

    const {classes} = this.props


      return(
        <div>
        { this.props.comments ? (
    <Card >

    <Grid container>
    <Grid item xs={10} align="left" style={{ background: `rgb([100,50,10])` }}>
    <CardActionArea className={classes.root}>

    <Grid container alignItems="right" className={classes.content} >
    <Grid item xs={1} align="right">
    <AccountCircleIcon className={classes.logosTop}/>
    </Grid>

    <Grid item xs={7} >
        <div className={classes.username}  alignItems="left" >
          {this.props.comments.user}
        </div>
        </Grid>

    </Grid>

    <Grid container alignItems="center">

     <Grid item xs={10}>
          <Typography className={classes.titre}>
            {this.props.comments.titreCom}
          </Typography>
          <Typography className={classes.texte} >
            {this.props.comments.texteCom}
          </Typography>
     </Grid>


    </Grid>
    </CardActionArea>
    </Grid>
    <Grid item xs={2} className={classes.notefleches}>
     <div  style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', paddingTop: '40px'}}>
       <Grid container align="right">
            <Grid item xs={12} align="center">
              <Button onClick={() => this.vote("+")}><KeyboardArrowUpIcon style={{fontSize: this.props.votes ? this.getArrowUp() : 40}} className={classes.chevron} /></Button>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.note} align="center" >{this.props.comments.voteCom}</div>
            </Grid>
            <Grid item xs={12} align="center">
              <Button onClick={() => this.vote("-")}><KeyboardArrowDownIcon style={{fontSize: this.props.votes ? this.getArrowDown() : 40}} className={classes.chevron}   /></Button>
            </Grid>
          </Grid>
     </div>




        </Grid>
    </Grid>

    </Card>

        ): null
      }

      </div>
    )
  }
}



const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser,
    posts: state.posts.posts,
    votes: state.votes
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(RowCommentView))
