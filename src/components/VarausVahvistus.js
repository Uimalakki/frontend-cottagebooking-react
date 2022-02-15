import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import {Button} from '@material-ui/core';

function VarausVahvistus(props) {

  const onkoLoppusiivousta = (booleanArvo) => {
    if (booleanArvo) {
      return ("Kyllä");
    } else {
      return ("Ei");
    }
  }

  return (
    <Dialog open={props.naytaVaraus} fullWidth={true}>
      <DialogTitle>Mökin varausvahvistus</DialogTitle>
      <DialogContent>
        {(props.onkoMokkiValittu)
          ? <DialogContentText>
            <div>Varaajan nimi: {props.nimi}</div>
            <div>Mökin nimi: {props.valittuMokki.name}</div>
            <div>Alkamispäivämäärä: {props.muunnaValittuPvm()}</div>
            <div>Kesto: {props.kesto} päivää</div>
            <div>Kokonaishinta: {props.hinta} euroa</div>
            <div>Loppusiivous: {onkoLoppusiivousta(props.siivous)}</div>
          </DialogContentText>
          : <DialogContentText>
            <div>Mökkiä ei ole valittu!</div>
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { props.setNaytaVaraus(false);
                           props.tyhjennaKentat(); 
                         }}
        >Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VarausVahvistus 