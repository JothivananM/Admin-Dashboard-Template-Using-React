import { Label } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import useMediaQuery from "@mui/material/useMediaQuery";
import React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const AssignReAssign = (props) => {
  console.log(props.assign);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <>
      <form>
        <Box
          display="grid"
          paddingTop={1}
          gap="10px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >

          {
            !props.assign ? (
              <>
                <TextField
                  fullWidth
                  variant='outlined'
                  type="text"
                  label="Asset Name"
                  name='assetName'
                />

                <TextField
                  fullWidth
                  variant='outlined'
                  type="text"
                  label="Currently Assigned"
                  name='currentlyAssigned'
                />

                <FormControl>
                  <InputLabel>Reassign To* </InputLabel>
                  <Select label="reassignTo" >
                    <MenuItem value="john">John Doe</MenuItem>
                    <MenuItem value="alan">Alan Wake</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Assigned On"
                    />
                  </LocalizationProvider>
                </FormControl>

                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Reassigned On"
                    />
                  </LocalizationProvider>
                </FormControl>
              </>
            ) : (

              <>
                <TextField
                  fullWidth
                  variant='outlined'
                  type="text"
                  label="Asset Name"
                  name='assetName'
                />

                <FormControl>
                  <InputLabel>Assign To* </InputLabel>
                  <Select label="assignTo" >
                    <MenuItem value="john">John Doe</MenuItem>
                    <MenuItem value="alan">Alan Wake</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Assigned On"
                    />
                  </LocalizationProvider>
                </FormControl>
              </>
            )
          }



        </Box>
      </form>
    </>
  )
}

export default AssignReAssign;