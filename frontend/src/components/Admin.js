import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [test, setTest] = useState(0);
  const fetchData = async () => {
    if (test == 0) {
      const response = await axios.get(
        `http://localhost:5000/api/customers/all`
      );
      const orderdata = await axios.get(`http://localhost:5000/api/orders/`);
      const productdata = await axios.get(
        `http://localhost:5000/api/products/`
      );
      setTest(1);
      setOrders(orderdata.data);
      setData(response.data);
      setProducts(productdata.data);
    } else {
      console.log("done");
    }
  };
  fetchData();

  return (
    <div>
      <div>
        <div>
          <h1>Active Accounts</h1>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>First</th>
              <th>Last</th>
              <th>Shipping Address</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => {
              return (
                <>
                  <tr class="active-row">
                    <td>{customer.id}</td>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <h1>Active Orders</h1>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Product ID</th>
              <th>Shipping Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => {
              return (
                <>
                  <tr class="active-row">
                    <td>{orders.id}</td>
                    <td>{orders.customer_id}</td>
                    <td>{orders.product_id}</td>
                    <td>{orders.shipping_address}</td>
                    <td>${orders.amount}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <h1>Products</h1>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <>
                  <tr class="active-row">
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.size}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
