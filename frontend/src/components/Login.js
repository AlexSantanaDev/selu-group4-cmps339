import React, { Component, useState } from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import axios from "axios";

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
      <Paper>
        <Typography variant="h1" component="div" gutterBottom>
          Login
        </Typography>
      </Paper>
      <form
        action="http://someotherserver.com"
        method="post"
        onSubmit={handleSubmit}
      >
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
    </div>
  );
};

export default Login;
