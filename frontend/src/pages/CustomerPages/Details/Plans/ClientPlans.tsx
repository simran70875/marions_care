import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

interface Plan {
  id: number;
  name: string;
  status: "Pending" | "Completed" | "Not started";
  lastCompleted?: string;
}

const ClientPlans: React.FC = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const plans: Plan[] = [
    { id: 1, name: "Client Onboarding", status: "Pending", lastCompleted: "07:10 06 Nov 2025" },
    { id: 2, name: "Consent", status: "Completed", lastCompleted: "11:53 03 Sep 2025" },
    { id: 3, name: "Quality Assurance", status: "Completed", lastCompleted: "16:15 01 Sep 2025" },
    { id: 4, name: "Incident Report", status: "Not started" },
    { id: 5, name: "Care Plan", status: "Not started" },
  ];

  const filteredPlans = plans.filter(
    (p) =>
      (filter === "All" || p.status === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Completed":
        return "success";
      default:
        return "default";
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1,},
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusChipColor(params.value)}
          variant="outlined"
          size="small"
        />
      ),
    },
    { field: "lastCompleted", headerName: "Last Completed", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(`/customer/plans/start-plan/${params.row.id}`)}
        >
          Start Plan
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" fontWeight="bold">
          Plans - Charles O’Connor
        </Typography>

        <Box className="flex gap-2">
          <Button variant="outlined" size="small">Print</Button>
          <Button variant="outlined" size="small">Column visibility</Button>
        </Box>
      </Box>

      {/* Status Filter Row */}
      <Box className="flex flex-wrap gap-3 mb-4">
        <Button
          variant={filter === "Favourites" ? "contained" : "outlined"}
          color="secondary"
          size="small"
          onClick={() => setFilter("Favourites")}
        >
          Favourites ⭐
        </Button>
        <Button
          variant={filter === "Pending" ? "contained" : "outlined"}
          color="warning"
          size="small"
          onClick={() => setFilter("Pending")}
        >
          Pending
        </Button>
        <Button
          variant={filter === "Completed" ? "contained" : "outlined"}
          color="success"
          size="small"
          onClick={() => setFilter("Completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "Not started" ? "contained" : "outlined"}
          color="inherit"
          size="small"
          onClick={() => setFilter("Not started")}
        >
          Not started
        </Button>
        <Button
          variant={filter === "All" ? "contained" : "outlined"}
          color="primary"
          size="small"
          onClick={() => setFilter("All")}
        >
          All
        </Button>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto"
        />
      </Box>

      {/* Data Table */}
      <Box className="bg-white rounded-lg shadow p-4">
        <DataGrid
          autoHeight
          rows={filteredPlans}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          localeText={{
            noRowsLabel: "No plans available",
          }}
        />
      </Box>
    </div>
  );
};

export default ClientPlans;
