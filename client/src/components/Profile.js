import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Profile() {
  let loc = useLocation();
  console.log(loc);
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let mobileNumberInputRef = useRef();
  let emailInpuRef = useRef();
  let passwordInputRef = useRef();
  let reConfirmInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profile, setProfile] = useState(
    "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
  );

  useEffect(() => {
    try {
      firstNameInputRef.current.value = loc.state.firstName;
      lastNameInputRef.current.value = loc.state.lastName;
      mobileNumberInputRef.current.value = loc.state.mobileNumber;
      emailInpuRef.current.value = loc.state.email;
      passwordInputRef.current.value = loc.state.password;
      reConfirmInputRef.current.value = loc.state.reConfirm;
      // profilePicInputRef.current.value = loc.state.profilePic;
      console.log("This is a useEffect Statement");
    } catch (err) {
      console.log(err);
    }
  });

  let sendDataToServerFromClient = async () => {
    let dataToSend = new FormData();

    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("mobileNumber", mobileNumberInputRef.current.value);
    dataToSend.append("email", emailInpuRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("reConfirm", reConfirmInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqoptions = {
      method: "PATCH",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/updateData", reqoptions);

    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <div className="signupMain-container">
      <form className="signupForm-container">
        <h1 className="signupHeading">Sign Up</h1>
        <div>
          <label>First Name</label>
          <input
            ref={firstNameInputRef}
            type="text"
            placeholder="First Name"
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            ref={lastNameInputRef}
            type="text"
            placeholder="Last Name"
          ></input>
        </div>
        <div>
          <img className="profilePic" src={profile} alt="ProfilePic"></img>
          <input
            ref={profilePicInputRef}
            type="file"
            onChange={() => {
              let imageUrlPath = URL.createObjectURL(
                profilePicInputRef.current.files[0]
              );
              setProfile(imageUrlPath);
            }}
          ></input>
        </div>
        <div>
          <label>Mobile Number</label>
          <input
            ref={mobileNumberInputRef}
            type="text"
            placeholder="+91- Enter Your Mobile Number"
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            ref={emailInpuRef}
            type="email"
            placeholder="Enter Your Email"
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Enter Your Password"
          ></input>
        </div>
        <div>
          <label>Re-Type Password</label>
          <input
            ref={reConfirmInputRef}
            type="password"
            placeholder="Re-type Your Password"
          ></input>
        </div>
        <div>
          <button
            className="SubmitBtn"
            type="button"
            onClick={() => {
              sendDataToServerFromClient();
            }}
          >
            Update Profile
          </button>

          <div>
            <p>
              <Link className="loginLink" to="/home">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
