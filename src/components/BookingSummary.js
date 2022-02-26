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
    <Dialog open={props.showBooking} fullWidth={true}>
      <DialogTitle>Cottage booking summary</DialogTitle>
      <DialogContent>
        {(props.isCottageChosen)
          ? <DialogContentText>
            <div>Booker name: {props.nameOfBooker}</div>
            <div>Cottage name: {props.chosenCottage.name}</div>
            <div>Start date: {props.transformDateFormat()}</div>
            <div>Length of stay: {props.lengthOfStay} day(s)</div>
            <div>Total price: {props.priceOfBooking} euros</div>
            <div>Cleaning: {isThereCleaning(props.cleaning)}</div>
          </DialogContentText>
          : <DialogContentText>
            <div>Cottage hasn't been chosen</div>
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => {
                          props.showBookingSummary(false);
                         }}
          >Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { 
                            props.showBookingSummary(false);
                            props.emptyFormFields();
                            props.createBooking();
                         }}
        >Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BookingSummary 