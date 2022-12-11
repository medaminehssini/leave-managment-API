import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUser,
  getAllUsers,
  updateUserProfile,
  userRegister,
} from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ListUser = () => {
  const [formData, setFormData] = useState({
    email: "medhssinihssini1@gmail.com",
    password: "123456",
    name: "med123",
    gender: "Male",
    isAdmin: false,
  });

  const dispatch = useDispatch();

  const userAll = useSelector((state) => state.userAll);
  const { loading, error, users } = userAll;

  const userReg = useSelector((state) => state.userRegister);
  const { loading: loadingRegister, error: errorRegister } = userReg;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const submitHandler = () => {
    dispatch(
      userRegister(
        formData.name,
        formData.email,
        formData.password,
        formData.gender,
        formData.isAdmin
      )
    );
  };

  const deleteUserNow = (id) => {
    dispatch(deleteUser(id));
  };

  const updateUserNow = (id) => {
    dispatch(
      updateUserProfile(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          isAdmin: formData.isAdmin,
        },
        id,
        "admin"
      )
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ListUser</h1>
      {loadingRegister && <Loader />}
      <button
        onClick={() => {
          submitHandler();
        }}
      >
        Add user
      </button>

      <div>
        {error && <Message variant="danger"></Message>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {users.map((user, index) => {
              return (
                <div className="form-check" key={index * 3}>
                  <label className="form-check-label">{user.name}</label>
                  <button
                    onClick={() => {
                      deleteUserNow(user._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      updateUserNow(user._id);
                    }}
                  >
                    {" "}
                    Update
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUser;
