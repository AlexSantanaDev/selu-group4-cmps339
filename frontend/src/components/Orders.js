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
  const [testMoney, setTestMoney] = useState(Number);

  //order states

  const [orderPrice, setOrderPrice] = useState("");
  const [oldOrder, setOldOrder] = useState(Number);
  const [orderTotal, setOrderTotal] = useState(Number);
  const [orderData, setOrderData] = useState([]);
  const [orderCart, setOrderCart] = useState();

  //menu
  const [menuId, setMenuId] = useState([]);
  const [menuName, setMenuName] = useState([]);
  const [menu, setMenu] = useState([]);
  const [idInCart, setIdInCart] = useState([]);
  const [tax, setTax] = useState(Number);
  const [amountBeforeTax, setAmountBeforeTax] = useState(Number);
  const [checkCart, setCheckCart] = useState(false);

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
      const ordersPlease = await axios.get(
        `http://localhost:5000/api/customers/me/myOrders/${idNumber}`
      );
      setOrderCart(ordersPlease.data);
      console.log(orderCart);
      // const info = await axios.get(
      //   `http://localhost:5000/api/products/me/${productId}`
      // );
      // console.log(info.data);
      // const { name, size } = info.data[0];
      // setProduct(name);
      // setSize(size);
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
    setTestMoney(testMoney + tax);
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

  const showForm = () => {
    const getProduct = async () => {
      const response = await axios.get(`http://localhost:5000/api/products/`);
      setOrderData(response.data);
      console.log(response.data);
    };
    getProduct();
    if (form) {
      setForm(false);
    } else {
      setForm(true);
    }
  };

  // const showMenu = (e) => {
  //   e.preventDefault();
  //   setMenu([e.target.value, ...menu]);
  //   console.log(menu);
  // };
  const addProduct = (e) => {
    e.preventDefault();
    setCheckCart(true);
    setAmountBeforeTax(parseFloat(testMoney) + parseFloat(e.target.value));

    // setPleaseWork(...pleaseWork, {
    //   id: e.target.id,
    //   name: document.getElementById(e.target.id).innerHTML,
    // });

    const newId = [...idInCart];
    newId.push(e.target.id);
    setIdInCart(newId);
    console.log(idInCart);

    const newMenu = [...menu];
    newMenu.push({
      id: e.target.id,
      name: document.getElementById(e.target.id).innerHTML,
      price: e.target.value,
    });
    setMenu(newMenu);
    setMenuId([...menuId, e.target.id]);
    setMenuName([...menuName, document.getElementById(e.target.id).innerHTML]);
    const newTax = e.target.value * 0.1;
    setTestMoney(parseFloat(testMoney) + parseFloat(e.target.value));

    setTax(parseFloat(tax + newTax));
    console.log(menu);
  };

  // setOrderId(response.data.id);
  // console.log(orderId);
  // };

  // const urlParams = new URLSearchParams(queryString);

  const clearCart = (e) => {};

  return (
    <div>
      <div className="contain">
        <div className="user">
          <h1>
            Welcome, {firstName} {lastName}
          </h1>

          <h4>{email}</h4>
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
          {/* <label className="orderlabel">I would like a </label>
          <select
            className="orderselect"
            value={makeOrder}
            onChange={(e) => setMakeOrder(e.target.value)}
          >
            <option id="1" value="Small Chocolate Milk">
              Small Chocolate Milk
            </option>
            <option id="2" value="Medium Chocolate Milk">
              Medium Chocolate Milk
            </option>
            <option id="3" value="Large Chocolate Milk">
              Large Chocolate Milk
            </option>
          </select>
          <button onClick={showMenu}>Add another drink?</button> */}
          {orderData.map((product) => {
            return (
              <>
                <button
                  className="orderbutton-products"
                  value={product.Price}
                  id={product.id}
                  onClick={addProduct}
                >
                  {product.name}
                </button>
              </>
            );
          })}
          {menuName.map((name) => {
            return (
              <>
                <h3 className="orderbutton-products-menu"> {name} </h3>;
              </>
            );
          })}
          <h4>Amount: ${testMoney} </h4>+<h2>Sales Tax: ${tax}</h2>
          <button>Done!</button>
          {checkCart && <button onClick={clearCart}>Restart?</button>}
        </form>
      )}
      {test && <h4>No active Orders</h4>}
      {product && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Shipping Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="active-row">
              <td>{orderId}</td>
              <td>{address}</td>
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
