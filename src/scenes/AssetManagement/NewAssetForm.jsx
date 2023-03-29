import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from '@mui/material/Select';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const NewAssetForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
       <Box m="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="10px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

              {/*  Asset ID*/}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetId}
                name="assetId"
                error={!!touched.assetId && !!errors.assetId}
                helperText={touched.assetId && errors.assetId}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Serial No */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Serial No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serialNo}
                name="serialNo"
                error={!!touched.serialNo && !!errors.serialNo}
                helperText={touched.serialNo && errors.serialNo}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Asset name */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.assetName}
                name="assetName"
                error={!!touched.assetName && !!errors.assetName}
                helperText={touched.assetName && errors.assetName}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Location */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} >
                <InputLabel>Location* </InputLabel>
                <Select label="Location" >
                  <MenuItem value="Assigned" >Chennai</MenuItem>
                  <MenuItem value="Not Assigned">Salem</MenuItem>
                </Select>
              </FormControl>

              {/* Description */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} >
                <InputLabel>Classification* </InputLabel>
                <Select label="Description" >
                  <MenuItem value="Assigned" >Mouse</MenuItem>
                  <MenuItem value="Not Assigned">Laptop</MenuItem>
                  <MenuItem value="Not Assigned">Keyboard</MenuItem>
                  <MenuItem value="Not Assigned">Laptop Stand</MenuItem>
                </Select>
              </FormControl>

              {/* Description */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} >
                <textarea
                  style={{ border: "1px solid #C2C2C2", borderRadius: "3px" }}
                  aria-label="empty textarea"
                  placeholder="Description"
                  rows="3" cols="40"
                />
              </FormControl>

              {/* Classification */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} >
                <InputLabel>Brand* </InputLabel>
                <Select label="Classification" >
                  <MenuItem value="Assigned" >Lenovo</MenuItem>
                  <MenuItem value="Not Assigned">Dell</MenuItem>
                  <MenuItem value="Not Assigned">Zebronics</MenuItem>
                  <MenuItem value="Not Assigned">Asus</MenuItem>
                </Select>
              </FormControl>

              {/* Purchase Date */}
              <FormControl sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Purchase Date"
                  />
                </LocalizationProvider>
              </FormControl>

              {/* Current Stage */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }} >
                <InputLabel>Current Stage* </InputLabel>
                <Select label="Current Stage" >
                  <MenuItem value="Assigned" >Assigned</MenuItem>
                  <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                </Select>
              </FormControl>

              {/* Warrenty Expire */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Warrenty Expire"
                  // slotProps={{
                  //   textField: {
                  //     helperText: 'MM / DD / YYYY',
                  //   },
                  // }}
                  />
                </LocalizationProvider>
              </FormControl>

              {/* Specification */}
              {/* <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <fieldset style={{ display: "flex" }}>
                  <legend>Specifications</legend>
                  <TextField
                    style={{ marginRight: "8px" }}
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Characteristics"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.serialNo}
                    name="serialNo"
                    error={!!touched.serialNo && !!errors.serialNo}
                    helperText={touched.serialNo && errors.serialNo}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Details"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.serialNo}
                    name="serialNo"
                    error={!!touched.serialNo && !!errors.serialNo}
                    helperText={touched.serialNo && errors.serialNo}
                  />
                </fieldset>
              </FormControl> */}
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <div style={{ display: "flex" }}>
                  <TextField
                    style={{ marginRight: "8px" }}
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Specification"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.serialNo}
                    name="serialNo"
                    error={!!touched.serialNo && !!errors.serialNo}
                    helperText={touched.serialNo && errors.serialNo}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Details"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.serialNo}
                    name="serialNo"
                    error={!!touched.serialNo && !!errors.serialNo}
                    helperText={touched.serialNo && errors.serialNo}
                  />
                </div>
              </FormControl>

              {/* Next Maintenance */}
              <FormControl sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Next Maintenance"
                    slotProps={{
                      textField: {
                        helperText: 'MM / DD / YYYY',
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>

              {/* Attachement */}
              <FormControl sx={{ gridColumn: "span 2" }}>
             
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <input 
                  id="upload-photo"
                  name="upload-photo"
                  type="file" />
              </FormControl>

            </Box>
            {/* <Box display="flex" justifyContent="end" mt="20px" gap={1}>
            <Button type="submit" color="secondary" variant='contained'>
                Add Asset
              </Button>
              <Button type="submit" color="primary" variant='outlined'>
                Cancel
              </Button>
            </Box> */}
          </form>
        )}
      </Formik>
    </Box>
    </>
  )
}

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  assetId: yup.string().required("Required"),
  serialNo: yup.string().required("Required"),
  assetName: yup.string().required("Required"),
  location: yup.string().email("invalid location").required("Required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  address1: yup.string().required("Required"),
  address2: yup.string().required("Required"),
});
const initialValues = {
  assetId: "",
  serialNo: "",
  assetName: "",
  location: "Salem",
  address1: "",
  address2: "",
};

export default NewAssetForm;