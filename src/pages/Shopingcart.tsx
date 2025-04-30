import Heading from '@components/common/Heading/Heading'
import React from 'react';
import Shopingcartitems from "../components/eCommerce/Shopingcartitems/shopingcartitems"
import Shopingcartcontainer from '@components/eCommerce/Shopingcartcontainer/Shopingcartcontainer';
import { useAppSelector } from '@store/hooks';
import { Button } from 'react-bootstrap';
type Props = {}

function Shopingcart({ }: Props) {
  const {items}=useAppSelector(state=>state.Cartslice)
  return (
    <div>
      {Object.keys(items).length > 0 ? (
        <>
          <Heading>your cart</Heading>{" "}
          <Shopingcartcontainer></Shopingcartcontainer>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#555" }}>
            🛒 Your Cart is Empty!
          </h2>
          <p style={{ fontSize: "16px", color: "#777" }}>
            Looks like you haven’t added anything yet. Start shopping now!
          </p>
          <Button
            variant="primary"
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() => (window.location.href = "/categories")} // Change to your shop page URL
          >
            🛍️ Browse Products
          </Button>
        </div>
      )}
    </div>
  );
}

export default Shopingcart