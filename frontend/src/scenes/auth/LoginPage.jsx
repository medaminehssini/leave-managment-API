import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../actions/userActions";

export default function SignInPage() {
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
    <div className="text-center m-5-auto" style={HeaderStyle}>
      <h2
        style={{
          paddingTop: "180px",
          color: "white",
          fontSize: "50px",
        }}
      >
        Sign in to us
      </h2>
      <form>
        <p>
          <label>Username or email address</label>
          <br />
          <input
            type="text"
            name="email"
            required
            value={formData.email}
            onChange={(e) => handleUserInput(e)}
            className={formErrors["email"].length > 0 ? "inputError" : ""}
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            className={formErrors["password"].length > 0 ? "inputError" : ""}
            onChange={(e) => handleUserInput(e)}
          />
        </p>
        <p>
          <button
            id="sub_btn"
            type="button"
            onClick={() => {
              submitHandler();
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

const HeaderStyle = {
  height: "100%",

  background: `url('/assets/bg1.jpg')`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
