import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Grid, Paper, Button } from "@mui/material";

const Login = () => {
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
    });
  };

  return (
    <div>
      <Paper>
        <Typography variant="h1" component="div" gutterBottom>
          Register
        </Typography>
      </Paper>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isPending && <button>Submit</button>}
        {isPending && <button disabled>Registering user</button>}
      </form>
      {/* <h1>{firstName}</h1>
      <h1>{lastName}</h1>
      <h1>{email}</h1>
      <h1>{password}</h1> */}
    </div>
  );
};

export default Login;
