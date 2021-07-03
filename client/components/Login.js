import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Lock from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Link as Link2 } from "react-router-dom";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        locals only
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#9dddc1",
  },
  image: {
    backgroundImage:
      "url(https://i.ibb.co/DGpBJVt/pexels-ekrulila-7345374.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    background: "#f5856e",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(53, 56, 57)",
    color: "#fcd87c",
    height: 48,
    padding: "0 35px",
  },
}));

export default function Login(props) {
  console.log(props);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

  //this will route after 2 secs to the favorites page
  // setTimeout(() => {
  //   props.history.push('/favorites')
  // }, 2000);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("post called");
    axios
      .post("/api/login", {
        data: {
          email: email,
          password: password,
        },
      })
      .then((res) => {
        if (res.data === "good") {
          setLoggedIn(true);
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (loggedIn) {
    setTimeout(() => {
      props.history.push("/favorites");
    }, 0);
  }

  return (
    <ThemeProvider>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Lock style={{ color: "#f5856e" }} />
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                color="primary"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
              />
              <Link2
                style={{ textDecoration: "none" }}
                to={{ pathname: "/map" }}
              >
                <Button fullWidth className={classes.button} onClick={onSubmit}>
                  login
                </Button>
              </Link2>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="inherit">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link2
                    style={{ textDecoration: "none" }}
                    to={{ pathname: "/signup" }}
                  >
                    <Link variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Link2>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
