import { redirect } from "react-router-dom";
import React from "react";

import NewPost from "../components/NewPost";

import { getLoginInfo } from "../util/auth";

let mediaFiles;

const NewPostPage = () => {
  const getMediaHandler = (media) => {
    mediaFiles = media;
  };
  return <NewPost onGetMedia={getMediaHandler} />;
};

export default NewPostPage;

export async function action({ request }) {
  const loginData = getLoginInfo();
  const data = await request.formData();

  const edited = mediaFiles.map(
    (file) => new File([file.url], file.name, { type: file.type })
  );

  data.set("media", edited[0]);

  for (let i = 1; i < edited.length; i++) {
    data.append("media", edited[i]);
  }

  data.append(
    "author",
    JSON.stringify({ id: loginData.userId, username: loginData.username })
  );

  const response = await fetch("/posts", {
    method: "POST",
    headers: {
      authorization: "Bearer " + loginData.token,
    },
    body: data,
  });

  const resData = await response.json();

  console.log(resData.message);

  return redirect("/explore-posts");
}
