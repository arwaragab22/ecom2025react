import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios, { AxiosError } from "axios";

// First, create the thunk
const Postorders = createAsyncThunk(
  "orders/Postorders",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const userid = (getState() as RootState).Authslice.user?.id;
    const items = (getState() as RootState).Cartslice.items;
    const fulldata = (getState() as RootState).Cartslice.productfulldtat;

    console.log(userid, items, subtotal);
    const fulldataall = fulldata.map((el) => {
      return {
        id: el.id,
        price: el.price,
        title: el.title,
        img: el.img,
        quantity: items[el.id],
      };
    });
    try {
      const response = await axios.post(
        `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/orders`,
        {
          userid: userid,
          subtotal: subtotal,
          items: fulldataall,
        }
      );

      const data = response.data;
      console.log(data);
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
export default Postorders;
