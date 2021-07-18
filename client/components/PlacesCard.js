import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

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
    height: "16rem",
    width: "25rem",
    border: "4px solid",
  },
  button: {
    color: "#f5856e",
    marginTop: "-2rem",
  },
}));

const PlacesCard = ({ business, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Grid item xs={12} className={classes.textBox}>
          <h1>{business.store_name}</h1>
          <p>Address: {business.exact_address}</p>
          <p>Rating: {business.rating}</p>
          <p>Price Level: {business.price_level ? business.price_level : 'N/A'}</p>

          <IconButton edge="start"  className={classes.button} onClick={() => onDelete(business.place_id)}>
            <DeleteForeverIcon/>
          </IconButton>
        </Grid>
      </Container>
    </div>
  );
};

export default PlacesCard;
