import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from '@mui/material';

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
// import classes from "./tabelui.module.css";

const columns = [
  { field: "id", headerName: "Classification ID", width: 140 },
  { field: "classification", headerName: "Classification Name", width: 140 },
  { field: "category", headerName: "Category", width: 140 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => {
      const handleEdit = () => {
        console.log(`Edit row ${params.row.id}`);
      };


      return (
        <>
          <Button color="primary" 
          style={{ color: "#6870fa" }}
          size="small" onClick={handleEdit}>
            <EditIcon />
          </Button>

        </>
      );
    },
  },
];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const Classification = () => {
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
        <div style={{ height: 500}}>
          <Button
            variant="contained"
            color="primary"
            style={{ background: "#6870fa", marginBottom:"10px"}}
            onClick={handleAddClick}
          >
            Add new Classification
          </Button>
          <DataGrid rows={rows} columns={columns} />

          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle>Add new Classification</DialogTitle>
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
                label="Classification"
                type="text"
                fullWidth
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Category"
                type="text"
                fullWidth


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

export default Classification;
