import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../../actions/userActions";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    setformData({
      name: userInfo.name,
      email: userInfo.email,
      password: "",
    });
  }, [userInfo]);

  const handleFormSubmit = () => {
    dispatch(updateUserProfile(formData));
  };

  return (
    <Box m="20px">
      <Header title="Edit Profile" subtitle="Edit your profile" />

      <div>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            onChange={(e) => {
              setformData({
                ...formData,
                name: e.target.value,
              });
            }}
            value={formData.name}
            name="name"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) => {
              setformData({
                ...formData,
                email: e.target.value,
              });
            }}
            value={formData.email}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            onChange={(e) => {
              setformData({
                ...formData,
                password: e.target.value,
              });
            }}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Confirm Password"
            //  onChange={handleChange}
            name="confirm_password"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => handleFormSubmit()}
          >
            Update profile
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default Form;
