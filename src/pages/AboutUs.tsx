import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStore, FaUsers, FaPhone, FaEnvelope } from "react-icons/fa";

const AboutUs: React.FC = () => {
  return (
    <Container fluid className="t py-5">
      {/* Hero Section */}
      <div
        className="text-center text-white py-5"
        style={{
          backgroundColor: " rgb(51, 199, 228) ",
        }}
      >
        <h1 className="display-4">About Our Store</h1>
        <p className="lead">
          Your one-stop shop for quality products at great prices.
        </p>
      </div>

      {/* Mission Section */}
      <Container className="my-5">
        <h2 className="text-center text-primary">Our Mission</h2>
        <p className="text-center text-muted">
          We aim to provide the best shopping experience with top-notch products
          and exceptional service.
        </p>
        <Row className="text-center mt-4">
          <Col md={6} className="mb-4">
            <Card className="shadow border-0 p-4">
              <FaStore size={50} className="text-primary mx-auto" />
              <Card.Body>
                <Card.Title>Quality Products</Card.Title>
                <Card.Text>
                  We source only the best products for our customers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="shadow border-0 p-4">
              <FaUsers size={50} className="text-primary mx-auto" />
              <Card.Body>
                <Card.Title>Customer Focused</Card.Title>
                <Card.Text>
                  Our priority is customer satisfaction and support.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Contact Section */}
      <div className="bg-secondary text-white py-5">
        <Container>
          <h2 className="text-center">Contact Us</h2>
          <p className="text-center">
            Have questions? Reach out to us anytime!
          </p>
          <Row className="text-center">
            <Col md={6} className="mb-3">
              <FaPhone size={25} className="text-light me-2" />
              <span className="fs-5">+123 456 7890</span>
            </Col>
            <Col md={6}>
              <FaEnvelope size={25} className="text-light me-2" />
              <span className="fs-5">support@ecommerce.com</span>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default AboutUs;
