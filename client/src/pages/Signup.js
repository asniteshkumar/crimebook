import { redirect } from "react-router-dom";
import React from "react";

import SignupPage from "../components/Signup";

const Signup = () => {
  return <Signup />;
};

export default SignupPage;

export async function action({ request }) {
  const data = await request.formData();

  const signupData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  const resData = await response.json();

  console.log(resData.message);

  return redirect("/login");
}
