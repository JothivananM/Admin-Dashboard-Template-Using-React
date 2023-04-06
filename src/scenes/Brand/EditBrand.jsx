import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";
export default function EditBrand(props) {
 
  const handleEditSubmit = async () => {
  if(props.editData.brand ==="")
  {
    alert("empty")
  }
   
  };
  return (
    <Dialog open={props.updateDialog}>
      <DialogTitle>
        <h2 style={{ marginBottom: "-10px" }}>Update Brand</h2>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="ID Auto Generated"
          type="text"
          value={props.editData.id}
          fullWidth
          disabled
        />
        <TextField
          autofocus
          margin="dense"
          label="Brand"
          type="text"
          fullWidth
          defaultValue={props.editData.brand}
         
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditSubmit}
        >
          Update
        </Button>
        <Button onClick={props.handleAddClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
