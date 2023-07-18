import { useRouteLoaderData, redirect } from "react-router-dom";
import React from "react";

import PostDetail from "../components/PostDetail";

import { getLoginInfo } from "../util/auth";

const PostDetailPage = () => {
  const post = useRouteLoaderData("post-detail");

  return <PostDetail post={post} />;
};

export default PostDetailPage;

// to load post data
export async function loader({ params }) {
  const id = params.postId;

  const response = await fetch("/posts/" + id);

  const resData = await response.json();

  return resData;
}

// to delete post
export async function action({ params, request }) {
  const loginData = getLoginInfo();

  const postId = params.postId;

  const response = await fetch("/posts/" + postId, {
    method: request.method,
    headers: {
      authorization: "Bearer " + loginData.token,
    },
  });

  const resData = await response.json();

  console.log(resData.message);

  return redirect("/explore-posts");
}
