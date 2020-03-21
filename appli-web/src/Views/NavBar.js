import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { green, blue, purple } from '@material-ui/core/colors';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Noteworthy from '../fonts/Noteworthy-Lt.woff';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../App.css';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import history from '../history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const noteWorthy = {
  fontFamily: 'Noteworthy Light',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Noteworthy Light'), url('../fonts/Noteworthy-Lt.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'noteWorthy',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [noteWorthy],
      },
    },
  },
});



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
    color: blue[400],
  },
  title: {
    flexGrow: 1,
    color: "black",
    marginLeft: 10,
    fontFamily: 'Noteworthy Light'
  },
  image: {
    height: 50,
    width:50
  },
}));

const image =
  {
    url: '/assets/H2R.png',
    title: 'Breakfast',
    width: '100%',
  }



export default function NavBar({changeValue}) {
  const classes = useStyles();

  function handleClick(newValue){
    history.push('/');
    if(newValue=="filter"){
      changeValue(0)
    }else{
      changeValue(1)
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#ffffff" }}>
        <Toolbar>
          <Link to="/filter">
          <Button>
            <Avatar variant="square" src="/assets/H2R.png"  />
          </Button>
          </Link>
          <ThemeProvider theme={theme}>
    <CssBaseline />
          <div className={classes.title}>
          <Link to="/filter" style={{textDecoration: 'none',color:'black'}}>
          <h1>How to react</h1>
          </Link>
          </div>
          </ThemeProvider>
          <IconButton aria-label="search" color="inherit" className={classes.menuButton} onClick={() => handleClick("filter")}>
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="profil" color="inherit" className={classes.menuButton} onClick={() => handleClick("profile")}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
