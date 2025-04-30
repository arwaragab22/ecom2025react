import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

// First, create the thunk
const Getallcateogry = createAsyncThunk(
  "cateogries/fetchcateogry",
  async (__, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    try {
      const response = await axios.get(
        "https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/categories"
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
export default Getallcateogry;
