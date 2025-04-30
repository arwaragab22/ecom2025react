import { resetartslice } from "@store/Cart/Cartslice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Postorders from "@store/orders/Actorder";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
type props = {
  showstate: boolean,
  Handleclose:()=>void
}
function Ordermodal({ showstate, Handleclose }: props) {
  const [loading,setloading]=useState(false)
  const [show, setShow] = useState(showstate);
  const { totalprice } = useAppSelector((stae) => stae.Cartslice);
  const handleClose = () => setShow(false);
  const dispatch = useAppDispatch();
  const [error,seterror]=useState(null)
  console.log("ordermodels");
  const handlepostorder = () => {
    setloading(true)

    dispatch(Postorders(totalprice)).unwrap().then(() => {
  
      setloading(false);
      Handleclose();
      dispatch(resetartslice());
    }).catch((error) => {
      console.log(error);
      seterror(error)
})
  };
  return (
    <>
      <Modal
        show={show}
        onHide={Handleclose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Placing order </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subtotl :{totalprice}EGP
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Handleclose}>
            Close
          </Button>
          {!loading ?
            <Button variant="primary" onClick={handlepostorder}>
              Confirm
            </Button> : <><Spinner size={"sm"} animation="border"></Spinner>...loading</>}
        </Modal.Footer>
        <p
          style={{
            paddingLeft: "15px",
            fontWeight: "bold",
            color: "red",
            fontSize: "14px",
          }}
        >
          {error}
        </p>
      </Modal>
    </>
  );
}

export default Ordermodal;
