import { Select, MenuItem, InputLabel, CircularProgress, Backdrop } from '@material-ui/core';
import { useEffect, useState } from 'react'
import cottagesService from '../services/mokit'

function CottageSelect(props) {

  const [isCottagesData, setIsCottageData] = useState(false);
  const [cottages, setCottages] = useState([]);

  useEffect(() => {
    cottagesService
      .haeKaikki()
      .then(data => 
        setCottages(data)
      )
      setIsCottageData(true)
  }, []);

  return (
    <div>
      
       <InputLabel id="cottage-selection">{props.selectTitle}</InputLabel>
        <Select
          defaultValue={""}
          labelId={props.selectTitle}
          id="cottage-selection"
          onChange={(e) => {
            props.setValittuMokki(e.target.value);
            props.setOnkoMokkiValittu(true)
          }}
        >
          {cottages.map((cottage) => {
            return (
              <MenuItem
                key={cottage.id}
                value={cottage}>
                {cottage.name} {cottage.price}€/night
              </MenuItem>
            )
          })}
        </Select>
       
      
    </div>
  
  )

}

export default CottageSelect;