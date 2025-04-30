import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import ADDwishitem from "./Actwish";
import Actgetwishitems from "./ActGetwishitem";
import { Logoutauth } from "@store/Auth/Authslice";

// Define a type for the slice state
interface WishState {
  items: number[];
  productfullinfo: Iproducts[];
  error:null|string,
}
type Iproducts = {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
  max: number;
  quantity: number;
} & { isliked: boolean };
// Define the initial state using that type
const initialState: WishState = {
  items: [],
  productfullinfo: [],
    error:null

};

export const WishSlice = createSlice({
  name: "Wish",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    Cleanupwishlist: (state) => {
      state.productfullinfo = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ADDwishitem.pending, (state, action) => { 
        
      });
    builder.addCase(ADDwishitem.fulfilled, (state, action) => {
          if (action.payload.type === "delete") {
            state.items = state.items.filter((id) => id !== +action.payload.id);
            state.productfullinfo = state.productfullinfo.filter((item) => {
              return item.id!=+action.payload.id
            })
           } else if (action.payload.type === "add") {
             state.items.push(action.payload.id);
           }
        
          });

    builder.addCase(ADDwishitem.rejected, (state, action) => { });
          builder.addCase(Actgetwishitems.pending, (state, action) => {});
          builder.addCase(Actgetwishitems.fulfilled, (state, action) => {
state.productfullinfo=action.payload
          });

          builder.addCase(Actgetwishitems.rejected, (state, action) => {});

  },
});

export const { Cleanupwishlist } = WishSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.Wish.value;

export default WishSlice.reducer;
