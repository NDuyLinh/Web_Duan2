import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductChart from "../../components/ProductChart";
import { dbRef } from "../../services/firebaseConfig";
import memberActions from "../../services/memberActions";

import { onValue } from "firebase/database";
import { isNil } from "lodash";
const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!isNil(data)) {
        const products = memberActions.fetchProduct(Object.values(data));
        setProducts(products);
      }
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} className="mb-4">
              <ProductChart title="Total produces" products={products} />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default HomePage;
