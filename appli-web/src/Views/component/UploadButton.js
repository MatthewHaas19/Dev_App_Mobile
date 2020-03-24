import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import {storage} from '../../firebase'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {

    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  button: {
    margin:10,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  input: {
    display: 'none',
  },
  images:{
    margin: "15px"
  },
  text:{
    margin:"10px"
  }
}));

export default function UploadButton({changeValue}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [url, setUrl] = React.useState('');
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      if(image && !success){
        setSuccess(false);
        setLoading(true);

        const uploadTask = storage.ref(`imagesFolder/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
          // progress function
        }, (error) => {
          console.log()
        }, () => {
          storage.ref('imagesFolder').child(image.name).getDownloadURL().then(url => {
            console.log(url)
            setSuccess(true);
            setLoading(false);
            changeValue(url)

          })
        })
      }

    }
  };

  const handleChange = (e) => {
    if(e.target.files[0]){
      const image = e.target.files[0]
      setImage(image);
      setFile(URL.createObjectURL(image));
      console.log(image)


    }
  };

  return (
    <div>
    <div className={classes.root}>

        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" style={{backgroundColor: success ? green[400] :  blue[500] ,color:"white"}} component="span">
            Choisir un fichier
          </Button>
        </label>


    </div>
    <div className={classes.images}>
      {image ?
        <div className={classes.text}>
          {image.name}
          <img src={file} style={{width:"35px"}}/>
        </div>
         : null}
    </div>
    {image ?
    <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" style={{backgroundColor: success ? green[400] :  blue[500] ,color:"white"}} component="span">
            Upload ?
          </Button>
        </label>

        <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          style={{backgroundColor: success ? green[400] :  blue[500] ,color:"white"}}
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>


        {loading && <CircularProgress size={68} className={classes.fabProgress} />}

      </div>

    </div>
        : null }
    </div>
  );
}
