import { Link, useRouteLoaderData, Form } from "react-router-dom";
import React from "react";

import logo from "../assets/images/logo.png";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const loginInfo = useRouteLoaderData("root");

  return (
    <div
      className={`${classes.nav} d-flex justify-content-between align-items-center py-2 px-2 fixed-top rounded-3`}
    >
      <div className={`${classes.link} d-flex`}>
        <p className="mb-0 ps-1">
          <Link to="/">Start Here</Link>
        </p>
        <p className="mb-0">
          <Link to="/explore-posts">Explore</Link>
        </p>
      </div>
      <div href="" className={`${classes.brand} d-flex`}>
        <img src={logo} alt="logo" width="30" height="30" />
        <p className="mb-0 ms-2 ">CRIMEBOOK</p>
      </div>
      {!loginInfo ? (
        <div className={`${classes.cta} d-flex`}>
          <Link to="/login">
            <button className={`${classes.loginbtn} btn`}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={`${classes.signbtn} btn`}>Signup</button>
          </Link>
        </div>
      ) : (
        <div className="dropdown">
          <Form action="/logout" method="post">
            {/* <select
            className={`${classes.logout} form-select`}
            aria-label="Default select example"
          >
            <option>{`@${loginInfo.username}`}</option>
            <option> <button type="submit">Logout</button> </option>
          </select> */}
            <div
              className={`${classes.logout} d-flex gap-3 align-items-center`}
            >
              <p className="mb-0">{`@${loginInfo.username}`}</p>
              <button
                className={`btn fs-5 p-1 ${classes.logbtn}`}
                type="submit"
                title="logout"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
