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
    </Card>
  );
};
