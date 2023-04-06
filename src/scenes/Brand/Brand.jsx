import { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Box, useMediaQuery } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import AddNewBrand from "./AddNewBrand";
import EditBrand from "./EditBrand";

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const Brand = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [editingRow, setEditingRow] = useState("null");
  const inputRef = useRef(null);

  const matches = useMediaQuery("(max-width:600px)");

  const width1 = matches ? 120 : 340;
  const buttonplace = matches ? 0 : 16;

  useEffect(() => {
    const fetchRows = async () => {
      //Getting Data From DataBase
      const response = await axios.get(`${apiUrl}`);
      setRows(response.data);
      //autofocus for edit brand view
      if (inputRef.current) {
        inputRef.current.focus();
      }
      console.log(inputRef.current.focus())
    };
    fetchRows();
  }, []);

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
    setUpdateDialog(false);
  };

  // Edit handling Function
  const handleEditSubmit = async () => {
    // console.log(editingRow);
    if (editingRow.brand === "") {
      alert("Name field cannot be left blank");
    } else if (
      rows.find((p) => {
        return (
          p.brand.toLocaleLowerCase() === editingRow.brand.toLocaleLowerCase()
        );
      })
    ) {
      alert("This Brand Name is already taken.");
    } else {
      const response = await axios.put(
        `${apiUrl}/${editingRow.id}`,
        editingRow
      );
      setUpdateDialog(false);

      setEditingRow("");
      setRows(
        rows.map((row) => (row.id === response.data.id ? response.data : row))
      );
      alert("Updated Successfully");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Brand ID",
      headerStyle: { backgroundColor: "blue", color: "white" },
      width: width1,
    },
    { field: "brand", headerName: "Brand name", width: width1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: width1,
      renderCell: (params) => {
        const handleEdit = () => {
          // console.log(`Edit row ${params.row.id}`);
          // console.log(`Edit row ${params.row.brand}`);
          setEditingRow(params.row);
          setUpdateDialog(true);
        };
        //When click edit button handleEditSubmit will executed

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
            {/* Update */}
          </>
        );
      },
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  };

  const fetchRow = (props) => {
    setRows(props);
  };
  const editData=(props)=>
  {
    setRows(props);
  }

  return (
    <>
      <Box m="20px">
        <div style={{ height: 500 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddBoxOutlined />}
            sx={{ mb: 1, ml: buttonplace, fontSize: "14px" }}
            style={{ background: "#A4A9FC" }}
            onClick={handleAddClick}
          >
           New Brand
          </Button>

          <Box
            className="customMuiTable"
            m={matches ? "10px 0 10px 0px" : "10px 0 10px 130px"}
            height="75vh"
            width={matches ? "100%" : "80%"}
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
                color: "white",
                fontSize: "13px",
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
              "& .MuiTablePagination-selectLabel ,.css-1hgjne-MuiButtonBase-root-MuiIconButton-root, .css-7ms3qr-MuiTablePagination-displayedRows, .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon, .css-baf1rs-MuiInputBase-root-MuiTablePagination-select":
                {
                  color: `white !important`,
                },
            }}
          >
            <div
              style={{ height: 580, width: "100%", position: "sticky", top: 0 }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                componentsProps={{
                  toolbar: { csvOptions: { fields: ["postId", "email"] } },
                }}
                components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                autoWidth
                autoHeight
              />
            </div>
          </Box>
          {/* Add new Brand */}
          <AddNewBrand
            openAddDialog={openAddDialog}
            postData={fetchRow}
            tableRowData={rows}
            handleAddClose={handleAddClose}
          />

          {/* Edit Brand */}
          {/* <Dialog open={updateDialog} >
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Update Brand</h2>
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="ID Auto Generated"
                type="text"
                value={editingRow.id}
                fullWidth
                disabled
              />
              <TextField
                autofocus
                margin="dense"
                label="Brand"
                type="text"
                fullWidth
                defaultValue={editingRow.brand}
                onChange={(e) =>
                  setEditingRow((prevRow) => ({
                    ...prevRow,
                    brand: e.target.value.toUpperCase(),
                  }))
                }
                inputRef={inputRef}
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
              <Button onClick={handleAddClose}>Cancel</Button>
            </DialogActions>
          </Dialog> */}
          <EditBrand 
          updateDialog={updateDialog}
          handleAddClose={handleAddClose}
          tableRowData={rows}
          editData={editingRow}
           />
        </div>
      </Box>
    </>
  );
};

export default Brand;
