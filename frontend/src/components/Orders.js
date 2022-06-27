import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./orders.css";

const Orders = () => {
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [money, setMoney] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setshippingAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [test, setTest] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [form, setForm] = useState(false);
  const [makeOrder, setMakeOrder] = useState("1");
  const [testMoney, setTestMoney] = useState(5);

  let { postId } = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/customers/me/orders/${postId}`
    );
    // console.log(response.data[0][0].shipping_address);
    // console.log(response.data[0][0].address);
    const { id, first_name, last_name, address, email } = response.data[1][0];

    setFirstName(first_name);
    setLastName(last_name);
    setAddress(address);
    setEmail(email);
    setIdNumber(id);

    if (response.data[0][0]) {
      const { shipping_address, amount, customer_id, id, product_id } =
        response.data[0][0];

      setOrderId(id);
      setCustomerId(customer_id);
      setProductId(product_id);
      setMoney(amount);
      setshippingAddress(shipping_address);
    } else {
      setOrderId("NULL");
      setCustomerId("NULL");
      setProductId(false);
      setMoney("NULL");
      setshippingAddress("NULL");
      setTest(true);
    }
  };
  fetchData();

  const handleClick = async () => {
    if (!productId) {
      console.log("yes");
    } else {
      const info = await axios.get(
        `http://localhost:5000/api/products/me/${productId}`
      );
      console.log(info.data[0].name);
      const { name, size } = info.data[0];
      setProduct(name);
      setSize(size);
    }
  };

  const deleteOrder = async () => {
    const remove = await axios.delete(
      `http://localhost:5000/api/orders/${orderId}`
    );
    setProduct(false);
    console.log("deleted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = { idNumber, makeOrder, testMoney, address };
    fetch("http://localhost:5000/api/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }).then(() => {
      console.log("order added");
      window.location.replace(`/me/${idNumber}`);
    });
  };

  const showForm = async () => {
    setForm(true);
  };

  // setOrderId(response.data.id);
  // console.log(orderId);
  // };

  // const urlParams = new URLSearchParams(queryString);

  return (
    <div>
      <div className="contain">
        <div className="user">
          <h1>User info</h1>
          <h1>
            {firstName} {lastName}
          </h1>
          <h1>{address}</h1>
          <h1>{email}</h1>
          <h4>Customer ID - {idNumber}</h4>
        </div>
      </div>
      <button className="orderbutton" onClick={handleClick}>
        Fetch Orders
      </button>
      <button className="orderbutton" onClick={showForm}>
        Make an Order
      </button>
      {form && (
        <form className="orderform" onSubmit={handleSubmit}>
          <label className="orderlabel">I would like a </label>
          <select
            className="orderselect"
            value={makeOrder}
            onChange={(e) => setMakeOrder(e.target.value)}
          >
            <option value="1">Sm Coffee</option>
            <option value="2">Md Coffee</option>
            <option value="3">Lg Coffee</option>
          </select>
          <button>Done!</button>
        </form>
      )}
      {test && <h4>No active Orders</h4>}
      {product && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Product</th>
              <th>Size</th>
              <th>Shipping Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="active-row">
              <td>{orderId}</td>
              <td>{product}</td>
              <td>{size}</td>
              <td>{shippingAddress}</td>
              <td>{money}</td>
            </tr>
          </tbody>
        </table>
      )}

      {product && (
        <button className="orderbutton" onClick={deleteOrder}>
          delete
        </button>
      )}
    </div>
  );
};

export default Orders;
