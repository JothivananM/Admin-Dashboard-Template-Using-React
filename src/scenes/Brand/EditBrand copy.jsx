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
  const [editingData, setEditingData] = useState({
    id: props.editingRow.id,
    brand: props.editingRow.brand,
  });
  const [rows, setRows] = useState(props.rows);

  const handleEditSubmit = async () => {
    console.log("EditingData", editingData);
    console.log("propsEditingdata", props.editingRow);

    if (!editingData.brand || editingData.brand.trim() === "") {
      alert("Name field cannot be left blank");
    } else if (
      rows.find((p) => {
        return p.brand.toLowerCase() === editingData.brand.toLowerCase();
      })
    ) {
      alert("This Brand Name is already taken.");
    } else {
      const response = await axios.put(
        `${apiUrl}/${props.editingRow.id}`,
        editingData
      );

      props.handleAddClose();
      setEditingData("");
      props.editData((prevRows) =>
        prevRows.map((row) =>
          row.id === response.data.id ? response.data : row
        )
      );
      alert("Updated Successfully");
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
          value={props.editingRow.id}
          fullWidth
          disabled
        />
        <TextField
          autofocus
          margin="dense"
          label="Brand"
          type="text"
          fullWidth
          defaultValue={props.editingRow.brand}
          onChange={(e) =>
            setEditingData((prevData) => ({
              ...prevData,
              brand: e.target.value.trim().toUpperCase(),
            }))
          }
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
