import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    background: "#9dddc1",
  },
  button: {
    display: "inline",
    color: "#8766b9",
    marginTop: theme.spacing(1.5),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  span: {
    display: "inline",
  },
}));

const Selection = ({
  business,
  setBusiness,
  distance,
  setDistance,
  toggleBusiness,
  setToggleBusiness,
  toggleDistance,
  setToggleDistance,
}) => {
  const classes = useStyles();

  return (
    <div id="selection">
      <Container component="section" maxWidth="xs" className={classes.root}>
        <div>
          <Button
            className={classes.button}
            onClick={() => setToggleBusiness(true)}
          >
            Select Business
          </Button>

          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-controlled-open-select-label">Business</InputLabel> */}
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={toggleBusiness}
              onClose={() => setToggleBusiness(false)}
              onOpen={() => setToggleBusiness(true)}
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            >
              <MenuItem value="">
                <em>locals only.</em>
              </MenuItem>
              <MenuItem value={"restaurant"}>Restaurant</MenuItem>
              <MenuItem value={"bar"}>Bar</MenuItem>
              <MenuItem value={"cafe"}>Cafe</MenuItem>
              <MenuItem value={"bakery"}>Bakery</MenuItem>
              <MenuItem value={"supermarket"}>Market</MenuItem>
              <MenuItem value={"liquor_store"}>Liquor Store</MenuItem>
              <MenuItem value={"bicycle_store"}>Bike Store</MenuItem>
              <MenuItem value={"book_store"}>Book Store</MenuItem>
              <MenuItem value={"florist"}>Florist</MenuItem>
              <MenuItem value={"clothing_store"}>Clothing Store</MenuItem>
              <MenuItem value={"laundry"}>Laundry</MenuItem>
              <MenuItem value={"plumber"}>Plumber</MenuItem>
              <MenuItem value={"electrician"}>Electrician</MenuItem>
              <MenuItem value={"locksmith"}>Locksmith</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <Button
            className={classes.button}
            onClick={() => setToggleDistance(true)}
          >
            Select Distance
          </Button>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={toggleDistance}
              onClose={() => setToggleDistance(false)}
              onOpen={() => setToggleDistance(true)}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            >
              <MenuItem value="">
                <em>Distance</em>
              </MenuItem>
              <MenuItem value={"402"}>0.25 Mile</MenuItem>
              <MenuItem value={"804"}>0.5 Mile</MenuItem>
              <MenuItem value={"1609"}>1 Mile</MenuItem>
              <MenuItem value={"3218"}>2 Miles</MenuItem>
              <MenuItem value={"8046"}>5 Miles</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Container>
    </div>
  );
};

export default Selection;
