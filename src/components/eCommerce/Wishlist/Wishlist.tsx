import React from 'react';
import Wishlisticon from "@assets/svg/wishlisticon.svg?react";
interface Props {
    
}
import styles from "./style.module.css"
import { useAppSelector } from '@store/hooks';
import { useNavigate } from 'react-router-dom';
const { wishContainer, wishQuantity, animatedwish } = styles;

const Wishlist = (props: Props) => {
  const quantitywish = useAppSelector(state => state.Wishlist.items);
  const { accessToken } = useAppSelector((state) => state.Authslice);

  const navigate = useNavigate();
    return (
      <div>
        <div className={wishContainer} onClick={() => navigate("wish")}>
          <Wishlisticon title="wish icon" />
          {quantitywish.length > 0 && accessToken ? (
            <div className={` ${wishQuantity} `}>{quantitywish.length}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
}

export default Wishlist
