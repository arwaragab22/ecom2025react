import Heading from "@components/common/Heading/Heading";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Actgetwishitems from "@store/Wish/ActGetwishitem";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { Cleanupwishlist } from "@store/Wish/Wishslice";


function Wishes() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.Wishlist.productfullinfo);
    const items = useAppSelector((state) => state.Wishlist.items);

  useEffect(() => {
    dispatch(Actgetwishitems());
  
     return () => {
       //You can add your code for unmounting phase of component
dispatch(Cleanupwishlist());     
    }
  }, [dispatch])
  return products.length > 0 ? (
    <Container>
      <Heading>Wishlist</Heading>
      <Row>
        {products.map((productitem) => {
          return (
            <Col
              xs={6}
              md={3}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              <Product {...productitem} isliked={true} />
            </Col>
          );
        })}
      </Row>{" "}
    </Container>
  ) : (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#555" }}>
        ❤️ Your Wishlist is Empty!
      </h2>
      <p style={{ fontSize: "16px", color: "#777" }}>
        Looks like you haven't added anything yet. Start exploring now!
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
        🔍 Browse Products
      </Button>
    </div>
  );
}

export default Wishes;

