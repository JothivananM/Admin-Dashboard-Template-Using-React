import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { Box, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AddBoxOutlined } from "@mui/icons-material";

// import classes from "./tabelui.module.css";


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
  }

const Classification = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newClassification, setNewClassification] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const[selectedvalue,setSelectedValue]=useState("");
  const matches=useMediaQuery('(max-width:600px)');

  const width1=matches ? 120 : 260;
  const columns = [
    { field: "id", headerName: "CLASSIFICATION ID", width: width1 },
    { field: "classification", headerName: "CLASSIFICATION NAME", width: width1 },
    { field: "category", headerName: "CATEGORY", width: width1 },
    {
      field: "actions",
      headerName: "ACTIONS",
      sortable: false,
      width: width1,
      renderCell: (params) => {
        const handleEdit = () => {
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
      classification: newClassification,
      category:selectedvalue,
    };
    const response = await axios.post(`${apiUrl}`, newRow);
    setRows([...rows, response.data]);
    setOpenAddDialog(false);
    setNewClassification("");
  };
const handleChange=(event)=>
{
  setSelectedValue(event.target.value);
}
const buttonplace=matches ? 0 : 16;
  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
          size="small"
          startIcon={<AddBoxOutlined />}
            variant="contained"
            color="primary"
            sx={{ mb: 1,ml:buttonplace, fontSize: "14px" }}
            style={{ background: "#A4A9FC", marginBottom: "10px" }}
            onClick={handleAddClick}
          >
            New Classification
          </Button>

          <Box
            className="customMuiTable"
            m={matches ? "10px 0 10px 0px" : "10px 0 10px 130px"}
            height="75vh"  width={matches ? "100%" : "80%"} 
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
                borderBottom: "none", color:"white"
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
                color: `${colors.blueAccent[300]} !important`,
              },
              "& .MuiTablePagination-selectLabel ,.css-1hgjne-MuiButtonBase-root-MuiIconButton-root, .css-7ms3qr-MuiTablePagination-displayedRows, .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon, .css-baf1rs-MuiInputBase-root-MuiTablePagination-select": {
                color: `white !important`,
              }
            }}
          >
            <div
              style={{ height: 580, width: "100%", position: "sticky", top: 0 }}
            >
              <DataGrid 
              autoHeight
              rows={rows} 
              columns={columns}
               componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
                components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} />
            </div>
          </Box>

          <Dialog open={openAddDialog} onClose={handleAddClose}     >
            <DialogTitle><h2  style={{marginBottom:"-10px"}}>Add New Classification</h2></DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="ID Auto Generated"
                type="text"
                placeholder="Auto Generated"
                fullWidth
                disabled
              />
              <TextField
                autoFocus
                margin="dense"
                label="Classification"
                type="text"
                fullWidth
                value={newClassification}
                onChange={(e) => setNewClassification(e.target.value)}
                InputProps={{
                  required: true,
                }}
              />
              <FormControl fullWidth style={{ marginTop: "10px" }} >
                <InputLabel>Category </InputLabel>
                <Select label="Category" value={selectedvalue} onChange={handleChange}>
                  {/* <MenuItem value="">Select Category</MenuItem> */}
                  <MenuItem value="Assignable" >Assignable</MenuItem>
                  <MenuItem value="Non-Assignable">Non-Assignable</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
             
              <Button onClick={handleAddSubmit} variant="contained">Save</Button>
              <Button onClick={handleAddClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default Classification;
