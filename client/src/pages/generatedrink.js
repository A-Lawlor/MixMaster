import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/generatedrink.css';

//Import for liquor images
import vodka from "../images/generate_drink_icons/Vodka.png";
import rum from "../images/generate_drink_icons/Rum.png";
import whiskey from "../images/generate_drink_icons/Whiskey.png";
import tequila from "../images/generate_drink_icons/Tequila.png";
import gin from "../images/generate_drink_icons/Gin.png";

//Import images for flavor
import sweet from "../images/generate_drink_icons/Sweet.png";
import spicy from "../images/generate_drink_icons/Spicy.png";
import sour from "../images/generate_drink_icons/Sour.png";
import bitter from "../images/generate_drink_icons/Bitter.png";
import salty from "../images/generate_drink_icons/Salty.png";

function Homepage() {
  const [showButtons, setShowButtons] = useState(false);
  const [showTasteButtons, setTasteShowButtons] = useState(true);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [tasteSelectedButton, setTasteSelectedButton] = useState(null);

  //Reset function to reset the buttons
  const reset = () => {
    setShowButtons(false);
    setTasteShowButtons(true);
    setShowGenerateButton(false);
    setSelectedButton(null);
    setTasteSelectedButton(null);
  };


  const handleGenerateDrinkClick = (buttonId) => {
    setShowButtons(true);
    setTasteShowButtons(false);
    setSelectedButton(buttonId);
  };

  const handleGenerateDrinkClickTaste = (buttonId) => {
    setTasteShowButtons(true);
    setShowGenerateButton(true);
    setTasteSelectedButton(buttonId);
  };
  

  const navigate = useNavigate();
  //Function to find a drink with the two attributes liquor and taste when generate drink button is clicked
  const handleGenerateDrink = () => {
    console.log("Generate Drink Clicked");
    console.log("Selected liquor Button:", selectedButton);
    console.log("Selected Taste Button:", tasteSelectedButton);
    fetch(`/drink/generatedrink/${selectedButton}/${tasteSelectedButton}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data:", data)
        if(data.error === "No Drink Found"){
          window.alert("No Drinks Found with Liquor and Taste Prefrence.");
        }
        //This code will redirect to the drink page which is drink/:id if there is a document with a specific id
        if(!data.error){
          navigate(`/drink/${data._id}`);
        }
      })
      .catch((error) => {      
        console.error('Error:', error);
      });
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center align-items-center" style={{ marginTop: "3vh" }}>
        <Col id="about_title" className= "text-center" md={12}>
        <h3 className='generate_header'>Generate Drink</h3>
        </Col>
      </Row>
      {!showButtons && (
      <Row className="justify-content-center align-items-center" style={{ marginTop: '5vh', opacity: showButtons ? 0 : 1 }}>
        <Col id="generate_text" className="text-center text-white">
          Select Type of liquor
        </Col>
      </Row>
      )}
      {!showButtons && (
        <Row className="justify-content-center align-items-center" style={{transition: 'all 0.5s ease', opacity: showButtons ? 0 : 1 }}>
          <Col>
            <Button className="liquor_buttons mb-3" onClick={() => handleGenerateDrinkClick("Vodka")}>
            <img src={vodka} width="60" />
              Vodka
            </Button>
            <Button className="liquor_buttons  mb-3" onClick={() => handleGenerateDrinkClick("Rum")}>
            <img src={rum} width="60" />
              Rum
            </Button>
            <Button className="liquor_buttons mb-3" onClick={() => handleGenerateDrinkClick("Tequila")}>
            <img src={tequila} width="60" />
              Tequila
            </Button>
            <Button className="liquor_buttons mb-3" onClick={() => handleGenerateDrinkClick("Whiskey")}>
            <img src={whiskey} width="60" />
              Whiskey
            </Button>
            <Button className="liquor_buttons mb-3" onClick={() => handleGenerateDrinkClick("Gin")}>
            <img src={gin} width="60" />
              Gin
            </Button>
          </Col>
        </Row>
      )}
      {showButtons && (
        <Row className="justify-content-center align-items-center" style={{marginTop: '5vh', transition: 'all 0.5s ease', opacity: showButtons ? 1 : 0 }}>
          <Col>
            <Button className={`liquor_buttons mb-3 ${selectedButton === "Vodka" ? "d-block" : "d-none"}`}>
            <img src={vodka} width="60" />
              Vodka
            </Button>
            <Button className={`liquor_buttons mb-3 ${selectedButton === "Rum" ? "d-block" : "d-none"}`}>
            <img src={rum} width="60" />
              Rum
            </Button>
            <Button className={`liquor_buttons mb-3 ${selectedButton === "Tequila" ? "d-block" : "d-none"}`}>
            <img src={tequila} width="60" />
             Tequila
            </Button>
            <Button className={`liquor_buttons mb-3 ${selectedButton === "Whiskey" ? "d-block" : "d-none"}`}>
              <img src={whiskey} width="60" />
              Whiskey
            </Button>
            <Button className={`liquor_buttons mb-3 ${selectedButton === "Gin" ? "d-block" : "d-none"}`}>
            <img src={gin} width="60" />
              Gin
            </Button>
          </Col>
        </Row>
        )}
        {!showTasteButtons && (
        <Row className="justify-content-center align-items-center" style={{opacity: showTasteButtons ? 0 : 1 }}>
          <Col id="generate_text" className="text-center text-white">
            Select Style of Drink
          </Col>
        </Row>
        )}
        {!showTasteButtons && (
        <Row className="justify-content-center align-items-center" style={{ transition: 'all 0.5s ease', opacity: showTasteButtons ? 0 : 1 }}>
        <Col>
          <Button className="taste_buttons mb-3" onClick={() => handleGenerateDrinkClickTaste("Sweet")}>
          <img src={sweet} width="60" />
            Sweet
          </Button>
          <Button className="taste_buttons mb-3" onClick={() => handleGenerateDrinkClickTaste("Spicy")}>
          <img src={spicy} width="60" />
            Spicy
          </Button>
          <Button className="taste_buttons mb-3" onClick={() => handleGenerateDrinkClickTaste("Sour")}>
          <img src={sour} width="60" />
            Sour
          </Button>
          <Button className="taste_buttons mb-3" onClick={() => handleGenerateDrinkClickTaste("Bitter")}>
          <img src={bitter} width="60" />
            Bitter
          </Button>
          <Button className="taste_buttons mb-3" onClick={() => handleGenerateDrinkClickTaste("Salty")} >
          <img src={salty} width="60" />
            Salty
          </Button>
        </Col>
      </Row>
        )}
        {showTasteButtons && (
        <Row className="justify-content-center align-items-center" style={{ transition: 'all 0.5s ease', opacity: showTasteButtons ? 1 : 0 }}>
          <Col>
            <Button className={`taste_buttons mb-3 ${tasteSelectedButton === "Sweet" ? "d-block" : "d-none"}`}>
            <img src={sweet} width="60" />
              Sweet
            </Button>
            <Button className={`taste_buttons mb-3 ${tasteSelectedButton === "Spicy" ? "d-block" : "d-none"}`}>
            <img src={spicy} width="60" />
             Spicy
            </Button>
            <Button className={`taste_buttons mb-3 ${tasteSelectedButton === "Sour" ? "d-block" : "d-none"}`}>
            <img src={sour} width="60" />
              Sour
            </Button>
            <Button className={`taste_buttons mb-3 ${tasteSelectedButton === "Bitter" ? "d-block" : "d-none"}`}>
            <img src={bitter} width="60" />
              Bitter
            </Button>
            <Button className={`taste_buttons mb-3 ${tasteSelectedButton === "Salty" ? "d-block" : "d-none"}`}>
            <img src={salty} width="60" />
              Salty
            </Button>
          </Col>
        </Row>
        )}
        {showGenerateButton && (
        <><Row className="justify-content-center align-items-center" style={{ transition: 'all 0.5s ease', opacity: showGenerateButton ? 1 : 0 }}>
          <Col>
            <Button
              style={{ marginTop: '1vh', backgroundColor: '#3EB3E7' }}
              size="lg"
              className="generate-button"
              onClick={handleGenerateDrink}>
              Generate Drink
            </Button>
          </Col>
        </Row><Row className="justify-content-center align-items-center" style={{ transition: 'all 0.5s ease', opacity: showGenerateButton ? 1 : 0 }}>
            <Col>
              <Button
                style={{ marginTop: '1vh', backgroundColor: 'rgb(108,117,125, 0.75)' }}
                size="lg"
                className="generate-button"
                onClick={reset}>
                Reset
              </Button>
            </Col>
          </Row></>
        )}
      </Container>
      );
    }

    export default Homepage;
