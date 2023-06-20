import React, { useState } from "react";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createUserAPI } from "../../services/api";

const initialValue = {
  username: "",
  password: "",
  email: "",
  phoneno: "",
};
const Registerpage = () => {
  const [userdata, setUser] = useState(initialValue);
  const { username, password, email, phoneno } = userdata;
  const onValueChange = (e) => {
    setUser({ ...userdata, [e.target.name]: e.target.value });
  };
  const saveuser = async () => {};

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    // e.preventDefault()
    if (!userdata.username || !userdata.password || !userdata.email || !userdata.phoneno) {
      return alert("FILL DETAILS");
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
          let saveuser1 = await createUserAPI(userdata);
          if (saveuser1.data.statusCode === 200) {
            alert("User Created");
            navigate("/");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Duplicate EMAIL ");
        console.log(errorCode, errorMessage);

        // ..
      });
  };
  return (
    <div>
      <div>
        <div className="background">
          <div className="login-box">
            <h2>User Register</h2>
            <form>
              <div className="user-box">
                <input
                  type="text"
                  onChange={(e) => onValueChange(e)}
                  name="username"
                  value={username}
                />
                <label>UserName</label>
              </div>
              <div className="user-box">
                <input
                  type="email"
                  onChange={(e) => onValueChange(e)}
                  name="email"
                  value={email}
                />
                <label>EmailID</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  value={password}
                />
                <label>Password</label>
              </div>

              <div className="user-box">
                <input
                  type="tel"
                  onChange={(e) => onValueChange(e)}
                  name="phoneno"
                  value={phoneno}
                />
                <label>Phone No:</label>
              </div>
              <div className="row">
                <div className="col-md-12 register_user">
                  <button
                    href="register"
                    className="register-button"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
              <a onClick={() => onSubmit()}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Register
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
