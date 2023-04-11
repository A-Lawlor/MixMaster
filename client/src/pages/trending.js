import React, { useEffect, useState } from 'react';
import { NavLink,Link, useNavigate } from "react-router-dom";
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
      <Button onClick={() => props.NavigateToDrink(props.record._id)}>
        View Drink
      </Button>
    </td>
    
  </tr>
  //    <Link className="btn btn-link" to={`//components/edit/${props.record._id}`}>Edit</Link> |
);


    
export default function RecordList() {

  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      if((process.env.NODE_ENV === 'production')){
        console.log("In production");
    } else {
        console.log("Local Testing");
    }
    
    const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/drink' : 'http://localhost:5005/drink');
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
    
  const navigate = useNavigate();
  function NavigateToDrink(id) {
    navigate("/favoriteslist");
    //navigate(`/drink/${id}`);
  }
    
    // This method will map out the records on the table
    function recordList() {
      return records.map((record) => {
        return (
          <Record
            record={record}
            NavigateToDrink={NavigateToDrink}
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
              <th>View Drink</th> 
              
              
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
    );
   }
   
