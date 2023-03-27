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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Box } from '@mui/material';

// import classes from "./tabelui.module.css";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "brand", headerName: "BrandName" },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => {
      const handleEdit = () => {
        console.log(`Edit row ${params.row.id}`);
      };

      const handleDelete = () => {
        console.log(`Delete row ${params.row.id}`);
      };

      return (
        <>
          <Button color="primary"
            style={{ color: "#6870fa" }}
            size="small"
            onClick={handleEdit}>
            <EditIcon />
          </Button>
          {/* <Button color="secondary" size="small" onClick={handleDelete}>
            <DeleteIcon />
          </Button> */}
        </>
      );
    },
  },
];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const Brand = () => {
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
        {/* <div style={{ height: 500 }}> */}
        <div style={{ height: 500 }}>

          <Button
            variant="contained"
            sx={{mb:1}}
            style={{ background: "#6870fa" }}
            onClick={handleAddClick}
          >
            Add new Brand
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
            <DialogTitle>Add new Brand</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Id"
                type="text"
                placeholder="Auto Generated"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                label="Brand"
                type="text"
                fullWidth
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddClose}>Cancel</Button>
              <Button onClick={handleAddSubmit}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default Brand;
