import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

// First, create the thunk
const Actgetwishitems = createAsyncThunk(
  "Wish/Actgetwishitems",
  async (_, thunkAPI) => {
    const wish = thunkAPI.getState() as RootState;
    const items = wish.Wishlist.items;
    const filteritem = items.map((el) => {
      return `id=${el}`;
    });
    if (filteritem.length > 0) {
      const response = await axios.get(
        `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/products?${filteritem.join(
          "&"
        )}`
      );
      return response.data;
    } else {
      return [];
    }
  }
);
export default Actgetwishitems;
