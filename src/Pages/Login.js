import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginLoading, loginResponse, loginRequest } from "../Reducers/loginSlice";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  const isLoading = useSelector(loginLoading)
  const response = useSelector(loginResponse)
  




  const post = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData))
    .then (() => {
      navigate('/home')
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <img
          src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png"
          alt="immagine-login"
        />
      </div>
      <Form className="m-5" onSubmit={post}> 
        <Form.Control
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Inserisci email..."
          className="my-2"
        />
        <Form.Control
          onChange={handleInputChange}
          name="password"
          type="password"
          placeholder="Inserisci password..."
          className="my-2"
        />
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
};

export default Login;