import  { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const MedicationTaskOverview = () => {
  const [filters, setFilters] = useState({
    startDate: "2025-11-02",
    endDate: "2025-11-02",
  });

  // Dummy data for charts
  const medicationData = [
    { name: "Administered", value: 40, color: "#22c55e" },
    { name: "Not Administered", value: 10, color: "#ef4444" },
    { name: "Due", value: 20, color: "#facc15" },
    { name: "Missed", value: 15, color: "#3b82f6" },
    { name: "Cancelled", value: 5, color: "#a3a3a3" },
    { name: "Other", value: 10, color: "#14b8a6" },
  ];

  const taskData = [
    { name: "Completed", value: 50, color: "#22c55e" },
    { name: "Partially Completed", value: 20, color: "#facc15" },
    { name: "Not Completed", value: 10, color: "#ef4444" },
    { name: "Due", value: 10, color: "#3b82f6" },
    { name: "Cancelled", value: 5, color: "#a3a3a3" },
    { name: "Other", value: 5, color: "#14b8a6" },
  ];

  return (
    <Box p={3}>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Medication & Task Overview
        </Typography>

        <Button variant="contained" color="info">
          Summary Reports
        </Button>
      </Box>

      {/* Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mt: 3, mb: 4 }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <TextField
            label="Search Client"
            variant="outlined"
            size="small"
            sx={{ width: 280 }}
          />

          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize={14}>Time Period</Typography>
            <TextField
              type="date"
              size="small"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
            <Typography fontSize={14}>to</Typography>
            <TextField
              type="date"
              size="small"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </Box>

          <Button variant="contained" color="secondary">
            Search
          </Button>
          <Button variant="contained" color="warning">
            All Clients
          </Button>
        </Box>
      </Paper>

      {/* Charts Section */}
      <Box className="flex items-center gap-5">
        {/* Medication Chart */}
        <Box className="flex-1">
          <Paper elevation={0} sx={{ p: 2, height: 500 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              Overall Medication Statuses
            </Typography>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={medicationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {medicationData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Task Chart */}
        <Box className="flex-1">
          <Paper elevation={0} sx={{ p: 2, height: 500 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              Overall Task Statuses
            </Typography>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {taskData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default MedicationTaskOverview;
