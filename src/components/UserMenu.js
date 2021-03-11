// REACT AND FRIENDS
import React, { useState } from "react";
import { Link } from "react-router-dom";

// MATERIAL UI
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function UserMenu({ user = null }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {user}
      <IconButton
        aria-label={`${user}'s account`}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/logout" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
