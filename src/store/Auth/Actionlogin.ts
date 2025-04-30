import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

type formdata = {
  Email: string;
  Password: string;
};
// First, create the thunk
const Actloginauth = createAsyncThunk(
  "cart/Actloginauth",
  async (dataform: formdata, thunkAPI) => {
    console.log("authslcieact");
    const { rejectWithValue, getState, dispatch, fulfillWithValue } = thunkAPI;
    try {
      console.log(dataform);
      const response = await axios.post(
        "https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/login",
        {
          email: dataform.Email,
          password: dataform.Password,
        }
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
  }
);
export default Actloginauth;
