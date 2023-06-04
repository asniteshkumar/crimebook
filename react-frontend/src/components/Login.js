import { Form, Link } from "react-router-dom";
import React from "react";

import image from "../assets/images/login.svg";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.login}>
      <div className="display">
        <img src={image} alt="login" width="80%" />
      </div>
      <div className={`${classes.container} container rounded-4 `}>
        <Form method="post" className="needs-validation">
          <h1 className="mb-3">Login</h1>
          <p className="fw-bold mb-0">Welcome back !!!</p>
          <p className={classes.muted}>
            Securely access our anonymous crime reporting system and contribute
            to building a safer community by logging in below.
          </p>
          <div className="was-validated mb-4">
            <input
              type="text"
              name="username"
              placeholder="Anonymous Username"
              className="form-control"
              required
            />
          </div>
          <div className="was-validated mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control "
              required
            />
          </div>
          <p className="text-center">
            <Link to="/reset_password">Forgot Password?</Link>
          </p>
          <button type="submit" className={`${classes.loginbtn} btn mt-2`}>
            Login
          </button>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
