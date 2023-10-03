import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const LoadingProducts = () => {
  return (
    <Grid item>
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgress size={40} thickness={4} color="primary" />
        <Typography variant="p" component="p" fontWeight="fontWeightBold">
          Loading Products
        </Typography>
      </Box>
    </Grid>
  );
};

export default LoadingProducts;
