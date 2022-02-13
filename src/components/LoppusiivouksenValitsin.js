import { FormControlLabel, Checkbox } from '@material-ui/core';

function LoppusiivouksenValitsin(props) {

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox onChange={(e) => { props.checkboxArvo(e.target.checked) }}/>
        }label={props.checkboxNimi}
      />
    </div>
  )
}

export default LoppusiivouksenValitsin;