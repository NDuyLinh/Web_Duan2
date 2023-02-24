import React from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Card, Table, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const MembersTable = ({ members, history }) => {
  const dispatch = useDispatch();

  const TableRow = ({index, mail, role}) => {
    return (
      <tr>
        <td className="fw-bold">{index}</td>
        <td>{mail}</td>
        <td>{role}</td>
      </tr>
    );
  };

  const exportProducts = () => {
    if(members.length > 0) {
      history.push("/register");
    }
  }

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h3>Products Report: </h3>
            <Button variant="secondary" size="sm" onClick={() => exportProducts()}>Create User</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((product, index) => (
            <TableRow key={`products-${index}`} index={index + 1} {...product} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default withRouter(MembersTable);
