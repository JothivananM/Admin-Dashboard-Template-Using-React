import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NewAssetForm from "./NewAssetForm";
import AssignReAssign from "./AssignReAssign/AssignReAssign";
// import AssetAssignProcess from "./AssetAssignProcess";

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt',
);
// const buttonBaseProps = {
//   color: 'primary',
//   size: 'small',
//   startIcon: <ExportIcon />,
// };



const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const AssetManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openReAssign, setOpenReAssign] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { field: "id", headerName: "Asset ID", width: 160 },
    { field: "assetName", headerName: "Asset Name", width: 160 },
    { field: "category", headerName: "Category", width: 160 },
    { field: "brand", headerName: "Brand", width: 160 },
    { field: "currentStage", headerName: "Current Stage", width: 160 },
    { field: "assigned", headerName: "Assigned", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        const handleAssign = () => {
          setOpenAssign(!openAssign);
          console.log(`Edit row ${params.row.id}`);
        };
        const handleReAssign = () => {
          setOpenReAssign(!openReAssign);
          console.log(`Edit row ${params.row.id}`);
        };

        return (
          <>
            <Button
              onClick={handleAssign}
              variant="contained"
              size="small"
              color="secondary"
              style={{ marginRight: "10px" }}
            >
              Assign
            </Button>
            <Button
              onClick={handleReAssign}
              variant="contained"
              size="small"
              color="success"
              style={{ marginRight: "10px" }}>
              Reassign
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              style={{ marginRight: "10px" }}>
              View History
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

  const handleAssignSubmit = async () => {
    console.log("Closed");
  }

  const handleReAssignSubmit = async () => {
    console.log("Closed");
  }

  const handleAddClose = () => {
    setOpenAddDialog(false);
    setOpenAssign(false);
    setOpenReAssign(false);
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
            Add New Asset
          </Button>

          <Box
            className="customMuiTable"
            m="10px 0 10px 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                position: "relative",
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
          
              <DataGrid rows={rows}
                columns={columns}
                componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
                components={{ Toolbar: CustomToolbar }}
                rowsPerPageOptions={[10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} />
            

            {/* <AssetAssignProcess /> */}


          </Box>
          {/* New Asset */}
          <Dialog open={openAddDialog} onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Add Details </h2>
            </DialogTitle>
            <DialogContent>

              <NewAssetForm />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddSubmit} variant="contained" color="secondary">
                Save
              </Button>
              <Button onClick={handleAddClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          {/*Assign  */}
          <Dialog open={openAssign} onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Add Details </h2>
            </DialogTitle>
            <DialogContent>

              <AssignReAssign assign={true} />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleAssignSubmit} variant="contained" color="secondary">
                Save
              </Button>
              <Button onClick={handleAddClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          {/* ReAssign */}
          <Dialog open={openReAssign} onClose={handleAddClose}>
            <DialogTitle>
              <h2 style={{ marginBottom: "-10px" }}>Add Details </h2>
            </DialogTitle>
            <DialogContent>

              <AssignReAssign assign={false} />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleReAssignSubmit} variant="contained" color="secondary">
                Save
              </Button>
              <Button onClick={handleAddClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default AssetManagement;
