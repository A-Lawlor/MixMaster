import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import "../css/profile.css"; 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";

const divStyle = {
    backgroundImage: 'url(../../Favorites.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#7f00c9',
    width: '100%',
    height: '100%',
    paddingTop: '8vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    overflow: 'auto'
};

const Record = (props) => (
  <tr style={{verticalAlign: "middle", fontSize: "1.5em"}}>
    <td style={{width:"250px"}}>{<img src={props.record.picture_url} className="drink_picture"  alt="Drink Pic" 
        style={{minHeight: "150px", minWidth: "120px", maxHeight: "150px", maxWidth: "120px"}}/>}</td>
    <td>{props.record.name}</td>
    <td>{props.record.by}</td>
    <td>{props.record.taste}</td>
    <td>
      <Button onClick={() => props.NavigateToDrink(props.record._id)}>
        View Drink
      </Button>
    </td>
  </tr>
  // <Link className="btn btn-link" to={`//components/edit/${props.record._id}`}>Edit</Link> |
);
    
export default function FavoritesList() {

  // This method fetches the user's info used to query db from the client storage.
  const loggedIn = localStorage.getItem('logged_in');
  const username = localStorage.getItem('username');
  // Ensure user is signed in
  const navigate = useNavigate();
  const handleNoLoginClose = () => {
      navigate("/");
  };

  // This method fetches the user's favorites list from the database.
  const [favoritesList, setFavoritesList] = useState(null);
  useEffect(() => {
      async function getFavoritesList() {
          const fetch_string = process.env.NODE_ENV === 'production' ?
                         'https://mix-master.herokuapp.com/user/retrieve_storage/'+username : 
                         'http://localhost:5005/user/retrieve_storage/'+username;
          const response = await fetch(fetch_string);
          if (!response.ok) {
              const message = `An error occurred: ${response.statusText}`;
              window.alert(message);
              return;
          }
          const users_info = await response.json();
          setFavoritesList(users_info.favorites_list);
      }
      getFavoritesList();
      return;
  }, []);

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
      if(favoritesList != null)
        if(favoritesList.includes(record._id)) {
          return (
            <Record
              record={record}
              NavigateToDrink={NavigateToDrink}
              key={record._id}
            />
          );
        }
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div style={divStyle}>
      <h3 className='trending_header' style={{backgroundColor: 'rgba(163, 141, 0, .8)'}}>Your Favorites List!</h3>
      <div className="record-list-container" style={{backgroundColor: 'rgba(255, 226, 38, .8)', width:"70vw"}}>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Image</th>  
            <th>Drink Name</th>
            <th>By</th>
            <th>Taste</th>
            <th>View Drink</th> 
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
      </div>
      <>
        <Modal show={loggedIn === null} onHide={handleNoLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title>ERROR</Modal.Title>
          </Modal.Header>
          <Modal.Body>You must be logged in to access the favorites list page.<br></br>Closing this window will return you to the homepage!</Modal.Body>
        </Modal>
      </>
    </div>
  );
}