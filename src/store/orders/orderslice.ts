import { createSlice } from "@reduxjs/toolkit";
import Postorders from "./Actorder";
import Getporders from "./Getorderact";
type order = {
  id: number;
  userid: number;
  subtotal: number;
    items: Iproducts[];
};
interface Iproducts {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
}
// Define a type for the slice state
interface Orderstate {
  orderslist: order[];
  error: null | string;
  loading: "idle" | "pending" | "fulfiled" | "rejected";
}

// Define the initial state using that type
const initialState: Orderstate = {
      orderslist: [],
  error: null ,
  loading: "idle"
 
};

export const Orderslice = createSlice({
  name: "orders",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    },
      extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(Postorders.pending, (state) => {
          state.error = null;
          state.loading = "pending";
          state.orderslist = [];
        });
        builder.addCase(Postorders.fulfilled, (state, action) => {
          state.error = null;
          state.loading = "fulfiled";

        });

        builder.addCase(Postorders.rejected, (state, action) => {
          (state.error = action.payload as string),
            (state.loading = "rejected");
        });

        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(Getporders.pending, (state) => {
          state.error = null;
          state.loading = "pending";
          state.orderslist = [];
        });
        builder.addCase(Getporders.fulfilled, (state, action) => {
          state.error = null;
          state.loading = "fulfiled";

          state.orderslist = action.payload;
        });

        builder.addCase(Getporders.rejected, (state, action) => {
          (state.error = action.payload as string),
            (state.loading = "rejected");
        });
      },
});



export default Orderslice.reducer;
