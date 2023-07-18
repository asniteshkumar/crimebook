import React, { useState, useEffect, useRef } from "react";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import classes from "./ImageEditor.module.css";
import "./ReactCrop.css";

import Modal from "../UI/Modal";

const initialState = {
  image: "",
  width: "100%",
  height: "100%",
  brightness: 100,
  grayscale: 0,
  sepia: 0,
  saturate: 100,
  contrast: 100,
  hueRotate: 0,
  rotate: 0,
  vertical: 1,
  horizontal: 1,
};

const ImageEditor = (props) => {
  const [state, setState] = useState(initialState);

  const [resetImage, setResetImage] = useState("");

  const [editOption, setEditOption] = useState({});

  const [crop, setCrop] = useState("");

  const widthRef = useRef("");
  const heightRef = useRef("");

  const filterElement = [
    { name: "brightness", maxValue: 200 },
    { name: "grayscale", maxValue: 200 },
    { name: "sepia", maxValue: 200 },
    { name: "saturate", maxValue: 200 },
    { name: "contrast", maxValue: 200 },
    { name: "hueRotate", maxValue: 200 },
  ];

  const [property, setProperty] = useState({
    name: "brightness",
    maxValue: 200,
  });

  const [details, setDetails] = useState("");

  const [imageType, setImageType] = useState("");

  const { file } = props;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      image: file.url,
    }));
    setResetImage(file.url);
  }, [file]);

  const setImageHandler = (e) => {
    // if (e.target.files.length !== 0) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setState({
    //       ...state,
    //       image: reader.result,
    //     });
    //     setResetImage(reader.result);
    //   };
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  };

  const cropHandler = () => {
    setEditOption({ crop: true });
  };

  const resizeHandler = () => {
    setEditOption({ resize: true });
  };

  const filtersHandler = () => {
    setEditOption({ filters: true });
  };

  const rotate_flipHandler = () => {
    setEditOption({ rotate_flip: true });
  };

  const typeHandler = () => {
    setEditOption({ types: true });
  };

  const cropImageHandler = () => {
    const canvas = document.createElement("canvas");
    const scaleX = details.naturalWidth / details.width;
    const scaleY = details.naturalHeight / details.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Url = canvas.toDataURL(`image/${imageType}`);

    setState({
      ...state,
      image: base64Url,
    });

    setCrop("");
  };

  const resizeImageHandler = () => {
    setState({
      ...state,
      width: `${widthRef.current.value}px`,
      height: `${heightRef.current.value}px`,
    });
  };

  const changePropertyValue = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const leftRotate = () => {
    setState({ ...state, rotate: state.rotate - 90 });
  };

  const rightRotate = () => {
    setState({ ...state, rotate: state.rotate + 90 });
  };

  const verticalFlip = () => {
    setState({ ...state, horizontal: state.horizontal === 1 ? -1 : 1 });
  };

  const horizontalFlip = () => {
    setState({ ...state, vertical: state.vertical === 1 ? -1 : 1 });
  };

  const saveImageHandler = () => {
    const canvas = document.createElement("canvas");
    canvas.width = details.naturalWidth;
    canvas.height = details.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.filter = `brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.scale(state.vertical, state.horizontal);

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    props.onReplace({
      url: canvas.toDataURL(),
      name: file.name,
      type: imageType || "image/jpeg",
    });

    // const link = document.createElement("a");
    // link.download = `image_edit.${imageType}`;
    // link.href = canvas.toDataURL();
    // link.click();
  };

  const setTypeHandler = (e) => {
    setImageType(e.target.value);
  };

  const resetImageHandler = () => {
    setState({ ...initialState, image: resetImage });
  };

  const closeImageEditor = () => {
    props.onClose();
  };

  return (
    <Modal onClose={closeImageEditor}>
      <div className={`${classes.editor} py-2`}>
        <div
          className={`${classes.edit_options} d-flex justify-content-center gap-3`}
        >
          <button className="btn" onClick={cropHandler}>
            <i className="bi bi-crop"></i> Crop
          </button>
          <button className="btn" onClick={resizeHandler}>
            <i className="bi bi-arrows-angle-expand"></i> Resize
          </button>
          <button className="btn" onClick={filtersHandler}>
            <i className="bi bi-brush-fill"></i> Filters
          </button>
          <button className="btn" onClick={rotate_flipHandler}>
            <i className="bi bi-arrow-clockwise"></i> Rotate_Flip
          </button>
          <button className="btn" onClick={typeHandler}>
            <i className="bi bi-file-earmark-image"></i> Type
          </button>
        </div>
        <div className="edit_space">
          <div
            className={`${classes.image_canva} mt-4 d-flex justify-content-center align-items-center`}
          >
            {state.image ? (
              <>
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                  <img
                    className="image"
                    src={state.image}
                    alt="editing..."
                    style={{
                      width: `${state.width}`,
                      height: `${state.height}`,
                      filter: `brightness(${state.brightness}%) grayscale(${state.grayscale}%) sepia(${state.sepia}) saturate(${state.saturate}%) contrast(${state.contrast}%) hue-rotate(${state.hueRotate}) `,
                      transform: `rotate(${state.rotate}deg) scale(${state.vertical}, ${state.horizontal})`,
                    }}
                    onLoad={(e) => setDetails(e.currentTarget)}
                  />
                </ReactCrop>
              </>
            ) : (
              <input type="file" onChange={setImageHandler} />
            )}
          </div>
          <div
            className={`${classes.edit_input} d-flex justify-content-center gap-2 m-3`}
          >
            {editOption.crop && (
              <button className="btn" onClick={cropImageHandler}>
                Crop Image
              </button>
            )}
            {editOption.resize && (
              <>
                <input
                  type="number"
                  placeholder="Width in pixel"
                  ref={widthRef}
                />
                <input
                  type="number"
                  placeholder="Heigth in pixel"
                  ref={heightRef}
                />
                <button className="btn" onClick={resizeImageHandler}>
                  Resize Image
                </button>
              </>
            )}
            {editOption.filters &&
              filterElement.map((v, i) => (
                <button
                  className={`btn me-0.5 property.name === v.name ? "active" : ""`}
                  onClick={() => setProperty(v)}
                  key={i}
                >
                  {v.name}
                </button>
              ))}
            {editOption.rotate_flip && (
              <>
                <button className="btn" onClick={leftRotate}>
                  <i className="bi bi-arrow-counterclockwise"></i> Left
                </button>
                <button className="btn" onClick={rightRotate}>
                  <i className="bi bi-arrow-clockwise"></i> Right
                </button>
                <button className="btn" onClick={verticalFlip}>
                  <i className="bi bi-arrow-down-up"></i> Vertical
                </button>
                <button className="btn" onClick={horizontalFlip}>
                  <i className="bi bi-arrow-left-right"></i> Horizontal
                </button>
              </>
            )}
            {editOption.types && (
              <>
                <button className="btn" value="jpg" onClick={setTypeHandler}>
                  .jpg
                </button>
                <button className="btn" value="jpeg" onClick={setTypeHandler}>
                  .jpeg
                </button>
                <button className="btn" value="png" onClick={setTypeHandler}>
                  .png
                </button>
                <button className="btn" value="webp" onClick={setTypeHandler}>
                  .webp
                </button>
              </>
            )}
          </div>
          <div className={`${classes.edit_controller}`}>
            <div
              className={
                editOption.filters
                  ? `edit_slider d-flex justify-content-center gap-4 my-3`
                  : `${classes.none}`
              }
            >
              {editOption.filters && (
                <>
                  <label htmlFor="slider">{property.name}</label>
                  <input
                    type="range"
                    className={`form-range ${classes.range}`}
                    id="slider"
                    name={property.name}
                    value={state[property.name]}
                    max={property.maxValue}
                    onChange={changePropertyValue}
                  />
                  <span>100%</span>
                </>
              )}
            </div>
            <div className="reset_done d-flex justify-content-center gap-3">
              <button className="btn" onClick={resetImageHandler}>
                <i className="bi bi-arrow-repeat"></i> Reset
              </button>
              <button
                className={`btn ${classes.savebtn}`}
                onClick={saveImageHandler}
              >
                <i className="bi bi-download"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageEditor;
