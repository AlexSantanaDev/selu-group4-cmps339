import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("http://localhost:5000/api/customers").then((res) => {
      console.log(res.data);
    });
  });

  async function makeRequest() {
    const config = {
      method: "get",
      url: "http://localhost:5000/api/customers",
      headers: { "Access-Control-Allow-Origin": "*" },
    };

    let res = await axios(config);

    console.log(res.data);
  }

  // axios.get("http://localhost:5000/api/customers").then((response) => {
  //   console.log(response);
  // });

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
