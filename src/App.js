import { useState, useEffect } from "react";
import CottageSelect from "./components/CottageSelect.js";
import Kesto from "./components/Kesto.js";
import bookingService from "./services/bookings"
import LoppusiivouksenValitsin from "./components/LoppusiivouksenValitsin.js";
import {Container, Button, TextField} from '@material-ui/core';
import PvmValitsin from "./components/PvmValitsin.js";
import VarausVahvistus from "./components/VarausVahvistus.js";

function App() {

  const [showBooking, setShowBooking] = useState(false);
  const [chosenCottage, setChosenCottage] = useState("");
  const [lengthOfStay, setLengthOfStay] = useState(1);
  const [cleaning, setCleaning] = useState(false);
  const [name, setName] = useState("");
  const [isCottageChosen, setIsCottageChosen] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [price, setPrice] = useState(null);
  const [showBookButton, setShowBookButton] = useState(false)

  const makeReservation = () => {
    setShowBooking(true);
  }

  const emptyFormFields = () => {
    setChosenCottage("");
    setCleaning(false);
    setName("");
    setChosenDate(new Date());
    setIsCottageChosen(false);
    setPrice(null);
  }

  const transformDateFormat = () => {
    let month = chosenDate.getMonth() + 1;
    let day = chosenDate.getDate();
    let year = chosenDate.getFullYear();

    return day + "." + month + "." + year;
  }

  useEffect(() => { 
    let priceOfCleaning = 0;
    if(cleaning) {
      priceOfCleaning = 100;
    }
    setPrice(lengthOfStay * chosenCottage.price + priceOfCleaning);
  }, [chosenCottage, lengthOfStay, cleaning])

  useEffect(() => {
    if(isCottageChosen && name) {
      setShowBookButton(true)
    } else {
      setShowBookButton(false)
    }
  }, [isCottageChosen, name]);

  const addBooking = () => {

    const bookingObject = {
      name: name,
      price: price,
      cottage: chosenCottage.id,
      date: transformDateFormat(chosenDate)
    }

    bookingService
      .create(bookingObject)
      .then(returnedBooking => {
        console.log(returnedBooking)
      })
      
  }

  return (

    <Container>
      <h1>Cottage booking</h1>
      <CottageSelect
        selectTitle="Choose a cottage:"
        setValittuMokki={setChosenCottage} 
        setOnkoMokkiValittu={setIsCottageChosen}
      />
      <br/>
      <Kesto 
        setKesto={setLengthOfStay} 
        kesto={lengthOfStay}
      />
      <PvmValitsin 
        valittuPvm={chosenDate}
        setValittuPvm={setChosenDate}
      />
      <LoppusiivouksenValitsin 
        checkboxArvo={setCleaning}
        checkboxNimi='Loppusiivous'
      />
      <TextField
        label="Varaajan nimi"
        value={name}
        placeholder="Etunimi Sukunimi"
        onChange={(e) => {setName(e.target.value)}}
        >
      </TextField><br/>
      <Button
        variant="contained"
        color="primary"
        disabled={!showBookButton}
        onClick={ () => {makeReservation()}}
        >Book a cottage 
      </Button>

      {(price)
        ? <div className="alert alert-success">Total price: {price}</div>
        : <div className="alert alert-warning">Total price hasn't formed</div>
      }

      <VarausVahvistus 
        muunnaValittuPvm={transformDateFormat}
        nimi={name}
        kesto={lengthOfStay}
        hinta={price}
        siivous={cleaning}
        valittuMokki={chosenCottage}
        onkoMokkiValittu={isCottageChosen}
        naytaVaraus={showBooking}
        setNaytaVaraus={setShowBooking}
        tyhjennaKentat={emptyFormFields}
        createBooking={addBooking}
      />

    </Container>
  );
}

export default App;
