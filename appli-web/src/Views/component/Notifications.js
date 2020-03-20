import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Container from '@material-ui/core/Container';

const messages = [
  {
    id: 1,
    primary: 'Justine a repondu à votre post',
    secondary: "Coucou moi j'aurais fait ça",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Test a repondu à votre post',
    secondary: "J'ai répondu ça la dernière fois",
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Moi a repondu à votre post',
    secondary: "Oh c'est horible",
    person: '/static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Justine a repondu à votre post',
    secondary: "Coucou moi j'aurais fait ça",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 5,
    primary: 'Test a repondu à votre post',
    secondary: "J'ai répondu ça la dernière fois",
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 6,
    primary: 'Moi a repondu à votre post',
    secondary: "Oh c'est horible",
    person: '/static/images/avatar/2.jpg',
  }
];

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    marginTop: theme.spacing(7),
  },
  list: {

  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function Notifications() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs" maxHeight="xs">
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Notifications
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Aujourd'hui</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Hier</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      </Container>
    </React.Fragment>
  );
}
