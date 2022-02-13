import { useState, useEffect } from "react";
import Mokit from "./components/Mokit.js";
import Kesto from "./components/Kesto.js";
import LoppusiivouksenValitsin from "./components/LoppusiivouksenValitsin.js";
import {Container, Button, TextField} from '@material-ui/core';
import PvmValitsin from "./components/PvmValitsin.js";
import VarausVahvistus from "./components/VarausVahvistus.js";

function App() {

  const alustavatMokit = [
    {
      nimi: "Kuukkeli",
      hinta: 150
    },
    {
      nimi: "Metso",
      hinta: 125
    },
    {
      nimi: "Kaakkuri",
      hinta: 99
    },
    {
      nimi: "Sikotauti",
      hinta: 50
    }
  ]

  const [mokit] = useState(alustavatMokit);
  const [naytaVaraus, setNaytaVaraus] = useState(false);
  const [valittuMokki, setValittu] = useState("");
  const [kesto, setKesto] = useState(1);
  const [siivous, setSiivous] = useState(false);
  const [nimi, setNimi] = useState("");
  const [onkoMokkiValittu, setOnkoMokkiValittu] = useState(false);
  const [valittuPvm, setValittuPvm] = useState(new Date());
  const [hinta, setHinta] = useState();

  const teeVaraus = () => {
    setNaytaVaraus(true);
  }

  const muunnaValittuPvm = () => {
    let kuukausi = valittuPvm.getMonth() + 1;
    let paiva = valittuPvm.getDate();
    let vuosi = valittuPvm.getFullYear();

    return paiva + "." + kuukausi + "." + vuosi;
  }

  useEffect(() => {
    let siivouksenHinta = 0;
    if(siivous) {
      siivouksenHinta = 100;
    }
    setHinta(kesto * valittuMokki.hinta + siivouksenHinta);
  }, [valittuMokki, kesto, siivous])

  return (

    <Container>
      <h1>Lomamökkivaraus</h1>
      <Mokit
        otsikko="Valitse mökki"
        mokit={mokit} 
        setValittu={setValittu} 
        setOnkoMokkiValittu={setOnkoMokkiValittu}
      />
      <br/>
      <Kesto 
        setKesto={setKesto} 
        kesto={kesto}
      />
      <PvmValitsin 
        valittuPvm={valittuPvm}
        setValittuPvm={setValittuPvm}
      />
      <LoppusiivouksenValitsin 
        checkboxArvo={setSiivous}
        checkboxNimi='Loppusiivous'
      />
      <TextField
        label="Varaajan nimi"
        placeholder="Etunimi Sukunimi"
        onChange={(e) => {setNimi(e.target.value)}}
        >
      </TextField><br/>
      <Button
        variant="contained"
        color="primary"
        onClick={ () => {teeVaraus()}}
        >Varaa mökki  
      </Button>

      {(hinta)
        ? <div className="alert alert-success">Kokonaishinta: {hinta}</div>
        : <div className="alert alert-warning">Loppuhinta ei ole vielä muodostunut</div>
      }

      <VarausVahvistus 
        muunnaValittuPvm={muunnaValittuPvm}
        nimi={nimi}
        kesto={kesto}
        hinta={hinta}
        siivous={siivous}
        valittuMokki={valittuMokki}
        onkoMokkiValittu={onkoMokkiValittu}
        naytaVaraus={naytaVaraus}
        setNaytaVaraus={setNaytaVaraus}
      />

    </Container>
  );
}

export default App;
