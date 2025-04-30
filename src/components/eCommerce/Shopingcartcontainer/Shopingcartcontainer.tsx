import getproductfullinfo from '@store/Cart/ACTgetproductfullinfo';
import { useAppDispatch, useAppSelector } from '@store/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Shopingcartitems from '../Shopingcartitems/shopingcartitems';
import { changequantityitem, getfullprice } from '@store/Cart/Cartslice';
import Totalprice from '../Totalprice/Totalprice';
import { Button } from 'react-bootstrap';
import Ordermodal from '../Orderplacing/Orderplacingmodal';

type Props = {}

function Shopingcartcontainer({ }: Props) {
  const items = useAppSelector((state) => state.Cartslice.productfulldtat);
  const items1 = useAppSelector((state) => state.Cartslice.items);
  const [stateordermodal, setordermodal] = useState(false);
  useEffect(() => {
    console.log("rendershopcart");
  }, [stateordermodal]);
  const quantityitem = useAppSelector((state) => state.Cartslice.items);
  const Handleclose = () => {
    setordermodal(false);
  };
  const dispatch = useAppDispatch();
  const changequantity = useCallback(
    (id1: number, q: number) => {
      dispatch(changequantityitem({ id: id1, quantity: q }));
    },
    [dispatch, items]
  );
  useEffect(() => {
    dispatch(getproductfullinfo());
  }, [dispatch]); // Fetch data when items change// Trigger total price calculation after fetching products
  useEffect(() => {
    if (items.length > 0) {
      dispatch(getfullprice());
    }
  }, [dispatch, items]); // ✅ Runs when `items` change after fetching

  const handleordermodal = () => {
    setordermodal(true);
  };

  return (
    <>
      {items.map((item) => {
        return (
          <>
            {" "}
            <Shopingcartitems
              item={item}
              quantity={quantityitem[item.id]}
              key={item.id}
              changequantity={changequantity}
            ></Shopingcartitems>
          </>
        );
      })}
      <Totalprice></Totalprice>
      <Button
        variant="success"
        style={{ float: "right", margin: "10px 0px" }}
        onClick={() => handleordermodal()}
      >
        place orders
      </Button>
      {stateordermodal && (
        <Ordermodal
          Handleclose={Handleclose}
          showstate={stateordermodal}
        ></Ordermodal>
      )}
    </>
  );
}

export default Shopingcartcontainer