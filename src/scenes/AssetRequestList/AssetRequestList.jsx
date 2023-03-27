import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { field: "AssetName", headerName: "Asset Name", width: 125 },
  {
    field: "RequestDate",
    headerName: "Request Date",
    width: 150,
  },
  { field: "RequestType", headerName: "Request Type", width: 150 },
  { field: "AssignedDate", headerName: "Assigned Date", width: 150 },
  { field: "Description", headerName: "Description", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const handleEdit = () => {
        console.log(`Edit row ${params.row.id}`);
      };


      return (
        <>
          <Button color="primary" size="small" onClick={handleEdit}>
            <EditIcon />
          </Button>
        </>
      );
    },
  },
];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const AssetRequestList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  useEffect(() => {
    const fetchRows = async () => {
      const response = await axios.get(`${apiUrl}`);
      setRows(response.data);
    };
    fetchRows();
  }, []);

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleAddSubmit = async () => {
    const newRow = {
      brand: newBrand,
    };
    const response = await axios.post(`${apiUrl}`, newRow);
    setRows([...rows, response.data]);
    setOpenAddDialog(false);
    setNewBrand("");
  };

  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#6870fa", marginBottom: "10px" }}
            onClick={handleAddClick}
          >
            Add new Request
          </Button>

          <Box className="customMuiTable"
            m="10px 0 10px 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                "position": "relative",
                "zIndex": 2,
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <div style={{ height: 580, width: '100%', position: 'sticky', top: 0 }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </Box>


          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle>Add new Request</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Asset Name"
                type="text"
                placeholder="Auto Generated"
                fullWidth
                style={{ 'marginBottom': "10px" }}
              />

              <LocalizationProvider style={{ 'marginTop': "10px" }} dateAdapter={AdapterDayjs}>
                <DatePicker label="Request Date" />
              </LocalizationProvider>


              <FormControl fullWidth style={{ 'marginTop': "10px" }}>
                <InputLabel>Request Type</InputLabel>
                <Select label="Request Type">
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Exchange">Exchange</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth style={{ 'marginTop': "10px" }}>
                <InputLabel>Classification </InputLabel>
                <Select label="Classification"></Select>
              </FormControl>
              <h4>(or)</h4>
              <FormControl fullWidth >
                <InputLabel>Asset Assigned </InputLabel>
                <Select label="Asset ASsigned"></Select>
              </FormControl>
              <TextField autoFocus label="Description" type="text" fullWidth style={{ 'marginTop': "10px" }} />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleAddClose} >Cancel</Button>
              <Button onClick={handleAddSubmit} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default AssetRequestList;
