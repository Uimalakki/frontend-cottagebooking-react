import { FormControlLabel, Checkbox } from '@material-ui/core';

function CheckboxSelector(props) {

  return (
    <div>
      <FormControlLabel
        control={<Checkbox onChange={(e) => { props.checkboxArvo(e.target.checked) }}/>}
        label={props.checkboxNimi}
      />
    </div>
  )
}

export default CheckboxSelector;