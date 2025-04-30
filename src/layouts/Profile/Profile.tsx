import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

import styles from "./styles.module.css";
const { container, wrapper } = styles;
type Props = {}

function Profile({}: Props) {
  return (
    <Container className={container}>
      <Row>
        <Col>
          <ListGroup as="ul" style={{ width: "250px" }}>
            <ListGroup.Item as={NavLink} to="" end>
              Account info
            </ListGroup.Item>

            <ListGroup.Item as={NavLink} to="orders" end>
              Orders
            </ListGroup.Item>
          </ListGroup>
              </Col>
              <Col md={9}>
              <Outlet></Outlet>
              </Col>      </Row>

    
    </Container>
  );
}

export default Profile