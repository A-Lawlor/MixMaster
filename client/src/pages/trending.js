import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import "../css/trending.css"; 
import "bootstrap/dist/css/bootstrap.css";



const Record = (props) => (
  <tr style={{verticalAlign: "middle", fontSize: "1.5em"}}>
    <td style={{width:"250px"}}>{<img src={props.record.picture_url} className="drink_picture"  alt="Drink Pic" 
        style={{minHeight: "150px", minWidth: "120px", maxHeight: "150px", maxWidth: "120px"}}/>}</td>
    <td>{props.record.name}</td>
    <td>{props.record.by}</td>
    <td>{props.record.overall_ratings.length === 0 ? 'n/a' :
          props.record.overall_ratings.reduce((a, b) => a + b) / props.record.overall_ratings.length}</td>
    <td>{props.record.taste}</td>
    <td>{props.record.taste_ratings.length === 0 ? 'n/a' :
          props.record.taste_ratings.reduce((a, b) => a + b) / props.record.taste_ratings.length}</td>
    <td>
      <Button onClick={() => props.NavigateToDrink(props.record._id)} style={{backgroundColor: '#3EB3E7' }}>
        View Drink
      </Button>
    </td>
  </tr>
  // <Link className="btn btn-link" to={`//components/edit/${props.record._id}`}>Edit</Link> |
);


    
export default function RecordList() {

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
      // order records for overall rating
      var records_averages = [];
      records.forEach(record => {
        records_averages.push(record.overall_ratings.length === 0 ? {id: record._id, average: -1} :
          {id: record._id, average: record.overall_ratings.reduce((a, b) => a + b) / record.overall_ratings.length});
      });
      records_averages.sort((a, b) => parseFloat(b.average) - parseFloat(a.average));
      var ordered_records = [];
      records_averages.forEach(record => {
        records.forEach(base_record => {
          if(record.id === base_record._id) {
            ordered_records.push(base_record);
          }
        })
      });
      setRecords(ordered_records);
    }

    getRecords();

    return;
  }, [records.length]);

  const navigate = useNavigate();
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

    <div style={{ textAlign: 'center' , marginTop: '4vh'}}>
      <h3 className='trending_header'>Trending Drinks</h3>
          <div  className="record-list-container">
      
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Image</th>  
            <th>Drink Name</th>
            <th>Posted By</th>
            <th>Rating</th>
            <th>Taste</th>
            <th>Taste Level</th>
            <th>View Drink</th> 
          </tr>
        </thead>
        <tbody >{recordList()}</tbody>
      </table>
    </div>
    </div>
  );
}