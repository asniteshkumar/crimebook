import { useRouteLoaderData, redirect } from "react-router-dom";
import React from "react";

import EditPost from "../components/EditPost";

const EditPostPage = () => {
  const post = useRouteLoaderData("post-detail");

  return <EditPost post={post} />;
};

export default EditPostPage;

export async function action({ params, request }) {
  const postId = params.postId;
  const data = await request.formData();

  console.log(postId)
  const editData = {
    title: data.get("title"),
    location: data.get("location"),
    description: data.get("description"),
  };

  console.log(editData);
  const response = await fetch("http://localhost:8080/posts/" + postId, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(editData),
  });

  const resData = await response.json();

  console.log(resData.message);

  return redirect("/explore-posts");
}
