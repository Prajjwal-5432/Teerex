/*eslint no-unused-vars: "off"*/
import React from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box,
} from "@mui/material";

import "./ProductCard.css";
const ProductCard = ({ product, handleAddToCart }) => {
  const { id, name, imageURL, price } = product;
  return (
    <Card className="card">
      <CardMedia>
        <img src={imageURL} alt={name} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          variant="h6"
          color="textPrimary"
          fontWeight="fontWeightBold"
        >
          ₹{price}
        </Typography>
        <CardActions>
          <Button
            className="card-button"
            variant="contained"
            onClick={() => handleAddToCart(id, 1, { allowDuplicates: false })}
          >
            <AddShoppingCartOutlined />
            ADD TO CART
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
