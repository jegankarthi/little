import "./Allpages.css"
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';

 export default function Deposit(){
   
  let [currbalance, setCurrbalance] = useState();
  let [deposit, setDeposit] = useState('');
  let [accountid, setAccountid] = useState();
  let [accountname, setAccountname] = useState();
 
 

  async function handleSubmit(e) {
    e.preventDefault();
    if (deposit === " ") {
      alert("Please enter an amount");
    } else if (isNaN(deposit)) {
      setDeposit("");
      alert("Please enter amount in number");
    } else if (Number(deposit) < 1) {
      setDeposit("");
      alert("Please enter a positive amount");
    } else {
      
        const res = await axios(`${url}`);
        const result = res.data;
        if (result){
          updateproducts();
          setAccountid("");
          setDeposit("");
        }
     
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
    let Total = Number(currbalance) + Number(deposit);
    setCurrbalance(Total);
    alert(`$${deposit} amount deposited successfully`);

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
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <h3>DEPOSIT</h3>
          <hr/>
       <h6>Account Holder : {accountname}</h6> 
        <hr/>
        <h5>Balance: {currbalance}</h5>
        <hr/>
        
        <input  placeholder='Enter the id' onChange={(e) => setAccountid(e.target.value)} />
          <input type="number" placeholder= 'Enter the Amount'  onChange={(e) => setDeposit(e.target.value)} />
          <button type="submit"  value="Deposit" disabled={!(deposit)} >Deposit</button>
        </form>
      </center>
    </Card>
    </div>
    </div>
  );
}
