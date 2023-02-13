import React, { useState, useEffect, useRef } from "react";
import { POST_USER, GETAUTH } from "../../Auth";

import "../../styles/signupstyles.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = (props) => {
  const userRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [imageLink, setImageLink] = useState("default");
  const [imageDescription, setImageDescription] = useState("default");
  const [liked, setLiked] = useState(0);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState("");
  const [userFocus, setUserFocus] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState("");
  const [matchFocus, setMatchFocus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [signinClicked, setSignInClick] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd;

    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const profilePic = "";

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    fetch(POST_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: pwd,
        UserName: user,
        Bio: bio,
        ProfilePicture: profilePic,
        Posts: [
          {
            Liked: liked,
            ImageLink: imageLink,
            ImageDescription: imageDescription,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccess(true);
      })
      .catch((err) => console.log("Error " + err));
  };

  return (
    <div>
      {signinClicked ? (
        <SignIn auth={props.auth} loggedUser={props.loggedUser} />
      ) : (
        <div className="signup-wrapper__div">
          {success ? (
            <div className="success-div">
              <div>
                <h2 className="success-header">Succes!</h2>
                <a className="success-button__signin" href="/signin">
                  Sign in
                </a>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="signup-header">Sign up</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-wrapper">
                  <div>
                    <label className="form-wrapper__label" htmlFor="fName">
                      First name
                    </label>
                    <br />
                    <input
                      className="form-wrapper__input"
                      type="text"
                      id="fName"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <br />
                    <label className="form-wrapper__label" htmlFor="lName">
                      Last name
                    </label>
                    <br />
                    <input
                      className="form-wrapper__input"
                      type="text"
                      id="lName"
                      onChange={(e) => setLastName(e.target.value)}
                    />

                    <br />
                    <label className="form-wrapper__label" htmlFor="email">
                      Email
                    </label>
                    <br />
                    <input
                      className="form-wrapper__input"
                      type="text"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-wrapper__label" htmlFor="uName">
                      Username
                    </label>
                    <br />
                    <input
                      className="form-wrapper__input"
                      type="text"
                      id="uName"
                      onChange={(e) => setUser(e.target.value)}
                      ref={userRef}
                      autoComplete="off"
                      required
                      aria-invalid={validUser ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                    />
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validUser
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      4 to 24 characters. <br />
                      Must begin with a letter. <br />
                      Letters, numbers, underscored, hyphens allowed.
                    </p>
                    <br />
                    <label className="form-wrapper__label" htmlFor="passW">
                      Password
                    </label>
                    <br />
                    <input
                      className="form-wrapper__input"
                      type="password"
                      id="passW"
                      onChange={(e) => setPwd(e.target.value)}
                      ref={userRef}
                      required
                      aria-invalid={validUser ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />

                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? "instructionsPwd" : "offscreen"
                      }
                    >
                      8 to 24 characters. <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>
                      <span aria-label="dollar sign">$</span>
                      <span aria-label="percent">%</span>
                    </p>
                    <br />
                    <label className="form-wrapper__label" htmlFor="confirmPwd">
                      Confirm password
                    </label>
                    <br />
                    <input
                      className="form-wrapper__input"
                      type="password"
                      id="confirmPwd"
                      ref={userRef}
                      onChange={(e) => setMatchPwd(e.target.value)}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />

                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch
                          ? "instructionsConfPwd"
                          : "offscreen"
                      }
                    >
                      Must match the first password input field
                    </p>
                  </div>
                </div>
                <br />
                <div className="form-wrapper__buttons__div">
                  <button
                    className="form-wrapper__signupbutton"
                    disabled={
                      !validUser || !validPwd || !validMatch ? true : false
                    }
                  >
                    Sign up
                  </button>
                  <a>
                    or click <a onClick={() => setSignInClick(true)}>here</a> to
                    sign in
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      <div>
        <img
          className="image-signup"
          src="https://images.unsplash.com/photo-1527824404775-dce343118ebc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        />
      </div>
    </div>
  );
};

const SignIn = (props) => {
  const [usersUName, setUsersUName] = useState("");
  const [usersPassword, setUsersPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    fetch(GETAUTH + `?password=${usersPassword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Users not found");
        }
        return res.json();
      })
      .then((data) => {
        props.loggedUser(data);

        props.auth(true, data);
      });
  };
  return (
    <div className="signin-wrapper">
      <form onSubmit={handleSignin}>
        <h1 className="signin-header">Sign In</h1>
        <div>
          <label htmlFor="uname">Username</label>
          <br />
          <input
            className="form-wrapper__input"
            type="text"
            id="uname"
            onChange={(e) => setUsersUName(e.target.value)}
          />
          <br />
          <label htmlFor="passW">Password</label>
          <br />
          <input
            className="form-wrapper__input"
            type="password"
            id="passW"
            onChange={(e) => setUsersPassword(e.target.value)}
          />
        </div>
        <div className="form-button__wrapper">
          <button className="form-wrapper__signinbutton cancel">Cancel</button>
          <button className="form-wrapper__signinbutton">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
