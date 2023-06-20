import React ,{useState}from 'react'
import "../registerpage/register.css"
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/api";

const initialValue = {
  email: "",
  password: "",
};
const Loginpage = () => {
  const [userdata, setUser] = useState(initialValue);
  const { email, password } = userdata;
  const onValueChange = (e) => {
    setUser({ ...userdata, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();


  const onLogin = (e) => {
    // e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        let login = await loginAPI(userdata);
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("name")
            if(login.data.statusCode === 404){
              alert(login.data.message)
            }
            if(login.data.statusCode === 200){
              localStorage.setItem("token",login.data.message.token)
              localStorage.setItem("role",login.data.message.role)
              localStorage.setItem("name",login.data.message.name)
            alert("Logged In");
              if(login.data.message.role === 'admin'){
                navigate('/admin')
              }
              if(login.data.message.role === 'user'){
                navigate('/user')
              }
            }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        console.log(errorCode, errorMessage)
    });
   
}

  return (
    <div>
       <div>
        <div>
      <div className="background">
        <div className="login-box">
          <h2>Login</h2>
          <form>
          
            <div className="user-box">
              <input
                type="email"
                onChange={(e) => onValueChange(e)}
                name="email"
                value={email}
              />
              <label>Email</label>
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
            <div className="row">
              <div className="col-md-12 register_user">
                <button href="register" className="register-button" onClick={()=>{navigate('/register')}}>
                 
                  Register
                </button>
              </div>
            </div>
            <a onClick={()=>onLogin()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </a>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Loginpage
