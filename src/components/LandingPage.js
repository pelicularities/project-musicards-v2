// REACT AND FRIENDS
import React from "react";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

// THEMING
import theme from "../styles/theme";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  heroBackground: {
    backgroundImage: "url('https://source.unsplash.com/rPOmLGwai2w/2400x1600')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "50vh",
    borderRadius: theme.spacing(0.5),
  },
  heroBanner: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "rgb(255, 255, 255)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.spacing(0.5),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

function LandingPage() {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item key="mainLanding" xs={12}>
        <div className={classes.heroBackground}>
          <div className={classes.heroBanner}>
            <div>
              <h1>Teach and learn music theory, faster.</h1>
              <div>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  disableElevation
                >
                  Learn more
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item key="teachersLanding" xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <h3>For Teachers</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </CardContent>
          <CardContent>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
            >
              Get started
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item key="studentsLanding" xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <h3>For Students</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </CardContent>
          <CardContent>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
            >
              Get started
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
