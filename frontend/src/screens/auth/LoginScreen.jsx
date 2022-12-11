import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { loading, error } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    if (validForm()) dispatch(userLogin(formData.email, formData.password));
  };

  const validForm = () => {
    return (
      validateField("email", formData.email) &&
      validateField("password", formData.password)
    );
  };

  const validateField = (fieldName, value) => {
    let error,
      msg = "";
    switch (fieldName) {
      case "email":
        error = true;
        if (value.length <= 0) {
          msg = "L'email' est obligatoire";
          error = false;
        } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          error = false;
          msg = "Merci de vérifier votre email";
        }
        break;
      case "password":
        error = true;

        if (value.length <= 0) {
          msg = "Le mot de passe est obligatoire";
          error = false;
        } else if (value.length < 6) {
          error = false;
          msg = "Le mot de passe doit être supérieur à 6 caractères";
        }
        break;

      default:
        break;
    }
    setFormErrors({ ...formErrors, [fieldName]: msg });
    return error;
  };

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    validateField(name, value);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Se connecter</h1>

      <div>
        {error && <Message variant="danger">Verifier votre données</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label> Adresse Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="nom@exemple.com"
              name="email"
              value={formData.email}
              onChange={(e) => handleUserInput(e)}
              className={formErrors["email"].length > 0 && "inputError"}
            ></Form.Control>
            {formErrors["email"].length > 0 && (
              <p className="alert alert-danger descError">
                {formErrors["email"]}
              </p>
            )}
          </Form.Group>
          <Form.Group controlId="password" className="mt-4">
            <Form.Label> Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              name="password"
              className={formErrors["password"].length > 0 && "inputError"}
              onChange={(e) => handleUserInput(e)}
            ></Form.Control>
            {formErrors["password"].length > 0 && (
              <p className="alert alert-danger descError">
                {formErrors["password"]}
              </p>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Button
                type="submit"
                style={{ marginTop: "15px" }}
                className="buttonn-design"
                variant=""
              >
                Se connecter
              </Button>
            </Col>
            <Col style={{ textAlign: "right", marginTop: "25px" }}>
              Nouveau parmi nous ?{" "}
              <Link to={"/register"}>Créer un compte </Link>
              <br />
              <Link to={"/reset/password"}>mot de passe oublié ? </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
