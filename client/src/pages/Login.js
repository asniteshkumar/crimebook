import { redirect } from "react-router-dom";
import React from "react";

import Login from "../components/Login";

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const resData = await response.json();

  if (resData.message) {
    console.log(resData.message);
    return null;
  } else {
    const { token, userId, username } = resData;

    const loginInfo = {
      token,
      userId,
      username,
    };

    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

    return redirect("/explore-posts");
  }

  // const authToken = resData.token;
  // const {username, id } = resData;

  // localStorage.setItem("token", authToken);
  // const expiration = new Date();
  // expiration.setHours(expiration.getHours() + 1);
  // localStorage.setItem("expiration", expiration.toISOString());
}
