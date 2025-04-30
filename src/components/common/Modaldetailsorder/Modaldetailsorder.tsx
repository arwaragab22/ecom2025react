import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Style.module.css";
const { product, productImg } = styles;
type product = {
  id: number;
  price: number;
  title: string;
  img: string;
  quantity: number;
};
type preop = {
  show: boolean;
  handleClose: () => void;
  handleShow: (id: number) => void;

  settargst: {
    id: 1;
    subtotal: number;
    items: product[];
    userid: number;
  }[];
};
function Modaldetailsorder({
  show,
  handleClose,
  handleShow,
  settargst,
}: preop) {
  console.log(settargst.items);
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> product details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{settargst.items.map(el => {
          return (
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #8080809c",
                paddingBottom: "20px",
              }}
            >
              {" "}
              <div className={productImg}>
                <img style={{ objectFit: "contain" }} src={el.img} alt="" />
              </div>
              <div>
                <h5
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  {el.title}
                </h5>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Total Quantity: {el.quantity}
                </p>
                <h6
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Price Total:{el.price.toFixed(2) * el.quantity} EGP
                </h6>
              </div>
            </div>
          );
        })}</Modal.Body>
      </Modal>
    </>
  );
}

export default Modaldetailsorder;
