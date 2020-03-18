import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, blue, purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Slider from '@material-ui/core/Slider';
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
import cookie from 'react-cookies';
import {store} from '../Store/store'
import { connect } from 'react-redux'
import history from '../history';
import MyTabs from './component/Tab'
import AddIcon from '@material-ui/icons/Add';
import GridListTile from '@material-ui/core/GridListTile';
var bcrypt = require('bcryptjs');

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
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    margin: "15px",
    backgroundColor:blue[400],
    color: "white"
  },
  margin: {
    marginTop: theme.spacing(7),
    width:"30%"
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
  subtitle: {
    margin:"5%",
    color: blue[400],
    fontFamily: 'Noteworthy Light',
    fontWeight: 400,
  },
  tags: {
    width: "auto"
  },
  button: {
    marginLeft: "100%"
  },
  list:{
    display: 'flex',
    padding: 0,
    width: "auto",
  },
  listItem:{
    width: "auto"
  },
  chip:{
    backgroundColor:blue[400],
    color: "white",
    height: "40px"
  },
  slider:{
    marginTop:theme.spacing(5),
  },
  paperTag:{
    overflow: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
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



class Filter extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      type : 0,
      tags : ["exemple"],
      tag:"",
      localisation:"60"
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  onChangeType = (newValue) => {
    this.setState({type: newValue })
  }

  onChangeTag = (e) => {
    this.setState({tag:e.target.value})

  }

  onAddTag = () => {
    var tab = this.state.tags
    tab.push(this.state.tag)
    this.setState({tag: "" })
    this.setState({tags: tab })

  }

  onSubmit = () => {
    console.log("submit filter")
    const filter = {
      type: this.state.type,
      tags: this.state.tags,
      localisation: this.state.localisation
    }
    console.log(filter)
  }

  onChangeLoc = (value) => {
    this.setState({localisation:value})
  }

  handleDelete(tag){

    const tags = this.state.tags
    var tab = tags.filter(item => item !== tag)

    this.setState({tags:tab})
  }

  valuetext(value) {
    return `${value}°C`;
  }

  render(){

  const {classes} = this.props

  const tagsList = this.state.tags.map((tag) =>
    <ListItem button className={classes.listItem}>
    <ListItemIcon>
     <Chip label={tag} onDelete={() => this.handleDelete(tag)} className={classes.chip}/>
    </ListItemIcon>
    </ListItem>
  );

  return (
    <Container component="main" maxWidth="md" maxHeight="xs">
    <Card className={classes.card}>
      <CardContent>
      <CssBaseline />
      <div className={classes.paper}>


        <Typography component="h1" variant="h3" className={classes.title} >
          Filtrer les Posts
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>



          <Grid container justify = "center">

          <Typography component="h1" variant="h5" className={classes.subtitle} >
            Filtrer selon le type
          </Typography>
          <div style={{ width: '80%' }}>
          <MyTabs
            changeValue={(newValue) => this.onChangeType(newValue)}
          />
          </div>

          <Typography component="h1" variant="h5" className={classes.subtitle} >
            Filtrer avec des tags
          </Typography>
          <div style={{ width: '80%' }}>
          <Grid container justify = "center">
          <Box component="div" display="inline" >

          <TextField
            variant="outlined"
            margin="normal"
            id="tags"
            label="Add tags"
            name="tags"
            className={classes.tags}
            value={this.state.tag}
            onChange={(newValue) => this.onChangeTag(newValue)}
          />

          </Box>
          <Box component="div" display="inline">
          <Fab color="primary" aria-label="add" className={classes.large} onClick={() => this.onAddTag()}>
            <AddIcon />
          </Fab>

          </Box>
</Grid>
          <Paper className={classes.paperTag}>
          <List className={classes.list}>

            {tagsList}

          </List>
          </Paper>
          <Grid container justify = "center">
            <Typography component="h1" variant="h5" className={classes.subtitle} >
              Filtrer par localisation
              </Typography>
          </Grid>

          <Grid item xs className={classes.slider}>
            <Slider aria-labelledby="continuous-slider" defaultValue="60"
              getAriaValueText={this.valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={100}
              id="localisation"
              name="localisation"
              onChange={(e, val) => this.onChangeLoc(val)}
              />
          </Grid>
          <Grid container justify = "center">
            <ColorButton variant="contained" color="primary" className={classes.margin} onClick={() => this.onSubmit()}>
              Filter
            </ColorButton>
          </Grid>
          </div>
          </Grid>
          <div>

          </div>
        </form>
      </div>
      </CardContent>
    </Card>
    </Container>
  );
}
}


const mapStateToProps = state =>{
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Filter))
