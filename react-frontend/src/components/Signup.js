import { Form, Link } from "react-router-dom";
import React from "react";

import image from "../assets/images/signup.svg";

import classes from "./Signup.module.css";

const Signup = () => {
  return (
    <div className={classes.signup}>
      <div className="display">
        <img src={image} alt="signup" />
      </div>
      <div className={`${classes.container} container rounded-4`}>
        <Form method="post" className="needs-validation">
          <h1 className="mb-3">Signup</h1>
          <p className={classes.muted}>
            Your anonymity is our top priority, ensuring that you can report
            crimes without fear.
          </p>
          <div className="was-validated mb-4">
            <input
              type="text"
              name="username"
              placeholder="Anonymous Username"
              className="form-control mb-4"
              required
            />
          </div>
          <div className="was-validated mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-4"
              required
            />
          </div>
          <div className="was-validated mb-4">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              className="form-control mb-4"
              required
            />
          </div>
          <button type="submit" className={`${classes.signupbtn} btn mt-2`}>
            Signup
          </button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
