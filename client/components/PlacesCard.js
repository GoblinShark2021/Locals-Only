import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "3rem",
  },
  textBox: {
    fontSize: "1.2rem",
    color: "#8766b9",
    fontFamily: "Arial",
    textAlign: "center",
    background: "#fdd87d",
    height: "15rem",
    width: "25rem",
    border: "4px solid",
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
          <p>Price Level: {business.price_level ? business.price_level : 'N/A'}</p>
        </Grid>
      </Container>
    </div>
  );
};

export default PlacesCard;
