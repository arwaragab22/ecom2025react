import { createSlice } from "@reduxjs/toolkit";
import Actregisterauth from "./Actionregister";
import Actloginauth from "./Actionlogin";
type Authtype = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  error: null | string;
  accessToken: string | null;

  loading: "idle" | "pending" | "fulfiled" | "rejected";
};


const initialState: Authtype = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};


export const Authslice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        resetauth:(state) => {
            state.loading = "idle",
                state.error = null;
      },
      Logoutauth: (state) => {
        state.user = null,
          state.accessToken=null
          
          
      }

      
    },
    extraReducers: (builder) => {
        builder.addCase(Actregisterauth.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        });
        builder.addCase(Actregisterauth.fulfilled, (state, action) => {
            state.error = null;
            state.loading = "fulfiled";
              
        });
        
        builder.addCase(Actregisterauth.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = "rejected";
        });
                builder.addCase(Actloginauth.pending, (state) => {
                  state.error = null;
                  state.loading = "pending";
                });
                builder.addCase(Actloginauth.fulfilled, (state, action) => {
                   state.loading = "fulfiled";
                   state.accessToken = action.payload.accessToken;
                   state.user = action.payload.user;
                });

                builder.addCase(Actloginauth.rejected, (state, action) => {
                  state.error = action.payload as string;
                    state.loading = "rejected";
                    console.log(action);
                });
    }
});


export const { resetauth, Logoutauth } = Authslice.actions;
export default Authslice.reducer;
