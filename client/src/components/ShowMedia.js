import React, { useState, useEffect } from "react";

import Modal from "../UI/Modal";
import ImageEditor from "./ImageEditor";
import VideoEditor from "./VideoEditor";

import classes from "./ShowMedia.module.css";

const ShowMedia = (props) => {
  const { files } = props;

  const [mediaFiles, setMediaFiles] = useState([]);

  const [imageEditor, setImageEditor] = useState(false);
  const [videoEditor, setVideoEditor] = useState(false);

  const [mediaFile, setMediaFile] = useState("");

  useEffect(() => {
    setMediaFiles(
      files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }))
    );
  }, [files]);

  const closeMediaHandler = () => {
    props.onClose();
  };

  const openImageEditor = () => {
    setImageEditor(true);
  };

  const openVideoEditor = () => {
    setVideoEditor(true);
  };

  const closeEditor = () => {
    setImageEditor(false);
    setVideoEditor(false);
  };

  const replaceEditedItem = (editedMedia) => {
    closeEditor();
    setMediaFiles(
      mediaFiles.map((filee) =>
        filee === mediaFile ? (filee = editedMedia) : filee
      )
    );
  };

  const getDataHandler = () => {
    props.onGetMedia(mediaFiles);
  };

  return (
    <Modal>
      <div className={`${classes.main} d-flex flex-column flex-wrap`}>
        <button
          className={`btn btn-lg text-end mb-3 ${classes.close}`}
          onClick={closeMediaHandler}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        <div className={classes.layout}>
          {mediaFiles.map((file, i) =>
            file.type === "image/jpeg" || file.type === "image/png" ? (
              <div className={classes.container} key={i}>
                <div className={classes.media_cont}>
                  <img
                    className={classes.media}
                    src={file.url}
                    alt={file.name}
                  />
                </div>
                <div className="d-flex justify-content-end mt-3 gap-2">
                  <button
                    className={`btn btn-sm ${classes.editbtn}`}
                    onClick={() => {
                      openImageEditor();
                      setMediaFile(file);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn btn-sm ${classes.deletebtn}`}
                    onClick={() => {
                      setMediaFiles(
                        mediaFiles.filter((filee) => filee !== file)
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : file.type === "video/mp4" ? (
              <div className={classes.container} key={i}>
                <div className={classes.media_cont}>
                  <video className={classes.media} controls src={file.url} />
                </div>
                <div className="d-flex justify-content-end mt-3 gap-2">
                  <button
                    className={`btn btn-sm ${classes.editbtn}`}
                    onClick={() => {
                      openVideoEditor();
                      setMediaFile(file);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn btn-sm ${classes.deletebtn}`}
                    onClick={() => {
                      setMediaFiles(
                        mediaFiles.filter((filee) => filee !== file)
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null
          )}
          {imageEditor && (
            <ImageEditor
              onClose={closeEditor}
              file={mediaFile}
              onReplace={replaceEditedItem}
            />
          )}
          {videoEditor && (
            <VideoEditor
              onClose={closeEditor}
              file={mediaFile}
              onReplace={replaceEditedItem}
            />
          )}
        </div>
        <button
          className={`btn align-self-end mt-4 ${classes.donebtn}`}
          onClick={getDataHandler}
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default ShowMedia;
