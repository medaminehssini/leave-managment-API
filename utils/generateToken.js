import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "ABC123", {
    expiresIn: "30d",
  });
};

export default generateToken;
