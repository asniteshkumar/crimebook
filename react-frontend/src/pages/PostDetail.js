import { useRouteLoaderData, redirect } from "react-router-dom";
import React from "react";

import PostDetail from "../components/PostDetail";

const PostDetailPage = () => {
  const post = useRouteLoaderData("post-detail");

  return <PostDetail post={post} />;
};

export default PostDetailPage;

// to load post data
export async function loader({ params }) {
  const id = params.postId;

  const response = await fetch("http://localhost:8080/posts/" + id);

  const resData = await response.json();

  return resData;
}

// to delete post
export async function action({ params, request }) {
  const postId = params.postId;

  const response = await fetch("http://localhost:8080/posts/" + postId, {
    method: request.method,
  });

  const resData = await response.json();

  console.log(resData.message);

  return redirect("/explore-posts");
}
