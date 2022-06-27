import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Grid, Paper, Button } from "@mui/material";
import "./register.css";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const info = { firstName, lastName, address, email, password };
    fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }).then(() => {
      console.log("new user added");
      setIsPending(false);
      window.location.replace(`/`);
    });
  };

  return (
    <div>
      <div className="container">
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div class="welcome">
              <LocalCafeIcon /> Register{" "}
            </div>
            <div class="subtitle">
              Before using our services you need to create an account.
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-fields">
                <input
                  className="input-line full-width"
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="input-line full-width"
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  className="input-line full-width"
                  placeholder="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <input
                  className="input-line full-width"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="input-line full-width"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isPending && (
                <button className="ghost-round full-width">Submit</button>
              )}
              {isPending && (
                <button className="ghost-round full-width" disabled>
                  Registering user
                </button>
              )}
            </form>
            {/* <h1>{firstName}</h1>
      <h1>{lastName}</h1>
      <h1>{email}</h1>
      <h1>{password}</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
