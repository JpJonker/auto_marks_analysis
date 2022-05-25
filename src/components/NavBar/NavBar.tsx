import { useState } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ padding: "0 5rem", marginBottom: "7.5rem" }}>
      <AppBar position='fixed'>
        <Typography variant='h3' component='div'>
          Home
        </Typography>
      </AppBar>
    </Box>
  );
};

export default NavBar;
