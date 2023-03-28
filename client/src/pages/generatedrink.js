import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/generatedrink.css';

//Import for Liqour images
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
  

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      {!showButtons && (
      <Row className="justify-content-center align-items-center" style={{ marginTop: '20vh', opacity: showButtons ? 0 : 1 }}>
        <Col id="generate_text" className="text-center text-white">
          Select Type of Liqour
        </Col>
      </Row>
      )}
      {!showButtons && (
        <Row className="justify-content-center align-items-center" style={{transition: 'all 0.5s ease', opacity: showButtons ? 0 : 1 }}>
          <Col>
            <Button id="liqour_buttons" className="mb-3" onClick={() => handleGenerateDrinkClick("liqour_buttons_1")}>
            <img src={vodka} width="60" />
              Vodka
            </Button>
            <Button id="liqour_buttons" className="mb-3" onClick={() => handleGenerateDrinkClick("liqour_buttons_2")}>
            <img src={rum} width="60" />
              Rum
            </Button>
            <Button id="liqour_buttons" className="mb-3" onClick={() => handleGenerateDrinkClick("liqour_buttons_3")}>
            <img src={tequila} width="60" />
              Tequila
            </Button>
            <Button id="liqour_buttons" className="mb-3" onClick={() => handleGenerateDrinkClick("liqour_buttons_4")}>
            <img src={whiskey} width="60" />
              Whiskey
            </Button>
            <Button id="liqour_buttons" className="mb-3" onClick={() => handleGenerateDrinkClick("liqour_buttons_5")}>
            <img src={gin} width="60" />
              Gin
            </Button>
          </Col>
        </Row>
      )}
      {showButtons && (
        <Row className="justify-content-center align-items-center" style={{marginTop: '20vh', transition: 'all 0.5s ease', opacity: showButtons ? 1 : 0 }}>
          <Col>
            <Button id="liqour_buttons" className={`mb-3 ${selectedButton === "liqour_buttons_1" ? "d-block" : "d-none"}`}>
            <img src={vodka} width="60" />
              Vodka
            </Button>
            <Button id="liqour_buttons" className={`mb-3 ${selectedButton === "liqour_buttons_2" ? "d-block" : "d-none"}`}>
            <img src={rum} width="60" />
              Rum
            </Button>
            <Button id="liqour_buttons" className={`mb-3 ${selectedButton === "liqour_buttons_3" ? "d-block" : "d-none"}`}>
            <img src={tequila} width="60" />
             Tequila
            </Button>
            <Button id="liqour_buttons" className={`mb-3 ${selectedButton === "liqour_buttons_4" ? "d-block" : "d-none"}`}>
              <img src={whiskey} width="60" />
              Whiskey
            </Button>
            <Button id="liqour_buttons" className={`mb-3 ${selectedButton === "liqour_buttons_5" ? "d-block" : "d-none"}`}>
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
          <Button id="taste_buttons" className="mb-3" onClick={() => handleGenerateDrinkClickTaste("taste_button_1")}>
          <img src={sweet} width="60" />
            Sweet
          </Button>
          <Button id="taste_buttons" className="mb-3" onClick={() => handleGenerateDrinkClickTaste("taste_button_2")}>
          <img src={spicy} width="60" />
            Spicy
          </Button>
          <Button id="taste_buttons" className="mb-3" onClick={() => handleGenerateDrinkClickTaste("taste_button_3")}>
          <img src={sour} width="60" />
            Sour
          </Button>
          <Button id="taste_buttons" className="mb-3" onClick={() => handleGenerateDrinkClickTaste("taste_button_4")}>
          <img src={bitter} width="60" />
            Bitter
          </Button>
          <Button id="taste_buttons" className="mb-3" onClick={() => handleGenerateDrinkClickTaste("taste_button_5")} >
          <img src={salty} width="60" />
            Salty
          </Button>
        </Col>
      </Row>
        )}
        {showTasteButtons && (
        <Row className="justify-content-center align-items-center" style={{ transition: 'all 0.5s ease', opacity: showTasteButtons ? 1 : 0 }}>
          <Col>
            <Button id="taste_buttons" className={`mb-3 ${tasteSelectedButton === "taste_button_1" ? "d-block" : "d-none"}`}>
            <img src={sweet} width="60" />
              Sweet
            </Button>
            <Button id="taste_buttons" className={`mb-3 ${tasteSelectedButton === "taste_button_2" ? "d-block" : "d-none"}`}>
            <img src={spicy} width="60" />
             Spicy
            </Button>
            <Button id="taste_buttons" className={`mb-3 ${tasteSelectedButton === "taste_button_3" ? "d-block" : "d-none"}`}>
            <img src={sour} width="60" />
              Sour
            </Button>
            <Button id="taste_buttons" className={`mb-3 ${tasteSelectedButton === "taste_button_4" ? "d-block" : "d-none"}`}>
            <img src={bitter} width="60" />
              Bitter
            </Button>
            <Button id="taste_buttons" className={`mb-3 ${tasteSelectedButton === "taste_button_5" ? "d-block" : "d-none"}`}>
            <img src={salty} width="60" />
              Salty
            </Button>
          </Col>
        </Row>
        )}
        {showGenerateButton && (
        <Row className="justify-content-center align-items-center" style={{ transition: 'all 0.5s ease', opacity: showGenerateButton ? 1 : 0}}>
          <Col>
            <Button 
              style={{marginTop: '1vh', backgroundColor: '#3EB3E7'}} 
              size="lg"
              className="generate-button">
              Generate Drink
            </Button>
          </Col>
        </Row>
        )}
      </Container>
      );
    }

    export default Homepage;
