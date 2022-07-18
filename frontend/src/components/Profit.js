import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Select } from "@mui/material";
import "./Profit.css";

const Profit = () => {
  const [name, setName] = useState("Pick a product");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [option, setOption] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  const info = { name, startDate, endDate };

  const fetchData = async () => {
    fetch("http://localhost:5000/api/products/profit", {
      method: "POST",
      body: JSON.stringify(info),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((info) => {
        const json = JSON.parse(info);
        setData(json);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const switchProduct = (e) => {
    setName(e.target.value);
  };

  const getData = (e) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div class="login-box">
      <div>
        <select onChange={switchProduct}>
          <option>Select Product</option>
          <option id="1" value="Small Coffee">
            Small Coffee
          </option>
          <option id="2" value="Medium Coffee">
            Medium Coffee
          </option>
          <option id="2" value="Large Coffee">
            Large Coffee
          </option>
          <option id="2" value="Small Chocolate Milk">
            Small Chocolate Milk
          </option>
          <option id="2" value="Medium Chocolate Milk">
            Medium Chocolate Milk
          </option>
          <option id="2" value="Large Chocolate Milk">
            Large Chocolate Milk
          </option>
          <option id="2" value="Small Frosty">
            Small Frosty
          </option>
          <option id="2" value="Medium Frosty">
            Medium Frosty
          </option>
          <option id="2" value="Large Frosty">
            Large Frosty
          </option>
        </select>

        <form>
          <div className="user-box">
            <input
              placeholder="YYYY-MM-DD HH:mm:ss"
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <div className="user-box">
            <input
              placeholder="end date"
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>

          <a onClick={getData} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>
      {data.map((i) => {
        return <h1 className="tot">${i.total}</h1>;
      })}
    </div>
  );
};

export default Profit;
