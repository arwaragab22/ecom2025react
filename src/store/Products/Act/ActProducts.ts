import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// First, create the thunk
const Getallproducts = createAsyncThunk(
  "products/fetchproducts",
  async (prefixes?: string, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    // Build the API URL dynamically
    const url = prefixes
      ? `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/products?cat_prefix=${prefixes}`
      : `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/products`;
    try {
      const response = await axios.get(url);

      const data = response.data;
      return data;
    } catch (err) {
      const error = err as AxiosError;

      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(
        error.response?.data || "An unexpected error occurred"
      );
    }
  }
);
export default Getallproducts;
