import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import useDarkMode from "./DarkModeContext";

const Header = () => {
  // @ts-ignore
  const [, toggleDarkMode] = useDarkMode();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          <Typography variant="h6">Where in the world?</Typography>
          <Button color="inherit" onClick={toggleDarkMode}>Dark Mode</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
