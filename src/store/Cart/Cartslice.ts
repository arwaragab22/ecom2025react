import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import getproductfullinfo from "./ACTgetproductfullinfo";

// Define a type for the slice state
interface Cartsstate {
  items: { [key:number]:number };
  productfulldtat: Iproducts[];
  error: null | string ;
  loading: "idle" | "pending" | "fulfiled" | "rejected";
  totalprice: number;
}
interface Iproducts {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
  max: number;
  quantity: number;

}
// Define the initial state using that type
const initialState: Cartsstate = {
  items: {},
  productfulldtat: [],
  loading: "idle",
  error: null,
  totalprice: 0
  
};

export const Cartslice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    resetartslice: (state) => {
      state.items = {};
      state.productfulldtat = [];
    },
    incrementproduct: (state, action) => {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    },
    changequantityitem: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      if (state.items[action.payload.id] !== undefined) {
        state.items[action.payload.id] = action.payload.quantity;
      }
    },
    deleteitem: (state, action) => {
      delete state.items[action.payload];
      state.productfulldtat = state.productfulldtat.filter((el) => {
        return el.id != action.payload;
      });
    },
    getfullprice: (state) => {
      state.totalprice = state.productfulldtat.filter((el) => {
        return Object.keys(state.items).includes( String(el.id))
        }).map((el) => {
    return {...el,quantity:state.items[el.id]}
})
        .reduce((acu, cur) => acu + (cur.price*cur.quantity ), 0); // Sum all values
    },
  
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getproductfullinfo.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(getproductfullinfo.fulfilled, (state, action) => {
      state.error = null;
      state.loading = "fulfiled";
      state.productfulldtat = action.payload;
    });

    builder.addCase(getproductfullinfo.rejected, (state, action) => {
      (state.error = action.payload as string), (state.loading = "rejected");
    });
  },
});

export const {
  incrementproduct,
  changequantityitem,
  deleteitem,
  getfullprice,
  resetartslice,
} = Cartslice.actions;


export default Cartslice.reducer;
