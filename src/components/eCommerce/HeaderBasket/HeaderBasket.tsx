import Logo from "@assets/svg/cart.svg?react";

import styles from "./styles.module.css";
import { totalquantity } from "@store/Selectors/Selectorall";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity, animatedbasket } = styles;


const HeaderBasket = () => {
  const itemsquantity = useAppSelector((state) => totalquantity(state));
  const { accessToken } = useAppSelector(
    (state) => state.Authslice
  );
  const [isanimated, setisanimated] = useState(false);
const applyaniamte = isanimated ? animatedbasket : "";
  const navigate = useNavigate();

  useEffect(() => {
    if (itemsquantity) {
  
      setisanimated(true); // Remove animation class
  
      const baskettime = setTimeout(() => {
        setisanimated(false); // Remove animation class
      }, 300);
      return () => {
        clearTimeout(baskettime);
      };
  
}
  },[itemsquantity]);
  return (
    <div
      style={{ display: "flex", gap: "5px", cursor: "pointer" }}
      onClick={() => navigate("shopingcart")}
    >
      <div className={basketContainer}>
        <Logo title="basket icon" />
        {itemsquantity > 0 && accessToken ? (
          <div className={` ${basketQuantity} ${applyaniamte}`}>
            {itemsquantity}
          </div>
        ) : (
          ""
        )}
      </div>
      <h4 style={{ fontWeight: "500" }}>Cart</h4>
    </div>
  );
};

export default HeaderBasket;
