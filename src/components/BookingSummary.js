import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {Button} from '@material-ui/core';

function BookingSummary(props) {

  const isThereCleaning = (booleanValue) => {
    if (booleanValue) {
      return ("Yes");
    } else {
      return ("No");
    }
  }

  return (
    <Dialog open={props.naytaVaraus} fullWidth={true}>
      <DialogTitle>Cottage booking summary</DialogTitle>
      <DialogContent>
        {(props.onkoMokkiValittu)
          ? <DialogContentText>
            <div>Booker name: {props.nimi}</div>
            <div>Cottage name: {props.valittuMokki.name}</div>
            <div>Start date: {props.muunnaValittuPvm()}</div>
            <div>Length of stay: {props.kesto} day(s)</div>
            <div>Total price: {props.hinta} euros</div>
            <div>Cleaning: {isThereCleaning(props.siivous)}</div>
          </DialogContentText>
          : <DialogContentText>
            <div>Cottage hasn't been chosen</div>
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => {
                          props.setNaytaVaraus(false);
                         }}
          >Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { 
                            props.setNaytaVaraus(false);
                            props.tyhjennaKentat();
                            props.createBooking();
                         }}
        >Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BookingSummary 