import CartSkeleton from '@components/Skeleton/Cartskeleton';
import CategorySkeleton from '@components/Skeleton/Cateogry';
import React from 'react'
import { Container, Row } from 'react-bootstrap';


interface Idataprops {
  children:React.ReactNode,
  loading: "idle" | "pending" | "fulfiled" | "rejected";
  error: null | string;
}

export default function Loading({ error,loading,children}: Props) {

  return (
    <>
      {loading == "pending" && <CartSkeleton />}
      <Container>
        <Row>{error ? error : allrecord}</Row>
      </Container>
    </>
  );
}