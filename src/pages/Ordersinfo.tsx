import Modaldetailsorder from '@components/common/Modaldetailsorder/Modaldetailsorder';
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Getporders from '@store/orders/Getorderact';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

type Targetorder = {

    id: 1;
    subtotal: number;
    items: product[];
    userid: number;
  
};
type product = {
  id: number;
  price: number;
  title: string;
  img: string;
  quantity: number;
};
function Ordersinfo() {
      const [show, setShow] = useState(false);
    const [target, setingtargst] = useState <Targetorder>();
      const handleClose = () => setShow(false);
      const handleShow = (id:number) => {setShow(true);
        const targetorderinfo = orderslist.find(el => el.id == id);
        console.log(targetorderinfo)
          setingtargst(targetorderinfo);

      };
      
      
      
    const orderslist = useAppSelector((state) => state.Orderslice.orderslist);
    const dispatch = useAppDispatch();
    useEffect(() => {
    dispatch(Getporders());    
    },[dispatch])
    return (
      <>
        {orderslist.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Items</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderslist.map((el) => (
                <tr key={el.id}>
                  <td>#{el.id}</td>
                  <td>
                    {el.items.length} item(s)
                    {" / "}
                    <span
                      onClick={() => handleShow(el.id)}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Product Details
                    </span>
                  </td>
                  <td>{el.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <>jj</>
        )}
        {show && (
          <Modaldetailsorder
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            settargst={target}
          ></Modaldetailsorder>
        )}{" "}
      </>
    );
}

export default Ordersinfo