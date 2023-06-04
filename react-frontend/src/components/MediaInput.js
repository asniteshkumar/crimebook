import React, { useState } from "react";

import ShowMedia from "./ShowMedia";

const MediaInput = (props) => {
  const [media, setMedia] = useState(false);
  const [inputFiles, setInputFiles] = useState(null);

  const openMediaHandler = (e) => {
    setMedia(true);
    setInputFiles(Object.values(e.target.files));
  };

  const closeMediaHandler = () => {
    setMedia(false);
  };

  const getMediaHandler = (media) => {
    setMedia(false);
    props.ongetMedia(media);
  };

  return (
    <>
      <input
        type="file"
        name="media"
        className="form-control mb-4"
        multiple
        onChange={openMediaHandler}
      />
      {media && (
        <ShowMedia
          files={inputFiles}
          onClose={closeMediaHandler}
          onGetMedia={getMediaHandler}
        />
      )}
    </>
  );
};

export default MediaInput;
