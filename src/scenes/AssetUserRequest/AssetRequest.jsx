import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
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
  { field: "AssetName", headerName: "AssetName" },
  {
    field: "Requestdate",
    headerName: "Request Date",
  },
  { field: "RequestType", headerName: "Request Type" },
  { field: "Assigneddate", headerName: "Assigned Date" },
  { field: "Description", headerName: "Description" },

  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const handleEdit = (params) => {
        console.log(`Edit row ${params.row.id}`);
      };


      return (
        <>
          <Button
            color="primary"
            style={{ color: "#6870fa" }}
            size="small"
            onClick={handleEdit}
          >
            <EditIcon />
          </Button>
        </>
      );
    },
  },
];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const AssetRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    const fetchRows = async () => {
      const response = await axios.get(`${apiUrl}`);
      setRows(response.data);
    };
    fetchRows();
  }, []);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {/* <GridToolbarExport /> */}
      </GridToolbarContainer>
    );
  }

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
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Service") {
      setIsShowing(true);
    } else if (event.target.value === "Exchange") {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  };

  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
            variant="contained"
            color="secondary"
            bold
            onClick={handleAddClick}
          >
            Add New Request
          </Button>

          <Box
            className="customMuiTable"
            m="10px 0 10px 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                position: "relative",
                zIndex: 2,
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
            <div
              style={{ height: 580, width: "100%", position: "sticky", top: 0 }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
                components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </div>
          </Box>

          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Add New Request</h2>
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Asset Name"
                type="text"
                fullWidth
                style={{ marginBottom: "10px" }}
              />

              <LocalizationProvider
                style={{ marginTop: "10px" }}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="Request Date"
                  sx={{
                    width: "100%",
                  }}
                />
              </LocalizationProvider>

              <FormControl fullWidth style={{ marginTop: "10px" }}>
                <InputLabel>Request Type</InputLabel>
                <Select
                  label="Request Type"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Exchange">Exchange</MenuItem>
                </Select>
              </FormControl>

              {!isShowing && (
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel>Classification </InputLabel>
                  <Select label="Classification"></Select>
                </FormControl>
              )}

              {isShowing && (
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel>Asset Assigned </InputLabel>
                  <Select label="Asset ASsigned"></Select>
                </FormControl>
              )}
              <TextField
                autoFocus
                label="Description"
                type="text"
                fullWidth
                style={{ marginTop: "10px" }}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={handleAddSubmit}
                variant="contained"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={handleAddClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default AssetRequest;
