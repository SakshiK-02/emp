import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    //
    if (values.email === "admin@gmail.com" && values.password === "12345") {
      axios
        .post("http://localhost:3000/auth/adminlogin", values)
        //....this part is for only one gmail and pass for admin login
        // .then(result => {
        //   if(result.data.loginStatus){
        //     navigate('/dashboard')
        //   }else{
        //     setError(result.data.Error)
        //   }
        .then((result) => {
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginpage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && error}</div>

        {/* <h2>Login Page</h2> */}
        <h3 className="mt-2 mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>

          <button className="btn btn-success w-100 rounded 0 mb-2">
            Log in
          </button>

          {/* <div className='mb-1'>
                <input type="checkbox" name="tick" id="tick" className='me-2'/>
                <label htmlFor='password'>Agree with T&C </label>
            </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
