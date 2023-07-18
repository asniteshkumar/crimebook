import { useLoaderData } from "react-router-dom";
import React from "react";

import PostsList from "../components/PostsList";

const PostsPage = () => {
  const posts = useLoaderData();

  return <PostsList posts={posts.reverse()} />;
};

export default PostsPage;

export async function loader() {
  const response = await fetch("/posts");

  const resData = await response.json();

  return resData.posts;
}
