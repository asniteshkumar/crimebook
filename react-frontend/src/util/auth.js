import { redirect } from "react-router-dom";

export function getLoginInfo() {
  const loginInfo = localStorage.getItem("loginInfo") || false;

  return JSON.parse(loginInfo);
}

export function loginInfoLoader() {
  return getLoginInfo();
}

export function checkAuthLoader() {
  const loginInfo = getLoginInfo();

  if (!loginInfo.token) {
    return redirect("/login");
  }

  return null;
}
