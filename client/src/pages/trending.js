import React, { useEffect, useState } from 'react';
import { NavLink,Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Record = (props) => (
  <tr>
    <td>{props.record.image}</td>
    <td>{props.record.name}</td>
    <td>{props.record.liqour}</td>
    <td>{props.record.taste}</td>
    <td>{props.record.rating}</td>
    <td>{props.record.likes}</td>
    <td>{props.record.dislikes}</td>
    
    
    <td>
      
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
  //    <Link className="btn btn-link" to={`//components/edit/${props.record._id}`}>Edit</Link> |
);
    
export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://mix-master.herokuapp.com/drink`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
    
  // This method will delete a record
 async function deleteRecord(id) {
    await fetch("http://localhost:5005/drink/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id: id}),
    })
    .then((response) => {
    // Our handler throws an error if the request did not succeed.
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
    })
    .then(() => {
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
      return;
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  }
    
    // This method will map out the records on the table
    function recordList() {
      return records.map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            key={record._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
        <h3>Drink List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>image</th>
              <th>Drink Name</th>
              <th>Liquor</th>
              <th>Taste</th>
              <th>Rating</th>
              <th>likes</th>
              <th>dislikes</th>
              
              
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
    );
   }