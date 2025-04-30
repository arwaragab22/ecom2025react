import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppDispatch,useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import Getallcateogry from "@store/Cateogries/Act/Actgetcateogry";
import Heading from "@components/common/Heading/Heading";
import dataall from "../data.json";

interface Icateogry {
    id: number,
    title: string,
    img: string,
    prefix: string,
}
const Categories = () => {
  const dispatch = useAppDispatch();
  const { records ,error,loading} = useAppSelector((state) => state.Cateogryslice);

  useEffect(() => {
    if (!records.length) {
      dispatch(Getallcateogry());
    }
  }, [dispatch, records.length]);
  let allrecord = records.map(record => {
    return (
      <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2" key={record.id}>
        <Category {...record}/>
      </Col>
    );
  })
  if (records.length == 0) {
     allrecord = dataall.categories.map((record) => {
      return (
        <Col
          xs={6}
          md={3}
          className="d-flex justify-content-center mb-5 mt-2"
          key={record.id}
        >
          <Category {...record} />
        </Col>
      );
    });
}
  return (
    <Container>
      <Heading>catoegry</Heading>
      <Row>
    
      {allrecord}
      
      </Row>
    </Container>
  );
};

export default Categories;
