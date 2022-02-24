import { Select, MenuItem, InputLabel, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react'
import cottagesService from '../services/mokit'

function CottageSelect(props) {

  const [isCottagesData, setIsCottagesData] = useState(false);
  const [cottages, setCottages] = useState([]);

  useEffect(() => {
    cottagesService
      .haeKaikki()
      .then(data => 
        setCottages(data)
      )
      setIsCottagesData(true)
  }, []);

  return (
    <div>
      {isCottagesData 
      ? 
        <div>
          <InputLabel id="cottage-selection">{props.selectTitle}</InputLabel>
          <Select
            defaultValue={""}
            labelId={props.selectTitle}
            id="cottage-selection"
            onChange={(e) => {
              props.chooseCottage(e.target.value);
              props.setIsCottageChosen(true)
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
      : 
        <CircularProgress color="inherit" />
      }  
    </div>
  )
}

export default CottageSelect;