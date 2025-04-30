import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import Getallproducts from "@store/Products/Act/ActProducts";
import { useParams } from "react-router-dom";
import Heading from "@components/common/Heading/Heading";
import dataall from "./../data.json"
const Products = () => {
  const param = useParams();
  const prefixitem = param.prefix;

  const dispatch = useAppDispatch();
  const { records, error } = useAppSelector((state) => state.Productsslice);
  useEffect(() => {
    if (prefixitem) {
          dispatch(Getallproducts(prefixitem));

  }
    
  }, [dispatch, prefixitem]);

  return (
    <Container>
      <Heading>{param.prefix}</Heading>
      <Row>
        {records.length > 0
          ? records.map((productitem) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  className="d-flex justify-content-center mb-5 mt-2"
                >
                  <Product {...productitem} />
                </Col>
              );
            })
          : dataall.products.map((productitem) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  className="d-flex justify-content-center mb-5 mt-2"
                >
                  <Product {...productitem} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default Products;
