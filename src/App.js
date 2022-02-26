import { useState, useEffect } from "react";
import CottageSelect from "./components/CottageSelect.js";
import LengthOfStaySlider from "./components/LengthOfStaySlider.js";
import bookingService from "./services/bookings"
import CheckboxSelector from "./components/CheckboxSelector.js";
import { Container, Button, TextField } from '@material-ui/core';
import DateSelector from "./components/DateSelector.js";
import BookingSummary from "./components/BookingSummary.js";

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
        selectTitle='Choose a cottage:'
        chooseCottage={setChosenCottage} 
        setIsCottageChosen={setIsCottageChosen}
      />
      <br/>
      <LengthOfStaySlider 
        setLength={setLengthOfStay} 
        length={lengthOfStay}
        sliderTitle='The length of stay by days:'
      />
      <DateSelector 
        valittuPvm={chosenDate}
        setValittuPvm={setChosenDate}
      />
      <CheckboxSelector 
        checkboxArvo={setCleaning}
        checkboxNimi='Room cleaning'
      />
      <TextField
        label="Name of booker"
        value={name}
        placeholder="Firstname Lastname"
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

      <BookingSummary 
        transformDateFormat={transformDateFormat}
        nameOfBooker={name}
        lengthOfStay={lengthOfStay}
        priceOfBooking={price}
        cleaning={cleaning}
        chosenCottage={chosenCottage}
        isCottageChosen={isCottageChosen}
        showBooking={showBooking}
        showBookingSummary={setShowBooking}
        emptyFormFields={emptyFormFields}
        createBooking={addBooking}
      />

    </Container>
  );
}

export default App;
