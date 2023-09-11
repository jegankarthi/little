import "./Allpages.css"
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Withdraw() {
  let [currbalance, setCurrbalance] = useState();
  let [withdraw, setWithdraw] = useState();
  let [accountid, setAccountid] = useState();
  let [accountname, setAccountname] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (withdraw === " ") {
      alert("Please enter an amount");
    } else if (isNaN(withdraw)) {
      setWithdraw("");
      alert("Please enter amount in number");
    } else if (Number(withdraw) > currbalance) {
      setWithdraw("");
      alert("Insufficient funds. Please enter an amount less than or equal to your current balance.");
    }
     else if (Number(withdraw) < 1) {
      setWithdraw("");
      alert("Please enter a positive amount");
    }
    else {
      updateproducts();
      setWithdraw("");
      setAccountid("");
      }
  }

let url = `http://localhost:1337/api/bad-banks/${accountid}`;

  useEffect(() => {
    async function fetchdata() {
      let res = await axios(`${url}`);
      let result = res.data;

      setCurrbalance(result.data.attributes.Balance);
      setAccountname(result.data.attributes.Name);

      console.log(currbalance);
    }
    if (accountid) {
      fetchdata();
    }
  }, [url, accountid, currbalance]);

  const updateproducts = async () => {
    let Total = Number(currbalance) - Number(withdraw);
    setCurrbalance(Total);
    alert(`$${withdraw} amount withdrawed successfully`);

    let update = {
      data: {
        Balance: Total,
      },
    };

    const updatebalance = await axios.put(`${url}`, update);
    console.log(updatebalance);
  };
  return (
    <div className="color" >
      
      <div className="login">
    <Card className="form">
      <center>
        <form onSubmit={handleSubmit}>
          <h3>WITHDRAW</h3>
          <hr/>
          <h6>Account Holder : {accountname}</h6> 
        <hr/>
        <h5>Balance: {currbalance}</h5>
        <hr/>
        <input  placeholder='Enter the id' onChange={(e) => setAccountid(e.target.value)} />
          <input type="number" placeholder= 'Enter the Amount' onChange={(e) => setWithdraw(e.target.value)} />
          <button type="submit"  value="Withdraw" >Withdraw</button>
        </form>
      </center>
    </Card>
    </div>
    </div>
  );
}
