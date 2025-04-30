import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { RootState } from "@store/index";
import { getfullprice } from "./Cartslice";
// First, create the thunk
const getproductfullinfo = createAsyncThunk(
  "cart/fetchproductfullinfo",
  async (__, thunkAPI) => {
    const { rejectWithValue, getState, dispatch, fulfillWithValue } = thunkAPI;

    const selecteditem = thunkAPI.getState() as RootState;
    const itemfiltered = selecteditem.Cartslice.items;
    const conkeyitems = Object.keys(itemfiltered);
    const finalquery = conkeyitems.map((el) => {
      return `id=${el}`;
    });
    if (finalquery.length) {
      try {
        const response = await axios.get(
          `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/products?${finalquery.join(
            "&"
          )}`
        );

        const data = response.data;

        return data;
      } catch (err) {
        const error = err as AxiosError;

        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(
          error.response?.data || "An unexpected error occurred"
        );
      }
    } else {
      return fulfillWithValue([]);
    }
  }
);
export default getproductfullinfo;
