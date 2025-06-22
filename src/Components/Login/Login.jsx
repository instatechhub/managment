import React, { useState, useCallback, useEffect } from "react";
import "./Login.css";
import useAuthStore from "../../Store/AuthStore/AuthStore";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'; // Add Bootstrap Spinner (optional)

const Login = () => {
  const [email, setEmail] = useState(""); // Remove hardcoded values for prod
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuthStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleRedirect = useCallback(() => {
    if (token && user) {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  const validateForm = () => {
    if (!email || !password) {
      toast.warning("Please fill in both email and password.");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await login({ input: email, password });
      if (response?.data?.success) {
        toast.success("Login Successful!");
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard");
      } else {
        toast.error(response?.data?.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-wrapper">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden w-100" style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          {/* Left Section */}
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

          {/* Right Section */}
          <div className="col-md-6 p-5 animate-slide-in-right">
            <h3 className="mb-4">
              <strong>Insta</strong> <span className="text-danger">Connects</span>
            </h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-required="true"
                />
                <div className="text-end mt-1">
                  <a href="#" className="text-decoration-none custom-dark-blue small">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 mt-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                      role="status"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
