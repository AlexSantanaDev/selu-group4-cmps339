import React, { Component, useState } from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import axios from "axios";
import "./Login.css";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const info = { email, password };

    // fetch("http://localhost:5000/api/customers/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(info),
    // }).then(() => {
    //   setIsPending(false);
    // });
    fetch("http://localhost:5000/api/customers/login", {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        // console.log(response);
        return response.text();
      })
      .then((info) => {
        const json = JSON.parse(info);
        // window.location.replace(`/`);
        // console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/customers/auth/${email}`
      );
      window.location.replace(`/me/${response.data[0].id}`);

      console.log(response.data[0].id);
    };
    fetchData();
  };
  return (
    <div>
      <div className="container">
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div className="welcome">
              <LocalCafeIcon />
              Login
            </div>
            <div class="subtitle">
              Please login to place and view your orders!
            </div>
            <form
              action="http://someotherserver.com"
              method="post"
              onSubmit={handleSubmit}
              className="login"
            >
              <div className="input-fields">
                <input
                  className="input-line full-width"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="input-line full-width"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                {!isPending && (
                  <button className="ghost-round full-width">Submit</button>
                )}
                {isPending && (
                  <button className="ghost-round full-width" disabled>
                    Registering user
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
