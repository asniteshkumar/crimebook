import React, { useState, useEffect, useRef } from "react";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import classes from "./VideoEditor.module.css";

import Modal from "../UI/Modal";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

const load = async () => {
  await ffmpeg.load();
};

load();

let input = true;
let resetVideoUrl = "";

const VideoEditor = (props) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [trimedVideo, setTrimedVideo] = useState(null);
  const [isTrimming, setIsTrimming] = useState(false);

  const startTime = useRef("");
  const endTime = useRef("");

  const { file } = props;

  useEffect(() => {
    setVideoUrl(file.url);
    resetVideoUrl = file.url;
    input = false;
  }, [file]);

  const setVideoHandler = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setVideoUrl(fileUrl);
    resetVideoUrl = fileUrl;
    input = false;
  };

  const trimVideoHandler = async () => {
    setIsTrimming(true);
    const start = startTime.current.value;
    const end = endTime.current.value;

    ffmpeg.FS("writeFile", "input", await fetchFile(videoUrl));

    setVideoUrl(null);

    await ffmpeg.run(
      "-i",
      "input",
      "-ss",
      start,
      "-to",
      end,
      "-c",
      "copy",
      "output.mp4"
    );
    const Data = ffmpeg.FS("readFile", "output.mp4");
    setTrimedVideo(
      URL.createObjectURL(new Blob([Data.buffer], { type: "video/mp4" }))
    );
    setIsTrimming(false);
  };

  const resetVideoHandler = () => {
    setVideoUrl(resetVideoUrl);
    setTrimedVideo(null);
    setIsTrimming(false);
  };

  const saveVideoHandler = () => {
    props.onReplace({ url: trimedVideo, name: file.name, type: file.type });
  };

  const closeImageEditor = () => {
    props.onClose();
  };

  return (
    <Modal onClose={closeImageEditor}>
      <div className={`${classes.editor} py-4`}>
        <div className={`${classes.video_canva} mb-3`}>
          {videoUrl && (
            <video controls>
              <source src={videoUrl} />
            </video>
          )}
          {input && (
            <input type="file" accept="video/*" onChange={setVideoHandler} />
          )}
          {trimedVideo && (
            <video controls>
              <source src={trimedVideo} />
            </video>
          )}
          {isTrimming && <p>{`Trimming...`}</p>}
        </div>
        <div
          className={`${classes.edit_input} mb-4 d-flex justify-content-center gap-3`}
        >
          <input
            type="text"
            placeholder="Start Time (HH:MM:SS)"
            ref={startTime}
          />
          <input type="text" placeholder="End Time (HH:MM:SS)" ref={endTime} />
          <button
            className={`btn ${classes.trimbtn}`}
            onClick={trimVideoHandler}
          >
            <i className="bi bi-scissors"></i> Trim Video
          </button>
        </div>
        <div className="reset_done d-flex justify-content-end gap-3">
          <button
            className={`btn ${classes.trimbtn}`}
            onClick={resetVideoHandler}
          >
            <i className="bi bi-arrow-repeat"></i> Reset
          </button>
          <button
            className={`btn ${classes.savebtn}`}
            onClick={saveVideoHandler}
          >
            <i className="bi bi-download"></i> Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VideoEditor;
