import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DetailsIcon from "@material-ui/icons/Details";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 2),
  },
  card: {
    height: "95%",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "4px solid",
    // borderRadius: "3px",
    color: "#8766b9",
    // borderStyle: "3px solid",
    // textAlign: "center",
    backgroundColor: "#fdd87d",
    marginTop: "0px",
  },
  icon: {
    padding: theme.spacing(2, 0),
  },
  title: {
    padding: theme.spacing(2),
  },
  featureList: {
    padding: theme.spacing(2),
  },
  button: {
    background: "linear-gradient(45deg, #000000 30%, #353839 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(53, 56, 57)",
    color: "white",
    height: 48,
    padding: "0 35px",
  },
}));

const Favorites = () => {
  const classes = useStyles();

  return (
    <Container component="section" maxWidth="lg" className={classes.root}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Macho's Tacos</h2>
            <h4>Address: 1732 Ridgewood Rd., Queens, NY</h4>
            <h4>Description: The BEST tacos ever!</h4>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Dave's Electronics</h2>
            <h4>Address: 659 Quinten Ave, Commack, NY</h4>
            <h4>Description: Cell phone repair spot</h4>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Cassie's Craft Store</h2>
            <h4>Adress: 62 Beluga St., Huntington, NY</h4>
            <h4>Description: Here for the fabrics.</h4>
          </div>
        </Grid>
      </Grid>
      <br />

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Wild Wednesdays</h2>
            <h4>Address: 7895 Myrtle Ave, Queens, NY</h4>
            <h4>Description: Favorite happy hour spot</h4>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Petey's Pizza</h2>
            <h4>Address: 222 Horton View Rd, Islip, NY</h4>
            <h4>Description: Best pizza in Suffolk County</h4>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Woodworld</h2>
            <h4>Adress: 978 Cedar Ln, Deer Park, NY</h4>
            <h4>Description: Home improvement store</h4>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <div className={classes.card}>
            <h2>Codesmith Tiki Bar</h2>
            <h4>Address: 112 Will Sentence Road, LA, CA</h4>
            <h4>Description: turn up spot!</h4>
          </div>
        </Grid>
      </Grid>

      <br />
    </Container>
  );
};

export default Favorites;
