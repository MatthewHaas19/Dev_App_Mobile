import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RowPostView from '../Views/RowPostView'


const PostDetailView = (props) => {
  
  
    console.log("coucou")
    //console.log("about",props.location.aboutProps)
    console.log(props.match.params.post)
    return(
      <div>
        <h1>"coucou"</h1>
      { props.match.params.post ? (
       
          <Grid item xs={12}>
          <RowPostView post={props.match.params.post} />
          </Grid>
        
      ): null
    }
  
    </div>
  )
  }



/*
export default function PostDetailView(props) {
  const [open, setOpen] = React.useState(false);
  console.log("coucou")
  console.log(this.props.match.params.post)
  const useStyles = makeStyles(theme => ({
    card: {
      boxShadow: "10px 10px 10px #9E9E9E",
      marginTop: 50
    },
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    
    fields: {
      marginBottom: theme.spacing(5)
    },
    
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
      
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ajouter un commentaire
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un commentaire</DialogTitle>
        <DialogContent>
          
        <FormControlLabel className={classes.fields}
          value="isAnonyme"
          control={<Checkbox color="primary" />}
          label="Poster ce commentaire en Anonyme"
          labelPlacement="end"
          />
          <TextField className={classes.fields} id="filled-basic"
          label="Titre"
          name="titre"
          placeholder="Titre du Commentaire"
          required
          fullWidth
          autoFocus
          />
          <TextField className={classes.fields} id="outlined-multiline-static-label"
          label="Texte"
          name="texte"
          placeholder="Texte de votre commentaire"
          multiline
          required
          fullWidth
          autoFocus
          marginTop
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary">
            Poster le commentaire
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
*/
export default (PostDetailView)
