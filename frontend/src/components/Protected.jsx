import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Protected = ({ nextPage, children, role }) => {
  let navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  useEffect(() => {
    if (
      (userInfo && !nextPage) ||
      (!userInfo && nextPage) ||
      (role != null && role === "admin" && userInfo?.isAdmin !== true) ||
      (role != null && role === "user" && userInfo?.isAdmin !== false)
    ) {
      navigate("/");
    }
  }, [navigate, userInfo, nextPage, role]);
  return (
    <div style={{ paddingTop: "0px", paddingBottom: "0px" }}>{children}</div>
  );
};
export default Protected;
