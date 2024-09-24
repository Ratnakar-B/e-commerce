import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current.value = localStorage.getItem("email");
    passwordInputRef.current.value = localStorage.getItem("password");
    // validateToken();
  });

  let sendLoginDataToServer = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/loginData", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);

    if (JSOData.status == "success") {
      localStorage.setItem("email", emailInputRef.current.value);
      localStorage.setItem("password", passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.token);

      navigate("/home", { state: JSOData });
    } else {
      alert("something went wrong");
    }
    console.log(JSOData);
  };

  //Token validation//

  let validateToken = async () => {
    let dataToSend = new FormData();

    dataToSend.append("token", localStorage.getItem("token"));
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:3333/tokenValidation",
      reqOptions
    );
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };
  return (
    <div className="login-container">
      <div>
        <img
          className="ads1"
          src="https://i.pinimg.com/originals/ac/b8/63/acb8635064fa4d060f3470054bdaf920.gif"
          alt=""
        ></img>
      </div>
      <div></div>
      <form className="form-container">
        <h1 className="loginHeading"> Login</h1>

        <input
          ref={emailInputRef}
          className="inputBox"
          type="email"
          placeholder="Email Address"
        ></input>
        <input
          ref={passwordInputRef}
          className="inputBox"
          type="password"
          placeholder="Password"
        ></input>

        <Link className="fpLink" to="/forgotPassword">
          Forgot Password?
        </Link>
        <div>
          <button
            className="loginBtn"
            type="button"
            onClick={() => {
              sendLoginDataToServer();
            }}
          >
            Login
          </button>
        </div>
        <p>
          Don't have an account?{" "}
          <Link className="signupLink" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
