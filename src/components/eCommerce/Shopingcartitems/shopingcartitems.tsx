
import { Button, Form } from 'react-bootstrap';
import styles from "./styles.module.css"
import { memo } from 'react';
import { useAppDispatch } from '@store/hooks';
import { deleteitem } from '@store/Cart/Cartslice';

const { cartItem, product, productImg, productInfo, cartItemSelection } =styles;
type product={

  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
  max: number


}
type propsitem = {
  item: product;
  quantity: number;
  changequantity:(id:number,quantity:number)=>void
};

function Shopingcartitems({ item, quantity, changequantity }: propsitem) {
  const dispatch = useAppDispatch();

  const deleteitemcart = (id: number) => {
dispatch(deleteitem(id))  }
  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img src={item.img} style={{ maxWidth: "100% " }} />
        </div>
        <div className={productInfo}>
          <h2>{item.title}</h2>
          <h3> {item.price}EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={()=>deleteitemcart(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-3">Quantity</span>
        <Form.Select
          size="sm"
          defaultValue={quantity}
          onChange={(e ) => changequantity(item.id, +e.target.value)}
        >
          {Array.from({ length: item?.max }).map((el, index) => {
            return (
              <option value={index + 1} key={index}>
                {++index}
              </option>
            );
          })}
        </Form.Select>
      </div>
    </div>
  );
}

export default Shopingcartitems;