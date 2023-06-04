import { Form } from "react-router-dom";
import React from "react";

import image from "../assets/images/resetpwd.svg";

import classes from "./ResetPwd.module.css";

const ResetPwd = () => {
  return (
    <div className={classes.reset}>
      <div className={classes.display}>
        <img src={image} alt="reset_pwd" />
      </div>

      <div className={`${classes.container} container rounded-4`}>
        <Form method="post">
          <h1 className="mb-3">Forgot Password</h1>
          <p className={classes.muted}>
            Forgot your password? No worries! Easily reset it here and regain
            access to your CrimeBook.
          </p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="form-control mb-3"
          />
          <button type="submit" className={`${classes.resetbtn} btn mt-1`}>
            Reset Password
          </button>
        </Form>
      </div>

      {/* <div className={`${classes.container} container rounded-4`}>
        <form action="">
          <h1 className="mb-3">Reset Password</h1>
          <p className={classes.muted}>
            Strong passwords include numbers, letters and punctutation marks.
          </p>
          <input
            type="password"
            name="email"
            placeholder="Password"
            className="form-control mb-3"
          />
          <input
            type="password"
            name="email"
            placeholder="Confirm Password"
            className="form-control mb-3"
          />
          <button type="submit" className={`${classes.resetbtn} btn mt-1`}>
            Reset Password
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default ResetPwd;
