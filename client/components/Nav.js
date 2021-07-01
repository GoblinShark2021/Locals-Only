import React, { Component } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import MapIcon from "@material-ui/icons/Map";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    // marginRight: "85px",
    // justifyContent: "center",
  },

  logo: {
    maxWidth: 60,
    // textAlign: "center",
  },
  stylebar: {
    background: "#fcd87c",
    minHeight: 20,
    margin: 0,
  },
  button: {
    marginRight: theme.spacing(2),
    color: "#8766b9",
  },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.stylebar}>
        <Toolbar>
          <Link to={{ pathname: "/map" }}>
            <IconButton
              edge="start"
              className={classes.button}
              color="inherit"
              aria-label="menu"
            >
              <MapIcon />
            </IconButton>
          </Link>

          <Link to={{ pathname: "/favorites" }}>
            <IconButton
              edge="start"
              className={classes.button}
              color="inherit"
              aria-label="menu"
            >
              <FavoriteIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            <img
              src={"../client/assests/logo2.png"}
              alt="logo"
              className={classes.logo}
            />
          </Typography>
          <Link style={{ textDecoration: "none" }} to={{ pathname: "/login" }}>
            <Button className={classes.button} color="inherit">
              LOGIN
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
