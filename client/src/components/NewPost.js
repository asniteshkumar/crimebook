import { Form } from "react-router-dom";
import React from "react";

import left_image from "../assets/images/left_newpost.svg";
import right_image from "../assets/images/right_newpost.svg";

import classes from "./NewPost.module.css";

import MediaInput from "./MediaInput";

const NewPost = (props) => {
  const getMediaHandler = (media) => {
    props.onGetMedia(media);
  };

  return (
    <div>
      <div className={classes.post}>
        <div className={classes.image}>
          <img src={left_image} alt="left_new_post" width="70%" />
        </div>
        <div className={`${classes.container} container rounded-4`}>
          <Form method="post" encType="multipart/form-data">
            <p className="fs-2 text-center">Post Crime</p>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control mb-4"
            />
            <MediaInput ongetMedia={getMediaHandler} />
            <input
              typle="text"
              name="location"
              placeholder="Location"
              className="form-control mb-4"
            />
            <textarea
              name="description"
              rows="5"
              placeholder="Description"
              className="form-control mb-4"
            ></textarea>
            <button className={`${classes.postbtn} btn mt-3`}>Post</button>
          </Form>
        </div>
        <div className={classes.image}>
          <img src={right_image} alt="right_new_post" width="60%" />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
