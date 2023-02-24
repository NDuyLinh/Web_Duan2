import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Calendar from "../../components/Calendar";
import { dbRef } from "../../services/firebaseConfig";
import memberActions from "../../services/memberActions";
import moment from "moment";
import { onValue } from "firebase/database";
import { isNil } from "lodash";
import ProductTable from "../../components/Tables";
const Report = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!isNil(data)) {
        const response = Object.values(data).sort((a,b) => moment(b.timestamp, "DD/MM/YYYY HH:mm:ss") - moment(a.timestamp, "DD/MM/YYYY HH:mm:ss"));
        const products = memberActions.fetchProduct(response, true);
        setProducts(products);
      }
    });
  };

  return (
    <React.Fragment>
      <Row>
      <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <ProductTable products={products}/>
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="px0">
                  <Calendar/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Report;
