import { useRouteLoaderData, redirect } from "react-router-dom";
import React from "react";

import EditPost from "../components/EditPost";

import { getLoginInfo } from "../util/auth";

const EditPostPage = () => {
  const post = useRouteLoaderData("post-detail");

  return <EditPost post={post} />;
};

export default EditPostPage;

export async function action({ params, request }) {
  const loginData = getLoginInfo();

  const postId = params.postId;
  const data = await request.formData();

  const editData = {
    title: data.get("title"),
    location: data.get("location"),
    description: data.get("description"),
  };

  const response = await fetch("/posts/" + postId, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + loginData.token,
    },
    method: "PATCH",
    body: JSON.stringify(editData),
  });

  const resData = await response.json();

  console.log(resData.message);

  return redirect("/explore-posts");
}
