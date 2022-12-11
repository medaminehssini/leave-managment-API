import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Protected = ({ nextPage, children, role }) => {
  let navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  useEffect(() => {
    console.log(role);
    console.log(userInfo?.role);
    if (
      (userInfo && !nextPage) ||
      (!userInfo && nextPage) ||
      (role != null && role === "admin" && userInfo?.isAdmin !== true)
    ) {
      navigate("/");
    }
  }, [navigate, userInfo, nextPage, role]);
  return (
    <Container style={{ paddingTop: "0px", paddingBottom: "0px" }}>
      {children}
    </Container>
  );
};
export default Protected;
