import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Filters.css";
const getDropdown = ({ type, values }, filters, value, handleFilters) => {
  return (
    <FormControl key={type} fullWidth sx={{ m: 1, maxWidth: 180 }}>
      <InputLabel id={type}>{type}</InputLabel>
      <Select
        labelId={type}
        id={type}
        value={filters[value]}
        label={type}
        onChange={(e) => {
          const updatedFilters = { ...filters, [value]: e.target.value };
          handleFilters(updatedFilters);
        }}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Filters = ({ filters, handleFilters }) => {
  const colors = [
    "All",
    "Black",
    "Blue",
    "Pink",
    "Green",
    "Red",
    "Grey",
    "Purple",
    "White",
    "Yellow",
  ];
  const genders = ["All", "Men", "Women"];
  const types = ["All", "Polo", "Hoodie", "Basic"];
  const priceRange = ["All", "₹0-250", "₹251-450", "₹450-500"];
  const selectors = [
    { type: "Color", values: colors },
    { type: "Gender", values: genders },
    { type: "Type", values: types },
    { type: "Price", values: priceRange },
  ];
  const filterKeys = Object.keys(filters);
  return (
    <Box>
      {selectors.map((selector, ind) =>
        getDropdown(selector, filters, filterKeys[ind], handleFilters)
      )}
    </Box>
  );
};

export default Filters;
