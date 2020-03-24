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
import Switch from '@material-ui/core/Switch';
import DoneIcon from '@material-ui/icons/Done';
import Slider from '@material-ui/core/Slider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  BrowserRouter as Router,
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
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonBack:{
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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
    marginBottom:theme.spacing(5),
  },
  paperTag:{
    overflow: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  categories: {
    width: "100px",
    margin: "auto"
  },
  largeAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
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

const listCategorie = ["Amis","Couple","Ecole","Famille","Rue","Soiree","Sport","Transport","Travail","TV","Voisin","Web","Autres"]

class Filter extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      type : 0,
      tags : [],
      tag:"",
      localisation:"60",
      checked:[false,false,false,false,false,false,false,false,false,false,false,false,false],
      width: window.innerWidth,
      height: window.innerHeight,
      loc:false
    }
  }


  updateDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
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

  handleChangeAll = () => event => {
    const cat = this.state.checked
    for (var i = 0; i < cat.length; i++) {
      cat[i] = event.target.checked
    }
    this.setState({ checked: cat });
  };

  handleChangeLoc = () => event => {

    this.setState({ loc: event.target.checked });
  };

  handleChange = (index) => event => {

    const cat = this.state.checked
    cat[index] = event.target.checked
    this.setState({ checked: cat });
  };

  onAddTag = () => {
    var tab = this.state.tags
    tab.push(this.state.tag)
    this.setState({tag: "" })
    this.setState({tags: tab })

  }

  onSubmit = () => {


    const cat = this.state.checked
    const res = []
    for (var i = 0; i < cat.length; i++) {
      if(cat[i]==true){
        res.push(listCategorie[i])
      }
    }

    var type = "Plus recent"

    if(this.state.type == 1){
      type = "Plus populaire"
    }

    var localisation = 9999

    if(this.state.loc){
      localisation = parseInt(this.state.localisation)
    }

    const filter = {
      type: type,
      tags: this.state.tags,
      localisation: localisation,
      categorie: res
    }

    this.props.filter(filter)
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

  const filterCat = listCategorie.map((value,index) =>
  <Grid container>
    <Grid item xs={6}>
      <Avatar alt="b" src={"/assets/"+value+".png"}  className={classes.largeAvatar}/>
    </Grid>
    <Grid item xs={6}>
      <FormControlLabel
    control={
      <Switch checked={this.state.checked[index]}
      onChange={this.handleChange(index)
    } color="primary" />
    }
    label={value}
    />
    </Grid>

    </Grid>
  );

  return (
    <Container component="main" maxWidth="md" maxHeight="xs">
    <Card className={classes.card}>
      <CardContent>
      <CssBaseline />
      <div className={classes.paper}>

      {this.state.width < 1275 ?
        <Grid container justify = "left" className={classes.buttonBack}>
      <IconButton aria-label="search" color="inherit" onClick={()=>this.props.back()}>
        <ArrowBackIcon />
      </IconButton>
      </Grid>

      : null}

        <Typography component="h1" variant="h3" className={classes.title} >
          Filtrer les Posts
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>



          <Grid container justify = "center">

          <Typography component="h1" variant="h5" className={classes.subtitle} >
            Filtrer selon le type
          </Typography>
          <div style={{ width: this.state.width>1580 ? '80%' : '100%' }}>
          <MyTabs
            changeValue={(newValue) => this.onChangeType(newValue)}
          />
          </div>

          <Typography component="h1" variant="h5" className={classes.subtitle} >
            Filtrer avec des tags
          </Typography>
          <div style={{ width: '90%' }}>
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
          <Grid container justify = "center" className={classes.paperTag}>
            <FormControlLabel
            control={
              <Switch checked={this.state.loc}
              onChange={this.handleChangeLoc()
            } color="primary" />
            }
            label={this.state.loc ? "Oui" : "Non"}
            />
            </Grid>
            {this.state.loc ? <Slider aria-labelledby="continuous-slider" defaultValue="60"
              getAriaValueText={this.valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={100}
              id="localisation"
              name="localisation"
              onChange={(e, val) => this.onChangeLoc(val)}
              /> : null}

          </Grid>



            <Grid container justify = "center">
            <Typography component="h1" variant="h5" className={classes.subtitle} >
              Filtrer par Catégorie
            </Typography>

            </Grid>

            <div className={classes.categories}>
            <Grid container justify = "center" className={classes.categories}>
            <Grid container justify = "center">
            <Grid item xs={6}>
              <Avatar alt="b" src={"/assets/All.png"}  className={classes.largeAvatar}/>
           </Grid>
           <Grid item xs={6}>
             <FormControlLabel
            control={
              <Switch checked={this.state.checkedAll}
              onChange={this.handleChangeAll()
            } color="primary" />
            }
            label="All"
            />
           </Grid>


            </Grid>

            {filterCat}

            </Grid>
            </div>
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
