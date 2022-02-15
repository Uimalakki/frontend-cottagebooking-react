import {Slider, Typography} from '@material-ui/core';

function Kesto(props) {

    const handleChange = (event, uusiKesto) => {
        props.setKesto(uusiKesto);
    };

    return (
            <div>
                <Typography id="range-slider" gutterBottom>
                    Valitse kesto:
                </Typography>
                <Slider     
                    valueLabelDisplay="auto"
                    value={props.kesto}
                    min={1}
                    max={14}
                    onChange={handleChange}    
                />

            </div>
           )
}

export default Kesto;