import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const register = () => {
    axios
      .post("http://tdos.kesug.com/backend/api/Register.php", {
        username,
        email,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
        toast.success(response.data.message);
        if (response.data.success) {
          navigate("/"); // Redirect after successful registration
        }
      })
      .catch((error) => console.error("Erreur lors de l'inscription:", error));
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Username{" "}
                        </label>
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <label className="form-label" htmlFor="form2Example22">
                        Password
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="*********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="button"
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          onClick={register}
                        >
                          Register
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">have an account?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                        >
                          <a href="/">Login</a>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">{message}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
