import React from "react";
import { Col, Row, Card, Table } from "react-bootstrap";

export const PageVisitsTable = () => {

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>{`Danh sách sản phẩm:`}</h5>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Màu sắc</th>
            <th scope="col">Thời gian</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
    </Card>
  );
};
