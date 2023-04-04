import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "Asset ID" },
  { field: "brand", headerName: "Asset Name" },
  { field: "assignedForm", headerName: "Assigned From" },
  { field: "qe", headerName: "Assigned To" },

];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const UserDashBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const [pageSize, setPageSize] = useState(10);

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
    <>
      <Box>
        <div style={{ height: 500 }}>

          <Box
            className="customMuiTable"
            m="1px 0 10px 0"

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

        </div>


      </Box>


    </>
  );
};

export default UserDashBoard;
