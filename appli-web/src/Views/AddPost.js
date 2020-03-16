import React, {Component} from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { green, blue, purple } from '@material-ui/core/colors';


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

}));

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: blue[400],
    '&:hover': {
      backgroundColor: blue[600],
    },
  },
}))(Button);


export default function AddPost() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" maxHeight="xs">
    <Card className={classes.card}>
      <CardContent>
      <CssBaseline />
      <div className={classes.backButton}><Button variant="outlined"> Back </Button></div>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ajoutez un post
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <FormControlLabel className={classes.fields}
          value="isAnonyme"
          control={<Checkbox color="primary" />}
          label="Poster ce post en Anonyme"
          labelPlacement="end"
          />
          <TextField className={classes.fields} id="filled-basic"
          label="Titre"
          name="titre"
          placeholder="Titre du Post"
          required
          fullWidth
          autoFocus
          />
          <TextField className={classes.fields} id="outlined-multiline-static-label"
          label="Description"
          name="description"
          placeholder="Décrivez ce qui vous est arrivé"
          multiline
          required
          fullWidth
          autoFocus
          marginTop
          />



{/* --------------Categories ---------------------------------------------------------- */}


<Typography component="h3" variant="bold" align="center" fontFamily="bold">
  Séléctionnez les catégories :
</Typography>
          <Grid className={classes.categoriesItem} container spacing={0}>
            <Grid item xs={6}>
              <FormControlLabel
              value="Amis"
              control={<Checkbox color="primary" />}
              label="Entre amis"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Couple"
              control={<Checkbox color="primary" />}
              label="Dans mon couple"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Ecole"
              control={<Checkbox color="primary" />}
              label="A l'école"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Famille"
              control={<Checkbox color="primary" />}
              label="En famille"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Rue"
              control={<Checkbox color="primary" />}
              label="Dans la rue"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Soiree"
              control={<Checkbox color="primary" />}
              label="En soirée"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Sport"
              control={<Checkbox color="primary" />}
              label="Au sport"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Transport"
              control={<Checkbox color="primary" />}
              label="Dans les transports"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Travail"
              control={<Checkbox color="primary" />}
              label="Au travail"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="TV"
              control={<Checkbox color="primary" />}
              label="A la télé"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Voisin"
              control={<Checkbox color="primary" />}
              label="Mes voisins"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Web"
              control={<Checkbox color="primary" />}
              label="Sur le web"
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <FormControlLabel
              value="Autre"
              control={<Checkbox color="primary" />}
              label="Autres..."
              labelPlacement="end"
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>

          <ColorButton variant="contained" color="primary" className={classes.margin} type="submit"
            fullWidth>
            Créer le post
          </ColorButton>

        </form>
      </div>
      </CardContent>
    </Card>
    </Container>
  );
}
