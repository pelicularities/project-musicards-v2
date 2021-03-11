import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar({ user = null }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" variant="outlined">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Musicards
          </Typography>

          <Button color="inherit" href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
