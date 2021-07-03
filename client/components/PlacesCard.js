import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "3rem",
    flexWrap: "wrap",
  },
  textBox: {
    fontSize: "1.2rem",
    color: "#8766b9",
    fontFamily: "Arial",
    textAlign: "left",
    background: "#fdd87d",

    height: "95%",
    width: "95%",
    // display: "flex",
    //flexWrap: "wrap",
    // flexDirection: "column",
    // alignItems: "center",
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

const PlacesCard = ({ business }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Grid item xs={12} className={classes.textBox}>
          <h1>{business.store_name}</h1>
          <p>Address: {business.exact_address}</p>
          <p>Rating: {business.rating}</p>
          <p>Price Level: {business.price_level}</p>
        </Grid>
      </Container>
    </div>
  );
};

export default PlacesCard;
