/*eslint no-unused-vars: "off"*/
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import "./Cart.css";
import { useHistory } from "react-router-dom";
import { removeProductFromCart } from "../../features/Cart/cartSlice";

const getTotalCartValue = (cart) => {
  return cart.reduce((acc, cur) => {
    return acc + cur.product.price * cur.qty;
  }, 0);
};

const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => {
  return (
    <Stack direction="row" alignItems="center">
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
      )}
      <Box padding="0.5rem" data-testid="item-qty">
        {isReadOnly ? "Qty: " : ""}
        {value}
      </Box>
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      )}
    </Stack>
  );
};

const Cart = ({ handleQuantity, isReadOnly }) => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  // console.log(cart);
  if (!cart.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Box className="cart">
        {cart.map((product) => {
          const qty = product.qty;
          const { name, id, imageURL, price } = product.product;
          return (
            <Box display="flex" alignItems="flex-start" padding="1rem" key={id}>
              <Box className="image-container">
                <img src={imageURL} alt={name} width="100%" height="100%" />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    value={qty}
                    handleAdd={() =>
                      handleQuantity(id, qty + 1, { allowDuplicates: true })
                    }
                    handleDelete={() =>
                      handleQuantity(id, qty - 1, { allowDuplicates: true })
                    }
                    isReadOnly={isReadOnly}
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ₹{price}
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  color="info"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatch(removeProductFromCart({ id }))}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          );
        })}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ₹{getTotalCartValue(cart)}
          </Box>
        </Box>

        {!isReadOnly && (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => history.push("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Cart;
