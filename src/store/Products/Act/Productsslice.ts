import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import Getallproducts from "./ActProducts";

// Define a type for the slice state
interface Iproducts {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
}
interface Iproductstate {
  records: Iproducts[];
  loading: "idle" | "pending" | "fulfiled" | "rejected";
  error: null | string;
}
// Define the initial state using that type
const initialState: Iproductstate = {
  records: [],
  loading: "idle",
  error: null,
};

export const Productsslice = createSlice({
    name: "products",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(Getallproducts.pending, (state) => {
          state.error = null;
          state.loading = "pending";
          state.records = [];
        });
        builder.addCase(Getallproducts.fulfilled, (state, action) => {
          state.error = null;
          state.loading = "fulfiled";
          if (action.payload as string) {
            state.records = action.payload;
          }
        });
    

        builder.addCase(Getallproducts.rejected, (state, action) => {
          (state.error = action.payload as string),
            (state.loading = "rejected");
        });
    },
});


// Other code such as selectors can use the imported `RootState` type

export default Productsslice.reducer;
