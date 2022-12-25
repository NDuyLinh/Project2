
/** GLOBAL */
import React from "react";
import Session from "../../common/Session";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setMembers } from "../../reducer/slices/MembersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routes } from "../../routes";

/** ACTION */
import memberActions from "../../services/memberActions";

const SignInComponent = ({ history }) => {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const signIn = async (data) => {
    const response = await memberActions.signIn(data.email, data.password);
    if(response && response.user) {
      const {accessToken, email} = response.user;
      dispatch(setMembers({
        token: accessToken,
        email: email
      }));
      reset();
      history.push("/");
    }
  }

  if (!Session.loadSession()) {
    history.push("/");
  }

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-8 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/signin.svg)`}}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(signIn)}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control 
                        autoFocus 
                        required
                        name="email"
                        type="email" 
                        placeholder="You Email" 
                        {...register("email")}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control 
                          required 
                          type="password" 
                          placeholder="Password"
                          name="password"
                          {...register("password")}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={routes.register} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default withRouter(SignInComponent);