import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import fiLocale from "date-fns/locale/fi";
import { TextField } from "@material-ui/core";

function DateSelector(props) {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
        <DatePicker 
          value={props.valittuPvm} 
          format="dd/MM/yyyy"
          label="Aloituspvm"
          disablePast={true}
          onChange={props.setValittuPvm}
          renderInput={(props) => <TextField {...props} />}
          />
      </MuiPickersUtilsProvider>
    )
}

export default DateSelector;

