
import React, {useState} from "react";
import Session from "../../common/Session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { routes } from "../../routes";
import memberActions from "../../services/memberActions";

const Register = ({history}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  
  if (Session.loadSession()) {
    history.push("/");
  }

  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  
  const onRegister = async (data) => {
    const {email, password, confirmPassword} = data;
    if(password !== confirmPassword) {
      setErrorMessage("Confirm password isn't correct");
      return;
    }
    const response = await memberActions.registerEmail(email, password);
    if(response && response.errorMessage) {
      setErrorMessage(response.errorMessage);
      return;
    }
    reset();
    history.push("/");
  }

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={routes.home} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/signin.svg)`}}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(onRegister)}>
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
                        placeholder="example@company.com"
                        {...register("email")}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control 
                        required 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        {...register("password")} 
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control 
                        required 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")} 
                      />
                    </InputGroup>
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <b>terms and conditions</b>
                    </FormCheck.Label>
                  </FormCheck>
                  {errorMessage && <p className="error text-reddit">{errorMessage}</p>}

                  <Button variant="primary" type="submit" className="w-100">
                    Sign up
                  </Button>
                </Form>

                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link as={Link} to={routes.login} className="fw-bold">
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Register;