import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeProductFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.product.id !== action.payload.id
      );
    },
    updateProductQuantityInCart: (state, action) => {
      const index = state.cart.findIndex(
        (product) => product.product.id === action.payload.id
      );
      state.cart[index].qty = action.payload.qty;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart,
} = cartSlice.actions;

export default cartSlice.reducer;
