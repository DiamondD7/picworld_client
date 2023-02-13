import React, { useState } from "react";
import { PUT_USER } from "../../Auth";

import "../../styles/addbiomodalstyles.css";
const AddBioModal = (props) => {
  const [bio, setBio] = useState(props.loggedUser.bio);
  const [updateData, setUpdateData] = useState([]);
  const cancelBtn = () => {
    props.setOpenBio(false);
  };

  console.log(props.loggedUser.userId);

  const updateBio = () => {
    fetch(PUT_USER + `/${props.loggedUser.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        UserId: props.loggedUser.userId,
        FirstName: props.loggedUser.firstName,
        LastName: props.loggedUser.lastName,
        Email: props.loggedUser.email,
        Password: props.loggedUser.password,
        UserName: props.loggedUser.userName,
        Bio: bio,
        profilePicture: props.loggedUser.profilePicture,
        posts: [
          {
            liked: 0,
            imageLink: "",
            imageDescription: "",
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Update");
        props.setOpenBio(false);
        const data = JSON.parse(localStorage.getItem("data"));
        data.bio = bio;
        localStorage.setItem("data", JSON.stringify(data));
        window.location.reload();
      });
  };
  return (
    <div>
      <div className="overlay"></div>
      <div className="bio-modal__wrapper">
        <textarea
          className="bio-modal__textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div className="bio-modal__button__wrapper">
          <button onClick={cancelBtn}>Cancel</button>
          <button type="submit" onClick={updateBio}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBioModal;
