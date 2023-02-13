import React, { useEffect, useState } from "react";

import "react-image-crop/dist/ReactCrop.css";
import "../../styles/addpostmodalstyles.css";
const AddPostModal = (props) => {
  const [src, setSrc] = useState(null);
  const [description, setDescription] = useState("");
  const handleImageChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const body = document.getElementById("body--");

    if (props.openModal === true) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [props.openModal]);

  const submitUpload = () => {
    fetch("https://localhost:7230/api/Posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        UserId: props.userId,
        ImageLink: src,
        ImageDescription: description,
        liked: 0,
      }),
    })
      .then((res) => console.log(res))
      .then(() => {
        console.log("success");
      });
  };

  const btnCancel = () => {
    props.setopenModal(false);
  };

  return (
    <div>
      <div className="overlay"></div>
      <div className="modal-wrapper">
        <div className="modal-wrapper__secondwrapper">
          {src === null ? (
            <div>
              <label className="input-label__text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="uploadicon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>{" "}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <button className="modal-cancel" onClick={btnCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <div className="image-preview__wrapper">
                <img src={src} className="image-preview" alt="imagepreview" />
              </div>
              <div>
                <textarea
                  className="textarea-description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="button-wrapper">
                <button
                  className="btns"
                  onClick={() => props.setopenModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="xmarkicon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button className="btns" onClick={submitUpload}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="checkicon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
