import { Product } from "@components/eCommerce";
import { useAppDispatch } from "@store/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaSearchDollar, FaSearchMinus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
interface Iproducts {
  id: number;
  title: string;
  img: string;
  cat_prefix: string;
  price: number;
}
function Searchglobal() {
  const dispatch = useAppDispatch();
  const [filtersearch, setusefiltersearch] = useState<Iproducts[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  console.log(q);
  const getdata = async () => {
    try {
      const response = await axios.get(
        "https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/products"
      );

      const all = response.data.filter((item: Iproducts) => {
        return Object.values(item).some((value) => {
          return value.toString().toLowerCase().includes(q?.toLowerCase());
        });
      });

      setusefiltersearch(all);

      console.log(all);
    } catch (err) {
      console.log("err");
    }
  };
  useEffect(() => {
    getdata();
  }, [q]);
  return (
    <Container>
      {filtersearch?.length > 0 ? (
        <Row>
          {filtersearch?.map((productitem) => {
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
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div>
            <FaSearchMinus size={40} color="#999" />
          </div>
          <p style={{ color: "#555", marginTop: "10px" }}>
            No results found. Please try searching again.
          </p>
        </div>
      )}
    </Container>
  );
}

export default Searchglobal;
