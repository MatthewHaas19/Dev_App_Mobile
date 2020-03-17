import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';



const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height:200,
    color:"white"
  },
  username: {
    fontSize: 14,
  },
  texte: {
    marginTop:20,
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
  <CardContent className={classes.root} style={{ background: `rgb(${col})` }}>
  <Grid container>
  <Grid item xs={8}>
    <Typography className={classes.username}  gutterBottom>
      {props.post.user}
    </Typography>
    </Grid>
    <Grid item xs={4}>
    <Typography className={classes.localisation}  align="right" gutterBottom>
     123 km
    </Typography>
    </Grid>
  </Grid>

  <Grid container>

    <Grid item xs={8}>
      <Typography variant="h5" component="h2">
        {props.post.titre}
      </Typography>
      <Typography className={classes.texte} >
        {props.post.texte}
      </Typography>
    </Grid>

    <Grid item xs={4}>
      <Icon className="keyboard_arrow_up"/>
    </Grid>

  </Grid>

  </CardContent>
  </CardActionArea>
</Card>
    ): null
  }

  </div>
)
}

export default (RowPostView)
