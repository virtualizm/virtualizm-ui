import React, {useEffect, useReducer, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { authorize, fetchSessions } from '../../Api';
import Loading from "./Loading";


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Auth(props) {
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
        login: '',
        password: ''
    }
  );

  const [isLoading, setIsLoading] = useState(true);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await authorize(inputValues.login, inputValues.password);
        await props.authStatus.setIsAuthenticated(true);
        props.history.push('/virtual_machines')
    } catch (e) {
        // handle error here
    }
};

const onLoad = async () => {
  try {
    await fetchSessions();
    props.authStatus.setIsAuthenticated(true);
    setIsLoading(false);
    props.history.push('/virtual_machines')
  } catch (e) {
    setIsLoading(false);
    console.error('error', e);
  }
};

  const classes = useStyles();

  useEffect(() => {
    onLoad();
  });

  return (
    isLoading ?
      <Loading />
    :
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="login"
              autoComplete="email"
              autoFocus
              onChange={handleOnChange}
              value={inputValues.login}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleOnChange}
              value={inputValues.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(Auth)
