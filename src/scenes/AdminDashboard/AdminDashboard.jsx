import { Box } from '@mui/material';
import React from 'react';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';

const AdminDashboard = () => {
  return (
    <>
      <Box m="20px">
        <BarChart />
        <PieChart />
      </Box>
    </>
  )
}

export default AdminDashboard; 