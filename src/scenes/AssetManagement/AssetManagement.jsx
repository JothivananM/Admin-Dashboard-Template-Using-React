import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridCell, } from "@mui/x-data-grid";
import { Box, Divider, useMediaQuery } from "@mui/material";
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
import AssetAssignedHistory from "./AssetHistory/AssetAssigned";
import { AssetHistoryNavigation } from "./AssetNavigation/AssetHistoryNavigation";
import { Link, NavLink } from "react-router-dom";
// import AssetAssignProcess from "./AssetAssignProcess";
import './AssetManagement.css'
import { AddBoxOutlined } from "@mui/icons-material";

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
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const columns = [
    { field: "id", headerName: "Asset ID", width: 160 },
    { field: "assetName", headerName: "Asset Name", width: 160 },
    { field: "category", headerName: "Category", width: 160 },
    { field: "brand", headerName: "Brand", width: 160 },
    { field: "currentStage", headerName: "Current Stage", width: 160 },
    { field: "assigned", headerName: "Assigned To", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        console.log("params", params);
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
            {
              (params.row.brand.toLocaleLowerCase() === 'dell' ||
                params.row.brand.toLocaleLowerCase() === 'samsung' ||
                params.row.brand.toLocaleLowerCase() === 'hp' ||
                params.row.brand.toLocaleLowerCase() === 'asus') ?
                <Button
                  onClick={handleAssign}
                  variant="contained"
                  size="small"
                  color="secondary"
                  style={{ marginRight: "10px" }}
                >
                  Assign
                </Button> :
                <Button
                  onClick={handleReAssign}
                  variant="contained"
                  size="small"
                  color="success"
                  style={{ marginRight: "10px" }}>
                  Reassign
                </Button>
            }

            <Link to={`/assetmanagement/${params.row.id}`}>
              <Button
                variant="contained"
                size="small"
                style={{ marginRight: "10px", background: "#535ac8" }}>
                View History
              </Button>
            </Link>

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
    setOpenAssign(false);
  }

  const handleReAssignSubmit = async () => {
    console.log("Closed");
    setOpenReAssign(false);
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
            startIcon={<AddBoxOutlined />}
            // color="primary"
            style={{ background: "#A4A9FC", marginBottom: "5px" }}
            onClick={handleAddClick}
          >
            New Asset
          </Button>

          <Box
            className="customMuiTable"
            m="10px 0 10px 0"
            height="70vh"
            sx={{
              "& .MuiDataGrid-root": {
                position: "relative",
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[900],
              },
              "& .MuiDataGrid-columnHeaders": {
                color: "white",
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
                color: "white",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[500]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.blueAccent[300]} !important`,
              },
              "& .MuiTablePagination-selectLabel ,.css-1hgjne-MuiButtonBase-root-MuiIconButton-root, .css-7ms3qr-MuiTablePagination-displayedRows, .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon, .css-baf1rs-MuiInputBase-root-MuiTablePagination-select": {
                color: `white !important`,
              }
            }}
          >

            <DataGrid
              initialState={{
                pinnedColumns: { left: ['Asset ID'] },
              }}
              autoHeight
              rows={rows}
              disableSelectionOnClick={true}
              onCellClick={(params, event) => {
                event.preventDefault();
              }}
              columns={columns}
              componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
              components={{ Toolbar: CustomToolbar }}
              rowsPerPageOptions={[10, 20]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
            {({ field }) => (
              <GridCell
                disableClickEventBubbling
                {...field}
              />
            )}


            {/* <AssetAssignProcess /> */}


          </Box>
          {/* New Asset */}
          <Dialog
            open={openAddDialog}
            onClose={handleAddClose}
            fullScreen={fullScreen}
          >
            <DialogTitle>
              <h2 style={{ margin: "0px" }}>Asset Details</h2>
            </DialogTitle>
            <Divider />
            <DialogContent>

              <NewAssetForm />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddSubmit} variant="contained" color="secondary">
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddClose}
              >
                Cancel</Button>
            </DialogActions>
          </Dialog>

          {/*Assign  */}
          <Dialog open={openAssign} onClose={handleAddClose}>
            <DialogTitle>
              {/* <h2 style={{ marginBottom: "-10px" }}>Add Details </h2> */}
            </DialogTitle>
            <DialogContent>

              <AssignReAssign assign={true} />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleAssignSubmit} variant="contained" color="secondary">
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* ReAssign */}
          <Dialog open={openReAssign} onClose={handleAddClose}>
            <DialogTitle>
              {/* <h2 style={{ marginBottom: "-10px" }}>Add Details </h2> */}
            </DialogTitle>
            <DialogContent>

              <AssignReAssign assign={false} />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleReAssignSubmit} variant="contained" color="secondary">
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddClose}
              >
                Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default AssetManagement;
