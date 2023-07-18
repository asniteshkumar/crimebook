import React from "react";

import Modal from "../UI/Modal";

import classes from "./ShowDocument.module.css";

const ShowDocument = (props) => {
  const closeDocumentHandler = () => {
    props.onClose();
  };

  return (
    <Modal onClose={closeDocumentHandler}>
      <div
        className={`${classes.layout} d-flex justify-content-center align-items-center`}
      >
        <div>
          <iframe
            className={classes.frame}
            src={props.docUrl}
            title="document"
          ></iframe>
        </div>
      </div>
    </Modal>
  );
};

export default ShowDocument;
