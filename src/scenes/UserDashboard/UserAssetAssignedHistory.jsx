import { Box, useMediaQuery } from '@mui/material';
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import axios from "axios";

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const UserAssetAssignedHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const isFlex = useMediaQuery("(max-width:600px) or (max-width:850px)");

  const columns = [
    { field: "id", headerName: "Asset ID",width: 160, flex: isFlex ? 0 : 1 },
    { field: "brand", headerName: "Asset Name",width: 160, flex: isFlex ? 0 : 1 },
    { field: "assigned", headerName: "Assigned From",width: 160, flex: isFlex ? 0 : 1 },
    { field: "qe", headerName: "Assigned To",width: 160, flex: isFlex ? 0 : 1 },
    // { field: "qec", headerName: "Currently Assigned", width:"120px" },
  ];

  useEffect(() => {
    const fetchRows = async () => {
      //Getting Data From DataBase
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

  return (
    <Box m="">

      <Box
        className="customMuiTable"
        m="10px 0 10px 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            position: "relative",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
          },
          "& .MuiDataGrid-cell": {
            // background: "white",
            borderBottom: "1px solid lightgray",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[900],
          },
          "& .MuiDataGrid-columnHeaders": {
            color: "30325E",
            fontSize: "16px",
            backgroundColor: "white",
            borderBottom: "1px solid #30325E",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "white",
            borderBottom: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[500]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#30325E`,
            fontSize: "14px",

          },
          "& .MuiTablePagination-selectLabel ,.css-1hgjne-MuiButtonBase-root-MuiIconButton-root, .css-7ms3qr-MuiTablePagination-displayedRows, .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon, .css-baf1rs-MuiInputBase-root-MuiTablePagination-select": {
            color: "#30325E !important",
            fontSize: "14px !important"
          },
          "& .MuiDataGrid-row": {
            background: "white",
            cursor: "pointer"
          },
          "& .MuiDataGrid-row:hover": {
            background: "whitesmoke",
            cursor: "pointer"
          },

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

    </Box>
  )
}

export default UserAssetAssignedHistory;