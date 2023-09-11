import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Alldata() {
  const [data, setData] = useState();
  let url = "http://localhost:1337/api/bad-banks/";

  useEffect(() => {
    async function fetchdata() {
      let res = await axios(url);
      let result = res.data;
      setData(result);
    }
    fetchdata();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}${id}`);
      setData((prevData) => ({
        ...prevData,
        data: prevData.data.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="color">
        <div className="login">
          {data &&
            data.data &&
            data.data.map((item, key) => (
              <Card className="form" key={key}>
                <h3>ALLDATA</h3>
                <Card.Header>User account ID: {item.id} </Card.Header>
                <table>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{item.attributes.Name}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{item.attributes.Email}</td>
                    </tr>
                    <tr>
                      <td>Balance:</td>
                      <td>{item.attributes.Balance}</td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
