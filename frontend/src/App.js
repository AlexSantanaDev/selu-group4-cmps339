import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const test = [];
  // useEffect(() => {
  //   const fetchData = async () =>{
  //     const response = await axios.get("http://localhost:5000/api/customers")
  //     setCustomers(response.data);
  //   }

  //   }, []);
  // }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <h1>{customers[2].id}</h1>
    </div>
  );
}

export default App;
