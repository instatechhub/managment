import React, { useState,useCallback,useEffect } from "react";
import "./Login.css";
import useAuthStore from "../../Store/AuthStore/AuthStore";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("rishi@gmail.com");
  const [password, setPassword] = useState("123456");
  const {login,user} = useAuthStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleRedirect = useCallback(() => {
    if (token && user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await login({ input:email, password:password });
    console.log("Login response:", response.data);
    if(response?.data?.success){
    toast.success("Login Successful!");
    navigate("/dashboard");
    localStorage.setItem("token",response?.data?.token)
    }
  } catch (error) {
    console.error("Login error:", error);
    const message = error?.response?.data?.message || "Login failed. Please try again.";
    toast.error(message);
  }
};
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-wrapper">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden w-100" style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          <div className="col-md-6 bg-danger-subtle d-flex flex-column justify-content-center align-items-center p-4 animate-slide-in-left">
            <img
              src={require("../../Assests/02.png")}
              alt="Exam Illustration"
              className="img-fluid mb-4"
              style={{ maxHeight: "500px" }}
            />
<p className="text-muted px-3 text-center">
  Streamline employee attendance, boost productivity, and simplify workforce tracking with Insta Connects.
</p>
          </div>

          <div className="col-md-6 p-5 animate-slide-in-right">
            <h3 className="mb-4">
              <strong>Insta</strong>{" "}
              <span className="text-danger">Connects</span>
            </h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="guest@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-end mt-1">
                  <a href="#" className="text-decoration-none custom-dark-blue small">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button type="submit" className="btn btn-dark w-100 mt-3">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
