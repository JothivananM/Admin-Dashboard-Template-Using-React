import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
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
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { field: "ID", headerName: "Request ID", width: 100 },
  {
    field: "Requestor",
    headerName: "Requestor",
    width: 100,
  },
  { field: "RequestDate", headerName: "Request Date", width: 100 },
  { field: "AssetName", headerName: "Asset Name", width: 100 },
  { field: "RequestType", headerName: "Request Type", width: 100 },
  { field: "Reason", headerName: "Reason", width: 100 },
  { field: "Status", headerName: "Status", width: 100 },
  {
    field: "AssetClassification",
    headerName: "Asset Classification",
    width: 150,
  },
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
          <FormControl fullWidth>
            <Select label="">
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Declined">Declined</MenuItem>
              <MenuItem value="Fulfilled">Fulfilled</MenuItem>
            </Select>
          </FormControl>
        </>
      );
    },
  },
];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
};

const AssetRequestList = () => {
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
                autoWidth
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
          <Dialog onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Asset Service </h2>
            </DialogTitle>
            <DialogContent>
              <Box m="20px">
                <div>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                      ml: 2,
                      mt: 2,
                      mr: 2,
                    }}
                  >
                    <TextField
                      label="Asset ID"
                      fullWidth
                      sx={{ gridColumn: "span 2" }}
                    />

                    <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                      <InputLabel>Asset Name</InputLabel>
                      <Select
                        label="Asset Name"
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <MenuItem value="None">None</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Request ID"
                      fullWidth
                      sx={{ gridColumn: "span 2" }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Request Date"
                        sx={{ gridColumn: "span 2" }}
                      />
                    </LocalizationProvider>

                    <TextField
                      label="Service ID"
                      fullWidth
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      label="Service Provider"
                      fullWidth
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      label="Complain Detail"
                      fullWidth
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      label="Service Completed detail"
                      fullWidth
                      sx={{ gridColumn: "span 2" }}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Service Given Date"
                        sx={{ gridColumn: "span 2" }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" mr="20px">
                    <Box display="flex" gap="15px">
                      <Button
                        variant="contained"
                        style={{ fontSize: "15px" }}
                        color="secondary"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleAddClose}
                        style={{ fontSize: "15px" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
            </div>
          </Box>
            </DialogContent>
          </Dialog>

          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Add New Request</h2>
            </DialogTitle>
            <DialogContent>
              {/* Asset Id */}
              <TextField
                autoFocus
                margin="dense"
                label="Asset ID"
                type="text"
                fullWidth
                style={{ marginBottom: "10px" }}
                disabled
              />
              {/* Asset Name */}
              <TextField
                autoFocus
                margin="dense"
                label="Asset Name"
                type="text"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
              {/* Request Date */}
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
              {/* Request type */}
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
              {/* Classification */}
              {!isShowing && (
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel>Classification </InputLabel>
                  <Select label="Classification"></Select>
                </FormControl>
              )}
              {/* Asset  */}
              {isShowing && (
                <FormControl fullWidth style={{ marginTop: "10px" }}>
                  <InputLabel>Asset </InputLabel>
                  <Select label="Asset"></Select>
                </FormControl>
              )}
              {/* Description */}
              <FormControl
                fullWidth
                sx={{ gridColumn: "span 2" }}
                style={{ marginTop: "10px" }}
              >
                <textarea
                  style={{
                    border: "1px solid #C2C2C2",
                    borderRadius: "3px",
                    height: "90px",
                  }}
                  aria-label="empty textarea"
                  placeholder="Description"
                  rows="3"
                  cols="40"
              />
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                onClick={handleAddSubmit}
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

export default AssetRequestList;
