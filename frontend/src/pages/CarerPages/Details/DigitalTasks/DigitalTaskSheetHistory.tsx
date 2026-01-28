import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DigitalTaskSheetHistory: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const columns: GridColDef[] = [
    { field: "timeDue", headerName: "Time Due", flex: 1 },
    { field: "timeCompleted", headerName: "Time Completed", flex: 1 },
    { field: "clientName", headerName: "Client Name", flex: 1 },
    { field: "digitalTask", headerName: "Digital Tasks", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "subStatus", headerName: "Sub Status", flex: 1 },
    { field: "comments", headerName: "Comments", flex: 1 },
    { field: "updatedBy", headerName: "Updated By", flex: 1 },
    { field: "dateCreated", headerName: "Date Created", flex: 1 },
    { field: "outcome", headerName: "Outcome", flex: 1 },
    { field: "postIt", headerName: "Post-It", flex: 1 },
    { field: "edit", headerName: "Edit", flex: 1 },
  ];

  const rows: any[] = []; // no data initially

  return (
    <div>
      {/* Title */}
      <Typography variant="h5" className="font-semibold mb-4">
        Digital TaskSheet History - Ellisha Bickerton
      </Typography>

      {/* Filter Section */}
      <Box className="bg-green-100 rounded-md p-4 flex flex-wrap gap-3 items-center mb-6">
        <TextField
          label="From"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
        <Typography variant="body1">to</Typography>
        <TextField
          label="To"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        <FormControl size="small" className="min-w-[100px]">
          <InputLabel>All</InputLabel>
          <Select
            value={statusFilter}
            label="All"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="missed">Missed</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary">
          Search
        </Button>
        <Button variant="outlined" color="inherit">
          Clear
        </Button>
      </Box>

      {/* Table Actions */}
      <div className="flex flex-wrap justify-between items-center mb-3">
        <div className="flex gap-2">
          <Button variant="outlined" size="small">
            Rows
          </Button>
          <Button variant="outlined" size="small">
            Print
          </Button>
          <Button variant="outlined" size="small">
            Excel
          </Button>
          <Button variant="outlined" size="small">
            Column Visibility
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <TextField size="small" label="Search" />
          <Button variant="contained" sx={{ backgroundColor: "#6A1B9A" }}>
            Bulk Update
          </Button>
        </div>
      </div>

      {/* DataGrid */}
      <Box className="bg-white rounded-lg shadow p-3">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row.id || Math.random()}
          localeText={{
            noRowsLabel: "No data available in table",
          }}
        />
      </Box>
    </div>
  );
};

export default DigitalTaskSheetHistory;
