import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { lineHeight } from "@material-ui/system";
import Typed from "typed.js";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    // marginTop: "1rem",
    // marginBottom: "3rem",

    // width: "95%",
  },
  typedJS: {
    fontSize: "1.2rem",
    // height: "9rem",
    // margin: "0 auto",
    // justifyContent: "center",
    // opacity: "0.5",
    color: "#8766b9",
    fontFamily: "Arial",
    textAlign: "left",
    background: "#fdd87d",

    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "4px solid",
  },
  titleH1: {
    textAlign: "center",
  },
  button: {
    background: "#8766b9",
    border: 0,
    borderRadius: 8,
    boxShadow: "0 3px 5px 2px rgba(53, 56, 57)",
    color: "white",
    height: 48,
    padding: "0 35px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "I'm looking for local businesses.",
        "I'm looking for ^500 a florist.",
        "I'm looking for ^500 an electrician.",
        "I'm looking for ^500 a deli.",
        "I'm looking for ^500 a craft store.",
        "I'm looking for ^500 a plumber.",
        "I'm looking for ^500 a bar.",
        "I'm looking for ^500 a restaurant.",
        "I'm looking for ^500 a hardware store.",
        "I'm looking for ^500 a food market.",
        "I'm looking for local businesses.",
      ],
      smartBackspace: true,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 500,
      showCursor: false,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    };
  }, []);

  return (
    <div className={classes.root} id="homePage">
      <Container component="section" maxWidth="xl" className={classes.root}>
        <Grid container spacing={3}>
          <br />
          <Grid item xs={12}>
            {/* <h1 className={classes.titleH1}>locals only.</h1> */}
            <img
              className={classes.titleH1}
              src={"https://i.imgur.com/Uy8F66Z.png"}
              alt="header"
            />
          </Grid>
          <br />

          <Grid item xs={6} className={classes.typedJS}>
            <h4>
              A platform for locals to discover their new favorite business
              without having to lean on big chain stores or wondering if they
              even exist.
            </h4>
            <h5>How would you like to support your neighbors today?</h5>
            <h4 ref={el}></h4>
            <RoomIcon />
            <Link style={{ textDecoration: "none" }} to={{ pathname: "/map" }}>
              <Button className={classes.button}>Get Started</Button>
            </Link>
          </Grid>

          <Grid item xs={6} className={classes.typedJS}>
            <img
              style={{ width: "335px" }}
              src={"https://i.imgur.com/E05X9e9.png"}
              alt="logo"
              // className={classes.logo}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
