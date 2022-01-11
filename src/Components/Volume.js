import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function Volume({volume, player}) {
  const [value, setValue] = React.useState(volume);

  const handleChange = (event, newValue) => {
    player.setVolume(newValue*0.01)
    setValue(newValue);
  };
  
  return (
    <Box sx={{ marginRight:"15px" ,color: "rgb(150, 150, 150)", width: "120px" }}>
      <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
	  <VolumeUp />
        <Slider aria-label="Volume" value={value} sx={{color: "rgb(150, 150, 150)"}} onChange={handleChange} />
      </Stack>
    </Box>
  );
}
