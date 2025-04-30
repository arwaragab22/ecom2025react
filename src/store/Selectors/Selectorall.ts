import { createSelector } from "@reduxjs/toolkit";

export const totalquantity = createSelector(
    (state)=>state.Cartslice.items,
    (items) => {

    return Object.values(items).reduce((acc, cur) => {
        return acc + cur;
    }, 0)
});
