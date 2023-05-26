import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginLoading,
  loginResponse,
  loginRequest,
} from "../Reducers/loginSlice";
import "../styles/login.css";
import {Toast} from '../utilities/notifications'
import {Toaster} from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData)).then((action) => {
      if (action.payload && action.payload.token) {
        // Salva token in local storage
        localStorage.setItem("auth", JSON.stringify(action.payload.token));
        // Naviga a home
        navigate("/home", { replace: true });
      }
    });
  };

  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="box">
      <Form className="m-5" onSubmit={post}>
        <h2>Sign in</h2>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Inserisci email..."
          className="form my-2"
        />

        <Form.Control
          onChange={handleInputChange}
          name="password"
          type="password"
          placeholder="Inserisci password..."
          className="my-2"
        />
        <div className="links">
          <a href="#">Forgot Password</a>
          <a href="#">Signup</a>
        </div>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
