import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData  = createAsyncThunk('products/fetchData', async (dispatch, getState) => {
    const response = await axios.get('https://course-api.com/react-store-products');
    console.log(response.data)
    return response.data
})

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
  },
  reducers: {
    openSidebar: (state) => {
      return { ...state, isSidebarOpen: true };
    },
    closeSidebar: (state) => {
      return { ...state, isSidebarOpen: false };
    },
    // get_Products_Begin: () => {
    //   return { ...state, products_loading: true };
    // },
    // get_Products_Success: () => {
    //   return { ...state, products_loading: false };
    // },
  },

  extraReducers: {
    [fetchData.pending]: (state) => {
        return {...state, products_loading: true };
    },
    [fetchData.fulfilled]: (state, {payload}) => {
        const featured = payload.filter((product) => {
            return product.featured === true
        })
        return { ...state, products_loading: false, products: payload,  featured_products: featured};
    },
    [fetchData.rejected]: (state) => {
        return { ...state, products_loading: false, products_error: true };
    },
  },
});

export const {openSidebar, closeSidebar} = productsSlice.actions
export default productsSlice.reducer;
