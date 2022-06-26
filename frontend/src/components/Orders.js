import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [money, setMoney] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setshippingAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  let { postId } = useParams();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/customers/me/orders/1")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // const handleClick = () => {
  //   const response = axios.get(
  //     `http://localhost:5000/api/customers/me/orders/${postId}`
  //   );
  //   setOrderId(response.data.id);
  //   console.log(response.data.id);
  //   console.log(response.data.customerid);

  //   setOrderId(response.data.id);
  //   console.log(orderId);
  // };
  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/customers/me/orders/${postId}`
    );
    // console.log(response.data[0][0].shipping_address);
    // console.log(response.data[0][0].address);
    console.log(response.data[1][0]);

    const { shipping_address, amount, customer_id, id, product_id } =
      response.data[0][0];

    setOrderId(id);
    setCustomerId(customer_id);
    setProductId(product_id);
    setMoney(amount);
    setshippingAddress(shipping_address);

    const { first_name, last_name, address, email } = response.data[1][0];

    setFirstName(first_name);
    setLastName(last_name);
    setAddress(address);
    setEmail(email);
  };
  fetchData();

  // setOrderId(response.data.id);
  // console.log(orderId);
  // };

  // const urlParams = new URLSearchParams(queryString);

  return (
    <div>
      <div>
        <h1>User info</h1>
        <h1>
          {firstName} {lastName}
        </h1>
        <h1>{address}</h1>
        <h1>{email}</h1>
      </div>
      <h4>Customer ID - {customerId}</h4>
      <h4>Order ID - {orderId}</h4>
      <h4>Product ID - {productId}</h4>
      <h4>Shipping Address - {shippingAddress}</h4>
      <h4>Order ID -{orderId}</h4>
    </div>
  );
};

export default Orders;
