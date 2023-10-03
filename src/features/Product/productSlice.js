import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    fetchData: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const getProductsColor = (state) => {
  const colors = state.products.map((product) => product.type);
  return [...new Set(colors)];
};

export const { fetchData } = productSlice.actions;

export default productSlice.reducer;
