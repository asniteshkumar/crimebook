import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("loginInfo");

  return redirect("/explore-posts");
}
