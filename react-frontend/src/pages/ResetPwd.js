import React from "react";

import ResetPwd from "../components/ResetPwd";
import { redirect } from "react-router-dom";

const ResetPwdPage = () => {
  return <ResetPwd />;
};

export default ResetPwdPage;

export async function action({ request }) {
  const data = await request.formData();

  const resetdata = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(resetdata);

  const response = await fetch("http://localhost:8080/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetdata),
  });

  const resData = await response.json(resetdata);

  console.log(resData.message);

  return redirect("/login");
}
