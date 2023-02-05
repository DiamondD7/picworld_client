import React, { useState, useEffect } from "react";
import { GETA_USER, PUT_USER } from "../../Auth";

import "../../styles/profilestyles.css";
const Profile = (props) => {
  const [item, setItem] = useState([]);
  const [getupdatePic, setGetUpdatePic] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7230/api/Posts/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  }, []);

  const onChangeImageUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
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
          Bio: props.loggedUser.bio,
          profilePicture: URL.createObjectURL(e.target.files[0]),
          posts: [
            {
              liked: 0,
              imageLink: "",
              imageDescription: "",
            },
          ],
        }),
      })
        .then((res) => res)
        .then(() => {
          setIsChanged(true);
        });
    }
  };

  useEffect(() => {
    fetch(GETA_USER + `/${props.loggedUser.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGetUpdatePic(data.profilePicture);
        setIsChanged(false);
      });
  }, [isChanged]);

  return (
    <div>
      <div className="profilepicture-div">
        <div>
          <img className="profilepicture" src={getupdatePic} alt="profilepic" />
        </div>
        <div className="addIcon-div">
          <label className="labelInput">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="addIcon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <input
              type="file"
              className="inputFile"
              accept="image/png, image/jpeg"
              onChange={onChangeImageUpload}
            />
          </label>
        </div>
      </div>
      <p className="profile-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        quidem voluptas asperiores maxime perspiciatis sit
      </p>

      <div className="profile-post-container">
        <div>
          <img
            src="https://images.unsplash.com/photo-1671479914107-9d63c9d9f465?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="post"
            className="image-post"
          />

          <div className="icons-div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="heart-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="commenticon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="shareicon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </div>
        </div>
      </div>
      {item.map((i) =>
        i.userId === props.loggedUser.userId ? (
          <div key={i.postId}>
            <p>{i.imageLink === "default" ? "" : i.imageLink}</p>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Profile;
