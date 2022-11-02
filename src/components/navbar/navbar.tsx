import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Face2Icon from '@mui/icons-material/Face2';

import "./styles.css";

const NavBar: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          color: "#000",
          borderBottomColor: "#d3d6da47",
          height: "66px",
          borderBottomStyle: "groove",
          borderBottomWidth: "1px",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <div className="menu-icon">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ fontSize: "35px" }} />
          </IconButton>
          </div>
          <div className="title">
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Georgia",
              fontWeight: "bolder",
              fontSize: "36px",
            }}
          >
            !Wordle
          </Typography>
          </div>
          <div className="login">
          <Face2Icon />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
