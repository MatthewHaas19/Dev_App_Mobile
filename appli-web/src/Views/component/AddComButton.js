import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = theme => ({
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
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    fields: {
      marginBottom: theme.spacing(5)
    },
  
    categoriesItem: {
      marginBottom: theme.spacing(2)
    },
  
    backButton:{
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3)
    },
  
  });
  


export default function AddComButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {classes} = this.props
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ajouter un commentaire
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un commentaire</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez saisir les informations pour ajouter votre commentaire
          </DialogContentText>
          <FormControlLabel className={classes.fields}
          value="isAnonyme"
          name= "isAnonyme"
          checked= {this.state.isAnonyme}
          control={<Checkbox color="primary" />}
          label="Poster ce post en Anonyme"
          labelPlacement="end"
          onChange={this.onChange}
          />
          <TextField className={classes.fields} id="filled-basic"
          label="Titre"
          name="titre"
          placeholder="Titre du Post"
          required
          fullWidth
          autoFocus
          onChange={this.onChange}
          />
          <TextField className={classes.fields} id="outlined-multiline-static-label"
          label="Description"
          name="texte"
          placeholder="Décrivez ce qui vous est arrivé"
          multiline
          required
          fullWidth
          autoFocus
          marginTop
          onChange={this.onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
