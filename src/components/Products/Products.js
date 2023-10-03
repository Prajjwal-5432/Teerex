/*eslint no-unused-vars: "off"*/

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { Search } from "@mui/icons-material";
import { fetchData } from "../../features/Product/productSlice";
import {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart,
} from "../../features/Cart/cartSlice";
import axios from "axios";
import Header from "../Header/Header";

import "./Products.css";
import LoadingProducts from "../utils/LoadingProducts";
import NoProducts from "../utils/NoProducts";
import ProductCard from "./ProductCard/ProductCard";
import Cart from "../Cart/Cart";
import Filters from "../Filters/Filters";

const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((response) => {
        dispatch(fetchData(response.data));
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchText, setSearchText] = useState("");
  const [tick, setTick] = useState(false);
  const productsInDB = useSelector((state) => state.products.products);
  const performSearch = async (text) => {
    text = text.toLowerCase();
    const searchedProducts = productsInDB.filter((product) => {
      return (
        product.name.toLowerCase().includes(text) ||
        product.color.toLowerCase().includes(text) ||
        product.type.toLowerCase().includes(text)
      );
    });
    setProducts(searchedProducts);
    setTick(!tick);
  };

  const [debounceTimer, setDebounceTimer] = useState(0);

  const debounceSearch = (event, debounceTimeout) => {
    setSearchText(event.target.value);

    if (debounceTimeout !== 0) {
      clearTimeout(debounceTimeout);
    }

    const newDebounceTimer = setTimeout(() => {
      performSearch(event.target.value);
    }, 500);

    setDebounceTimer(newDebounceTimer);
  };

  const cart = useSelector((state) => state.cart.cart);
  const isItemInCart = (id, cart) => {
    return cart.some((product) => product.product.id === id);
  };
  const addItemToCart = (id, qty, options) => {
    if (!options.allowDuplicates && isItemInCart(id, cart)) {
      enqueueSnackbar("Item already in Cart", {
        variant: "warning",
        autoHideDuration: 1500,
      });
      return;
    }

    if (options.allowDuplicates === false) {
      dispatch(addProductToCart({ product: productsInDB[id - 1], qty }));
      enqueueSnackbar("Item added to Cart", {
        variant: "success",
        autoHideDuration: 1500,
      });
    } else {
      if (qty === 0) {
        dispatch(removeProductFromCart({ id }));
      } else {
        dispatch(updateProductQuantityInCart({ qty, id }));
      }
    }
  };

  const [filters, setFilters] = useState({
    color: "All",
    gender: "All",
    type: "All",
    price: "All",
  });

  const updateFilters = (updatedFilters) => {
    setFilters({ ...updatedFilters });
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, tick]);

  const applyFilters = () => {
    let filteredProducts = searchText === "" ? productsInDB : products;
    const filterKeys = Object.keys(filters);
    filterKeys.forEach((key) => {
      if (filters[key] !== "All" && key !== "price") {
        filteredProducts = filteredProducts.filter(
          (product) => product[key] === filters[key]
        );
      }
    });

    if (filters.price !== "All") {
      const range = filters.price
        .substring(1)
        .split("-")
        .map((val) => Number(val));

      filteredProducts = filteredProducts.filter(
        (product) => product.price >= range[0] && product.price <= range[1]
      );
    }

    setProducts(filteredProducts);
  };

  return (
    <>
      <Header>
        <TextField
          className="search search-desktop"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          value={searchText}
          onChange={(e) => debounceSearch(e, debounceTimer)}
        />
      </Header>

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        value={searchText}
        onChange={(e) => debounceSearch(e, debounceTimer)}
      />
      <Filters filters={filters} handleFilters={updateFilters} />
      <Grid container>
        <Grid container item spacing={2} md={9} xs={12} className="grid">
          <Grid
            container
            spacing={2}
            minHeight="100vh"
            justifyContent="center"
            alignItems="center"
          >
            {isLoading ? (
              <LoadingProducts />
            ) : products.length === 0 ? (
              <NoProducts />
            ) : (
              <Grid item container spacing={2} sx={{ margin: "10px" }}>
                {products.map((product) => (
                  <Grid item key={product.id} xs={6} md={4}>
                    <ProductCard
                      product={product}
                      handleAddToCart={addItemToCart}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          style={{ marginTop: "16px" }}
          className="cart-grid"
        >
          <Cart handleQuantity={addItemToCart} />
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
