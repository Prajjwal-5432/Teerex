/*eslint no-unused-vars: "off"*/

import React from "react";
import "./Header.css";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Header = ({ children }) => {
  return (
    <Box className="header">
      <Box className="header-title">
        <Typography variant="h5" gutterBottom>
          TeeRex Store
        </Typography>
      </Box>
      {children}

      <Typography variant="h6" className="header-link" gutterBottom>
        Products
      </Typography>
    </Box>
  );
};

export default Header;
