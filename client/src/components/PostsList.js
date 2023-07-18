import { Link } from "react-router-dom";
import React from "react";

import classes from "./PostsList.module.css";

const PostsList = ({ posts }) => {
  return (
    <div className={classes.cardPage}>
      {posts.map((post) => (
        <Link key={post._id} to={`/explore-posts/${post._id}`}>
          <div className={`${classes.card} card mb-5`}>
            <div className="card-body">
              <p className="card-text mb-1">{`@${post.author.username}`}</p>
              <div className={`d-flex align-items-center ${classes.align}`}>
                <div className={`${classes.title} card-title`}>
                  {post.title}
                </div>
                <p className="card-text">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {post.location}
                </p>
              </div>

              <div className={classes.thumbnail}>
                {post.medias[0].mediatype === "image/jpeg" ? (
                  <img
                    className={`${classes.imageBorder} card-img-top`}
                    variant="top"
                    crossOrigin="anonymous"
                    src={post.medias[0].url}
                    alt="post_image"
                  />
                ) : (
                  <img
                    className={`${classes.imageBorder} card-img-top`}
                    variant="top"
                    crossOrigin="anonymous"
                    src={post.medias[1].url}
                    alt="post_image"
                  />
                )}
              </div>

              <p className="card-text">
                <br />
                {post.description.slice(0, 101)}... <br />{" "}
                <span className={`${classes.muted}`}>read more</span>
              </p>
            </div>
          </div>
        </Link>
      ))}

      <Link to="/explore-posts/new">
        <button className={`${classes.postbtn} btn position-fixed fs-5`}>
          New Post
          <i className="bi bi-plus-square-fill ms-2"></i>
        </button>
      </Link>
    </div>
  );
};

export default PostsList;
