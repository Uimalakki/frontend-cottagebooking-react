import { Select, MenuItem, InputLabel } from '@material-ui/core';

function Mokit(props) {

    return (
        <div>
            <InputLabel id="mokkien-valinta">Valitse mökki:</InputLabel>
            <Select
                labelId={props.otsikko}
                id="mokkien-valinta"
                onChange={(e) => {props.setValittu(e.target.value); props.setOnkoMokkiValittu(true)}}
            >
                {props.mokit.map((mokki, idx) => {
                    return (
                        <MenuItem key={idx} value={mokki}>{mokki.nimi} {mokki.hinta}e/yö</MenuItem>
                    )
                })}
                
            </Select>
        </div>

    )

}

export default Mokit;