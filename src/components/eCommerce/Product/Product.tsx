import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { useDispatch } from "react-redux";
import { incrementproduct } from "@store/Cart/Cartslice";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import DisLike from "@assets/svg/like.svg?react";
import Like from "@assets/svg/like-fill.svg?react";
import { ClipLoader } from "react-spinners";
import ADDwishitem from "@store/Wish/Actwish";

const { product, productImg, wishicon, wishicondisabled, wishiconenabled } =
  styles;
interface Iproducts {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
  max?: number;
  isliked?:boolean
}

const Product = ({ title, img, price, id, max, isliked }: Iproducts) => {
  const [modelshouldlogin, setshouldlogin] = useState(false);

    const handleClose = () => setshouldlogin(false);
    const handleShow = () => setshouldlogin(true);
  const {accessToken} = useAppSelector((state) => state.Authslice);
  const itemsquantity = useAppSelector((state) => state.Cartslice.items);
  const remainquantity = max - (itemsquantity[id] || 0);
  const [loadwish, setloadwish] = useState(false);
  const [likeicon, setlikeicon] = useState(Boolean(isliked));
  const [disablebtn, setdisablebtn] = useState(false);
  const dispatch = useDispatch();
  const handleaddproduct = () => {
    if (accessToken) {
      dispatch(incrementproduct(id));
      setdisablebtn(true);
      setTimeout(() => {
        setdisablebtn(false);
      }, 300);
    }
    else {
            setshouldlogin(true);

    }
  };
  const handlelike = () => {
    if (accessToken) {
      setloadwish(true);
      dispatch(ADDwishitem(id))
        .unwrap()
        .then((result) => {
          setlikeicon(!likeicon);
          setloadwish(false);
        })
        .catch((error) => {});  
    }
    else {
      setshouldlogin(true)
    }
  
  };
  return (
    <>
      {" "}
      <div className={product}>
        {likeicon ? (
          !loadwish ? (
            <Like
              onClick={handlelike}
              className={`${wishicon}  ${
                likeicon ? wishicondisabled : wishiconenabled
              }`}
            />
          ) : (
            <Spinner
              className={wishicon}
              animation="border"
              variant="primary"
              size="sm"
            ></Spinner>
          )
        ) : !loadwish ? (
          <DisLike className={wishicon} onClick={handlelike} />
        ) : (
          <Spinner
            className={wishicon}
            animation="border"
            variant="primary"
            size="sm"
          ></Spinner>
        )}
        <div className={productImg}>
          <img style={{ objectFit: "cover" }} src={img} alt="" />
        </div>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)}</h3>
        <p
          style={{
            fontSize: "14px",
            color: "gray",
            fontWeight: 600,
            margin: "10px 0px",
          }}
        >
          {remainquantity > 0
            ? `you can add the ${remainquantity}   items`
            : " you reach to the limit"}
        </p>
        <Button
          variant="info"
          style={{ color: "white" }}
          disabled={disablebtn || remainquantity <= 0 ? true : false}
          onClick={handleaddproduct}
        >
          {disablebtn ? <ClipLoader size={18} color="white" /> : " Add to cart"}
        </Button>
      </div>
      {modelshouldlogin && (
        <Modal show={modelshouldlogin} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            you need to login first to add this 
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Product;
