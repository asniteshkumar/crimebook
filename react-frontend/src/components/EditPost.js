import { Form } from "react-router-dom";
import React from "react";

import image from "../assets/images/editpost.svg";

import classes from "./EditPost.module.css";

const EditPost = ({ post }) => {
  return (
    <div className={classes.post}>
      <div className={classes.image}>
        <img src={image} alt="" width="70%" />
      </div>
      <div className={`${classes.container} container rounded-4`}>
        <Form method="patch" encType="multipart/form-data">
          <p className="fs-2 text-center">Edit your Post</p>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control mb-4"
            defaultValue={post && post.title}
          />

          {/* <div className="input-group mb-3">
            <button
              className={`${classes.media} btn`}
              type="button"
              id="button-addon1"
            >
              Open media
            </button>
            <input
              type="text"
              className="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
          </div> */}

          <input
            typle="text"
            name="location"
            placeholder="Location"
            className="form-control mb-4"
            defaultValue={post && post.location}
          />
          <textarea
            name="description"
            rows="5"
            placeholder="Description"
            className="form-control mb-4"
            defaultValue={post && post.description}
          ></textarea>
          <button className={`${classes.postbtn} btn mt-3`}>Post</button>
        </Form>
      </div>
    </div>
  );
};

export default EditPost;
