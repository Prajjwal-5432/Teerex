import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SentimentDissatisfied } from "@mui/icons-material";

const NoProducts = () => {
  return (
    <Grid item>
      <Box display="flex" flexDirection="column" alignItems="center">
        <SentimentDissatisfied />
        <Typography variant="body1" component="p" fontWeight="fontWeightBold">
          No Products Found
        </Typography>
      </Box>
    </Grid>
  );
};

export default NoProducts;
