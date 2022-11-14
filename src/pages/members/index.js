import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Members = () => {
  return (
    <main>
      <section className="d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link} to="/">
                  <Image src={`${process.env.PUBLIC_URL}/images/coming.png`} className="img-fluid" />
                </Card.Link>
                <p className="lead my-4">
                  Tôi đang trong quá trình hoàn thiện trang. Mong nhận được góp ý từ mọi người.
                </p>
                <Button as={Link} variant="primary" className="animate-hover" to="/">
                  <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  Trở lại
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Members