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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height:200,
    color:"white"
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
    color:"white"
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
});




const RowPostView = (props) => {
  const classes = useStyles();
  const col = [props.post.couleur[0]*255,props.post.couleur[1]*255,props.post.couleur[2]*255]
  return(
    <div>
    { props.post ? (
      <Card >
      <CardActionArea>
      <Link to={"/postdetailview/"+ props.post._id}> 
  <CardContent className={classes.root} style={{ background: `rgb(${col})` }}>
  <Container className={classes.content}>
  <Grid container alignItems="center">
  <Grid item xs={1} align="right">
  <AccountCircleIcon className={classes.logosTop}/>
  </Grid>
  <Grid item xs={7} >
    <div className={classes.username} >
      {props.post.user}
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

  <Grid container>

    <Grid item xs={10}>
      <Typography className={classes.titre}>
        {props.post.titre}
      </Typography>
      <Typography className={classes.texte} >
        {props.post.texte}
      </Typography>
    </Grid>

    <Grid item xs={2} className={classes.notefleches}>
      <Grid container align="right">
        <Grid item xs={12} align="center">
          <Button><KeyboardArrowUpIcon className={classes.chevron} /></Button>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.note} align="center" >{props.post.note}</div>
        </Grid>
        <Grid item xs={12} align="center">
          <Button><KeyboardArrowDownIcon className={classes.chevron} /></Button>
        </Grid>
      </Grid>



    </Grid>

  </Grid>
  </Container>
  </CardContent>
  </Link>
  </CardActionArea>
</Card>
    ): null
  }

  </div>
)
}

export default (RowPostView)
