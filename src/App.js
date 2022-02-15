import { useState, useEffect } from "react";
import CottageSelect from "./components/CottageSelect.js";
import Kesto from "./components/Kesto.js";
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

  const teeVaraus = () => {
    setShowBooking(true);
  }

  const tyhjennaKentat = () => {
    setChosenCottage("");
    setCleaning(false);
    setName("");
    setChosenDate(new Date());
    setIsCottageChosen(false);
    setPrice(null);
  }

  const muunnaValittuPvm = () => {
    let kuukausi = chosenDate.getMonth() + 1;
    let paiva = chosenDate.getDate();
    let vuosi = chosenDate.getFullYear();

    return paiva + "." + kuukausi + "." + vuosi;
  }

  useEffect(() => { 
    let siivouksenHinta = 0;
    if(cleaning) {
      siivouksenHinta = 100;
    }
    setPrice(lengthOfStay * chosenCottage.price + siivouksenHinta);
  }, [chosenCottage, lengthOfStay, cleaning])

  useEffect(() => {
    if(isCottageChosen && name) {
      setShowBookButton(true)
    } else {
      setShowBookButton(false)
    }
  }, [isCottageChosen, name]);

  return (

    <Container>
      <h1>Lomamökin varaus</h1>
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
        onClick={ () => {teeVaraus()}}
        >Varaa mökki  
      </Button>

      {(price)
        ? <div className="alert alert-success">Kokonaishinta: {price}</div>
        : <div className="alert alert-warning">Loppuhinta ei ole vielä muodostunut</div>
      }

      <VarausVahvistus 
        muunnaValittuPvm={muunnaValittuPvm}
        nimi={name}
        kesto={lengthOfStay}
        hinta={price}
        siivous={cleaning}
        valittuMokki={chosenCottage}
        onkoMokkiValittu={isCottageChosen}
        naytaVaraus={showBooking}
        setNaytaVaraus={setShowBooking}
        tyhjennaKentat={tyhjennaKentat}
      />

    </Container>
  );
}

export default App;
