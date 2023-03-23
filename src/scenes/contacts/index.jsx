import { Box } from "@mui/material";
import { DataGrid, GridToolbar, gridPaginatedVisibleSortedGridRowIdsSelector, } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { sampleData } from "../../data/mockData";
import { createSvgIcon } from '@mui/material/utils';
// import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState } from 'react';

const getRowsFromCurrentPage = ({ apiRef }) =>
  gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowData, setRowData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt',
  );
  const buttonBaseProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };

  sampleData.then((data) => {
    setRowData(data.data);
  })
  const newColumn = [
    { field: "id", headerName: "ID" },
    { field: "postId", headerName: "Post ID" },
    { field: "name", headerName: "Full Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.3 },
    { field: "body", headerName: "Comments", flex: 1 }
  ]

  // const columns = [
  //   { field: "id", headerName: "ID", flex: 0.3 },
  //   { field: "registrarId", headerName: "Registrar ID" },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   {
  //     field: "address",
  //     headerName: "Address",
  //     flex: 1.3,
  //   },
  //   {
  //     field: "city",
  //     headerName: "City",
  //     flex: 1,
  //   },
  //   {
  //     field: "zipCode",
  //     headerName: "Zip Code",
  //     flex: 1,
  //   },
  // ];

  return (
    <Box m="1.3rem" >

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
          <DataGrid
            rows={rowData}
            columns={newColumn}
            componentsProps={{ toolbar: { csvOptions: { fields: ['postId', 'email'] } } }}
            components={{ Toolbar: GridToolbar }}
            rowsPerPageOptions={[10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </div>
      </Box>
    </Box >
  );
};

export default Contacts;
