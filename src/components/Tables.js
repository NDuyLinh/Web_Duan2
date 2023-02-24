import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Card, Table, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

const headers = [ 
  { label: "STT", key: "index" },
  { label: "Date", key: "date" },
  { label: "Color (RGB)", key: "color" },
  { label: "Number", key: "value" }
];

const ProductTable = ({ products }) => {
  const exportRef = useRef(null);
  const TableRow = ({index, date, color}) => {
    return (
      <tr>
        <td className="fw-bold">{index}</td>
        <td>{date}</td>
        <td><div className="color-table" style={{backgroundColor: `rgb(${color})`}}></div></td>
      </tr>
    );
  };

  const exportProducts = () => {
    if(products.length > 0) {
      exportRef.current.link.click();
    }
  }

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h3>Products Report: </h3>
            <Button variant="secondary" size="sm" onClick={() => exportProducts()}>Download report</Button>
            <CSVLink
              headers={headers}
              filename="products.csv"
              data={products}
              ref={exportRef}
            />
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Date</th>
            <th scope="col">Color</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <TableRow key={`products-${index}`} index={index + 1} {...product} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ProductTable;
