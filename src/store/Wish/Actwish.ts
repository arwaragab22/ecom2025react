import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

// First, create the thunk
const ADDwishitem = createAsyncThunk(
  "Wish/ADDwishitem",
  async (itemid, thunkAPI) => {
    const { rejectWithValue, getState, dispatch, fulfillWithValue } = thunkAPI;
    const globalstte = thunkAPI.getState() as RootState;
    const userid = globalstte.Authslice.user?.id;
    console.log(userid);
    const response = await axios.get(
      `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/wishlist?userid=${userid}&itemsid=${itemid}`
    );

    if (response.data.length > 0) {
      const wishlistItem = response.data[0];
      await axios.delete(
        `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/wishlist/${wishlistItem.id}`
      );
      return { type: "delete", id: itemid };
    } else {
      await axios.post(
        "https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/wishlist",
        {
          userid: userid,
          itemsid: itemid,
        }
      );
      return { type: "add", id: itemid };
    }
  }
);
export default ADDwishitem;
