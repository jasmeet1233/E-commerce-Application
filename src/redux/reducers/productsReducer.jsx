import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GiSattelite } from "react-icons/gi";

export const fetchData = createAsyncThunk(
  "products/fetchData",
  async (dispatch, getState) => {
    const response = await axios.get(
      "https://course-api.com/react-store-products"
    );
    return response.data;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
   async (url) => {
    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
  },
  reducers: {
    openSidebar: (state) => {
      return { ...state, isSidebarOpen: true };
    },
    closeSidebar: (state) => {
      return { ...state, isSidebarOpen: false };
    },
  },

  extraReducers: {
    [fetchData.pending]: (state) => {
      return { ...state, products_loading: true };
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      const featured = payload.filter((product) => {
        return product.featured === true;
      });
      return {
        ...state,
        products_loading: false,
        products: payload,
        featured_products: featured,
      };
    },
    [fetchData.rejected]: (state) => {
      return {
        ...state,
        single_product_loading: false,
        single_product_error: false,
      };
    },
    /////////////
    [fetchSingleProduct.pending]: (state) => {
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
    },
    [fetchSingleProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        single_product_loading: false,
        single_product_error: false,
        single_product: payload
      };
    },
    [fetchSingleProduct.rejected]: (state) => {
      return {
        ...state,
        single_product_error: true,
        single_product_loading: false,
      };
    },
  },
});

export const { openSidebar, closeSidebar } = productsSlice.actions;
export default productsSlice.reducer;
