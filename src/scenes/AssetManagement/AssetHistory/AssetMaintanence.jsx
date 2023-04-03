import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Request ID" },
  { field: "brand", headerName: "Request Date" },
  { field: "ew", headerName: "Given Date " },
  { field: "qe", headerName: "Completion Date" },
  { field: "re", headerName: "Service Provider" },
  { field: "tr", headerName: "Complain Details" },
  { field: "qy", headerName: "Service Details" },



  
];

const apiUrl = "https://640efb40cde47f68db3db9f5.mockapi.io/brandname";

const AssetMaintananceHistory = () => {
  const data= useParams();
  console.log(data);
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
      <Box m="20px">
        <div style={{ height: 500 }}>
          

          <Box
            className="customMuiTable"
            m="10px 0 10px 0"
            
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
                color:'white'

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

export default AssetMaintananceHistory;
