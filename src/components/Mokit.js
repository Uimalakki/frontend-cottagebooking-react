import { Select, MenuItem, InputLabel } from '@material-ui/core';

function Mokit(props) {

  return (
    <div>
      <InputLabel id="mokkien-valinta">Valitse mökki:</InputLabel>
      <Select
        defaultValue={""}
        labelId={props.otsikko}
        id="mokkien-valinta"
        onChange={(e) => {
          props.setValittuMokki(e.target.value);
          props.setOnkoMokkiValittu(true)
        }}
      >
        {props.mokit.map((mokki) => {
          return (
            <MenuItem
              key={mokki.id}
              value={mokki}>
              {mokki.name} {mokki.price}e/yö
            </MenuItem>
          )
        })}

      </Select>
    </div>

  )

}

export default Mokit;