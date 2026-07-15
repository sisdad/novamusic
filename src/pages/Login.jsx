import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaMusic,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import "../styles/Login.css";
export default function Login() {
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Optional auto login
    // if(localStorage.getItem("token")){
    //     navigate("/admin");
    // }
  }, [navigate]);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await api.post(
        `/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">

        <div className="brand">

          <div className="logo-circle">
            <FaMusic />
          </div>

          <h1>Nova Music</h1>

          <p>
            Professional Music Management Platform
          </p>

        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Sign in to continue
          </p>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler}>

            <div className="input-box">

              <FaEnvelope className="icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={changeHandler}
                required
              />

            </div>

            <div className="input-box">

              <FaLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={changeHandler}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="login-options">

              <label>

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() =>
                    setRemember(!remember)
                  }
                />

                Remember me

              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

            <button
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          <div className="footer">
            © 2026 Nova Music Platform
          </div>

        </div>

      </div>

    </div>
  );
}