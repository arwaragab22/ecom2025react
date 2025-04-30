import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import Getallcateogry from "./Actgetcateogry";

// Define a type for the slice state
interface Icateogry {
    id: number,
    title: string,
    img: string,
    prefix: string,
}
interface Icateogrystate {
    records: Icateogry[],
    loading: "idle" | "pending" | "fulfiled" | "rejected", error: null | string;
}
// Define the initial state using that type
const initialState: Icateogrystate = {
    records: [],
    loading: "idle", error: null
};

export const Cateogryslice = createSlice({
    name: "Cateogry",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(Getallcateogry.pending, (state,) => {
            
            (state.error = null);
            (state.loading = "pending");
                (state.records = [])
        });
        builder.addCase(Getallcateogry.fulfilled, (state, action) => {
            state.error = null;
            state.loading = "fulfiled";
            if (action.payload as string) {
                state.records = action.payload;
            }
            
        
    });
    

        builder.addCase(Getallcateogry.rejected, (state, action) => {
          (state.error = action.payload as string),
            (state.loading = "rejected")
        });
    },
});


// Other code such as selectors can use the imported `RootState` type

export default Cateogryslice.reducer;
