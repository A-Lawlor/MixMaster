import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";

const Record = (props) => (
  <tr style={{verticalAlign: "middle", fontSize: "1.5em"}}>
    <td style={{width:"250px"}}>{<img src={props.record.picture_url} className="drink_picture"  alt="Drink Pic" 
        style={{height: "150px", maxWidth: "150px"}}/>}</td>
    <td>{props.record.name}</td>
    <td>{props.record.percent_weight*100}%</td>
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
  // <Link className="btn btn-link" to={`//components/edit/${props.record._id}`}>Edit</Link> |
);
    
export default function RecordList() {

  const user_drink_ing_array = localStorage.getItem('user_drink_ing_array');
  // Ensure user hit find ingredients with storage button
  const navigate = useNavigate();
  const handleNoLoginClose = () => {
      navigate("/");
  };

  // Parse user to drink ingredients array
  const user_drink_ing_arr_objs = JSON.parse(user_drink_ing_array);

  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(process.env.NODE_ENV === 'production' ? 'https://mix-master.herokuapp.com/drink' : 'http://localhost:5005/drink');
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      if(user_drink_ing_array != null) {
        records.map(function(record) {
          var result = user_drink_ing_arr_objs.find(item => item._id === record._id);
          record.percent_weight = result.percent_weight;
        });
        records.sort(function(a, b) {
          return parseFloat(b.percent_weight) - parseFloat(a.percent_weight);
        });
      }
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  function NavigateToDrink(id) {
    //navigate("/favoriteslist");
    navigate(`/drink/${id}`);
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
            <th>Image</th>  
            <th>Drink Name</th>
            <th>Ingredients Owned</th>
            <th>Taste</th>
            <th>Rating</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>View Drink</th> 
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
        <>
        <Modal show={user_drink_ing_array === null} onHide={handleNoLoginClose}>
            <Modal.Header closeButton>
            <Modal.Title>ERROR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You must access this page via the find drink with ingredients button on the storage page.
                <br></br>Closing this window will return you to the homepage!
            </Modal.Body>
        </Modal>
        </>
    </div>
  );
}