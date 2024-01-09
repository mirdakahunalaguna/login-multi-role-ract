import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  // State Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  // UseEffect Hook
  useEffect(() => {
    // Redirect to the dashboard if the user is logged in or login is successful
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    // Reset the authentication state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, dispatch, navigate]);
  // Login Function
  const Auth = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Dispatch the login action with user credentials
    dispatch(LoginUser({ email, password }));
  };

  // JSX Structure
  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {/* Display error message if isError is true */}
                {isError && <p className="has-text-centered">{message}</p>}

                {/* Title */}
                <h1 className="title is-2">Sign In</h1>

                {/* Email Input */}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
