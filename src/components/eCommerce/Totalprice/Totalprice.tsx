import React, { useEffect } from 'react'
import styles from "./style.module.css"
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getfullprice } from '@store/Cart/Cartslice'

const { texttotal ,textprice}=styles
function Totalprice() {
    const dispatch = useAppDispatch();
  
  const { items } = useAppSelector((state) => state.Cartslice);
  const totalprice = useAppSelector((state) => state.Cartslice.totalprice);
  useEffect(() => {
    if (Object.keys(items).length > 0) {

  
      dispatch(getfullprice());

console.log(totalprice)
    }
  }, [dispatch,items]); // ✅ Runs only when `items` is not empty
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "cenetr",
      }}
    >
      <h4 className={texttotal}>sub total:</h4>
      <span className={textprice}>{totalprice}</span>
    </div>
  );
}

export default Totalprice

