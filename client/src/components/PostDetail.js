import { Form, Link, useSubmit } from "react-router-dom";
import React, { useState } from "react";

import classes from "./PostDetail.module.css";

import { getLoginInfo } from "../util/auth";

import ShowDocument from "./ShowDocument";

const PostDetail = ({ post }) => {
  const [document, setDocument] = useState(false);
  const [file, setFile] = useState("");

  const submit = useSubmit();

  const loginInfo = getLoginInfo();

  function startDeleteHandler() {
    const proceed = window.confirm(
      "Are you sure! You want to delete this post?"
    );
    if (proceed) {
      submit(null, { method: "delete" });
    }
  }
  const setDocumentHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadDocument = async (e) => {
    const data = new FormData();

    data.append("document", file);

    const response = await fetch("/document/" + post._id, {
      method: "POST",
      headers: {
        authorization: "Bearer " + loginInfo.token,
      },
      body: data,
    });

    const resData = await response.json();
    console.log(resData.message);
    window.location.reload();
  };

  const openDocumentHandler = () => {
    window.open(`${post.document}`);
  };

  const closeDocumentHandler = () => {
    setDocument(false);
  };

  return (
    <>
      <div
        className={`${classes.detail} d-flex justify-content-center flex-column align-items-center`}
      >
        <div className={classes.detailBody}>
          <div className="card-body mb-4 px-1 d-flex justify-content-between align-items-center">
            <p className="mb-0">{`@${post.author.username}`}</p>
            {post.author.id === loginInfo.userId && (
              <div className="editbtn">
                <Link
                  className={`${classes.editbtn} card-link btn btn-sm me-3`}
                  to="edit"
                >
                  Edit
                </Link>

                <button
                  className={`${classes.deletebtn} btn btn-sm`}
                  onClick={startDeleteHandler}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div
            id="campgroundCarousel"
            className={`${classes.carousel} carousel slide d-flex justify-content-center align-items-center`}
          >
            <div className={`${classes.carousel} carousel-inner`}>
              {post.medias.map((media) => (
                <div
                  key={media.filename}
                  className={`${classes.carousel} carousel-item active`}
                >
                  <img
                    crossOrigin="anonymous"
                    src={media.url}
                    className={`${classes.image} d-block w-100`}
                    alt="some img"
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#campgroundCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#campgroundCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* content below */}

          <div className={`${classes.content} card rounded-0`}>
            <div className="card-body">
              <p className={`${classes.muted} mb-0`}>
                <i className="bi bi-geo-alt-fill"></i> {post.location}
              </p>
              <h5 className="card-title fs-2 my-2">{post.title} </h5>
              <p className="card-text fs-6">{post.description}</p>

              <div className={`d-flex justify-content-end pt-3 ${classes.doc}`}>
                {post.document && (
                  <button
                    className={`btn ${classes.deletebtn}`}
                    onClick={openDocumentHandler}
                  >
                    Open Document
                  </button>
                )}

                {post.author.id === loginInfo.userId && !post.document && (
                  <Form className="d-flex justify-content-end gap-2">
                    <div>
                      <input
                        type="file"
                        name="document"
                        className={`form-control ${classes.inp}`}
                        onChange={setDocumentHandler}
                      />
                    </div>
                    <button
                      className={`btn ${classes.deletebtn}`}
                      onClick={uploadDocument}
                      type="submit"
                    >
                      Upload
                    </button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {document && (
        <ShowDocument docUrl={post.document} onClose={closeDocumentHandler} />
      )}
    </>
  );
};

export default PostDetail;
