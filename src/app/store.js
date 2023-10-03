import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice";
import cartReducer from "../features/Cart/cartSlice";

export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
