import { useState } from "react"
import "./create.css"
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useEffect } from "react";

export default function Create() {

  const [accountId, setAccountId] = useState();
  const [data, setData] = useState()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [block, setBlock] = useState({ display: "none" });
  const [none, setNone] = useState({ display: "block" });

  useEffect(() => {
    async function fetchData() {
      let res = await axios("http://localhost:1337/api/bad-banks");
      let result = res.data;
      setData(result);
    }
    fetchData();

    let customerId =
      data &&
      data.data &&
      data.data.map((item, key) => {
        let strapiID = String(item.id);
        return strapiID;
      });

    if (customerId) {
      setAccountId(customerId?.slice(-1));
    }
  }, [data]);

  function validateForm() {
    let errors = {};

    if (name.trim() === "") {
      errors.name = "Enter your name.";
    }
    if (email.trim() === "") {
      errors.email = "Enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address.";
    }
    if (password.trim() === "") {
      errors.password = "Enter your password.";
    } else if (password.length < 8) {
      errors.password = "Please enter a password minimum of 8 characters.";
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return false;
    } else {
      return true;
    }
  }

  async function handle(e) {
    e.preventDefault();
    if (validateForm()) {
      const existingEmail = data?.data?.find(
        (item) => item.attributes.Email === email
      );
      if (existingEmail) {
        alert("Email already exists.");
      } else {
        await postProducts();
        alert("Your Account Created successfully.");
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
        setBlock({ display: "block" });
        setNone({ display: "none" });
      }
    }
  }

  const postProducts = async () => {
    let post = {
      data: {
        Name: name,
        Email: email,
        Password: password,
        Balance: 0,
      },
    };

    const res = await axios.post("http://localhost:1337/api/bad-banks", post);
    console.log(`successfully posted data${res.data.data}`);
  };

  return (
    <>
      <div className="color">
        <div className="login">
          <Card className="form">
            <form onSubmit={(e) => { handle(e) }} style={none}>
              <span>CREATE ACCOUNT</span>
              <hr />

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="form-control inp_text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {errors.name && <i className="error">{errors.name}</i>}

              <input
                type="email"
                name="email"
                placeholder="Enter email id"
                className="form-control inp_text"
                id="email"

                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {errors.email && <i className="error">{errors.email}</i>}

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                maxlength="12" minLength="8"
                value={password}
              />
              {errors.password && <i className="error">{errors.password}</i>}

              <button type="submit" disabled={!(password)} style={none} >Create Account</button><br /><br />

            </form>

            <div style={block}>
              <h3>{`Account ID:${accountId}`}</h3>
              <button type="submit" className="btn" id="button" onClick={() => { setNone({ display: "block" }); setBlock({ display: "none" }); }} >Add account</button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}