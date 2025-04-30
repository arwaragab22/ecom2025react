import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Getallproducts from "@store/Products/Act/ActProducts";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import  dataall from "../data.json";
const categories = [
  {
    id: 1,
    name: "Electronics",
    products: ["Laptop", "Smartphone", "Headphones"],
  },
  { id: 2, name: "Fashion", products: ["T-Shirt", "Shoes", "Jacket"] },
  {
    id: 3,
    name: "Home & Kitchen",
    products: ["Blender", "Cookware", "Furniture"],
  },
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
   useEffect(() => {
    
      dispatch(Getallproducts());
    
  }, [dispatch]);
  const [search, setSearch] = useState("");
  const { records, error } = useAppSelector((state) => state.Productsslice);

console.log(records)
  // Filter categories and products based on search input
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      products: category.products.filter((product) =>
        product.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.products.length > 0
    );
console.log(dataall,records)
  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div
        className="text-white text-center py-5"
        style={{ backgroundColor: " rgb(51, 199, 228) " }}
      >
        <h1 className="display-4">Welcome to Our Store</h1>
        <p className="lead">Find the best products at unbeatable prices!</p>
      </div>

      {/* Categories & Products */}
      <Container>
        <Container>
          <Row>
            {records.length > 0
              ? records.map((productitem) => {
                  return (
                    <Col
                      xs={6}
                      md={3}
                      className="d-flex justify-content-center mb-5 mt-2"
                    >
                      <Product max={0} {...productitem} />
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
                      <Product max={0} {...productitem} />
                    </Col>
                  );
                })}
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
