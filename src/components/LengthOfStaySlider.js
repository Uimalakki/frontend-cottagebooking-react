import { Slider, Typography } from '@material-ui/core';

function LengthOfStaySlider(props) {

  const handleChange = (event, uusiKesto) => {
    props.setLength(uusiKesto);
  };

  return (
    <div>
      <Typography id="range-slider" gutterBottom>
        {props.sliderTitle}
      </Typography>
      <Slider
        valueLabelDisplay="auto"
        value={props.length}
        min={1}
        max={14}
        onChange={handleChange}
      />

    </div>
  )
}

export default LengthOfStaySlider;