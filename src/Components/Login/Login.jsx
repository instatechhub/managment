import React, { useState } from "react";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-wrapper">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden w-100" style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          {/* Left Image and Info Section */}
          <div className="col-md-6 bg-danger-subtle d-flex flex-column justify-content-center align-items-center p-4 animate-slide-in-left">
            <img
              src={require("../../Assests/02.png")}
              alt="Exam Illustration"
              className="img-fluid mb-4"
              style={{ maxHeight: "500px" }}
            />
            {/* <h2 className="fw-bold text-dark mb-2">Manager Login</h2> */}
<p className="text-muted px-3 text-center">
  Streamline employee attendance, boost productivity, and simplify workforce tracking with Insta Connects.
</p>
          </div>

          {/* Right Login Form Section */}
          <div className="col-md-6 p-5 animate-slide-in-right">
            <h3 className="mb-4">
              <strong>Insta</strong>{" "}
              <span className="text-danger">Connects</span>
            </h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username or email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="johnsmith007"
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
                <a href="/dashboard" className="text-decoration-none text-white ">
                Sign in
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
