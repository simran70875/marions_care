import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "lucide-react";

const PRIMARY_PURPLE = "#4B1D6A"; // header / signature bg
const ACTION_ORANGE = "#f59e0b";
const ACTION_TEAL = "#14b8a6";
const ACTION_PURPLE = "#6b21a8";

type RowType = {
  id: number;
  client: string;
  planName: string;
  started: string;
  startedBy: string;
  completed: string | "Pending";
  reviewDate?: string;
  signOff?: string;
  status?: "Pending" | "Completed";
};

const demoRows: RowType[] = [
  {
    id: 1,
    client: "Raymond Allen",
    planName: "Client Onboarding",
    started: "31-10-2025 10:21",
    startedBy: "Office Chorlton",
    completed: "Pending",
    status: "Pending",
  },
  {
    id: 2,
    client: "Simon Taun",
    planName: "Client Onboarding",
    started: "30-10-2025 15:12",
    startedBy: "Sana Nabi",
    completed: "Pending",
    status: "Pending",
  },
  {
    id: 3,
    client: "Sarah Short",
    planName: "Care Plan",
    started: "30-10-2025 13:29",
    startedBy: "Office Chorlton",
    completed: "Pending",
    status: "Pending",
  },
  {
    id: 4,
    client: "Allan Cope",
    planName: "Accident / Incident Report Form",
    started: "29-10-2025 12:02",
    startedBy: "Office Chorlton",
    completed: "29-10-2025 12:13",
    reviewDate: "29-10-2025",
    signOff: undefined,
    status: "Completed",
  },
  {
    id: 5,
    client: "Mohamad Al-Mahdi Al-Gadamsi",
    planName: "Client Onboarding",
    started: "27-10-2025 23:18",
    startedBy: "Office Chorlton",
    completed: "Pending",
    status: "Pending",
  },
  {
    id: 6,
    client: "Yvonne Marie Morgan",
    planName: "Quality Assurance",
    started: "27-10-2025 13:26",
    startedBy: "Office Chorlton",
    completed: "27-10-2025",
    reviewDate: "27-10-2025",
    signOff: "27-11-2025",
    status: "Completed",
  },
  {
    id: 7,
    client: "Jodie Greaves",
    planName: "Quality Assurance",
    started: "27-10-2025 12:58",
    startedBy: "Office Chorlton",
    completed: "27-10-2025",
    reviewDate: "27-10-2025",
    signOff: "27-11-2025",
    status: "Completed",
  },
  {
    id: 8,
    client: "Javed Syed",
    planName: "Quality Assurance",
    started: "21-10-2025 15:11",
    startedBy: "Office Chorlton",
    completed: "21-10-2025",
    reviewDate: "21-10-2025",
    signOff: "21-11-2025",
    status: "Completed",
  },
  {
    id: 9,
    client: "Peta Davenport",
    planName: "Quality Assurance",
    started: "20-10-2025 14:12",
    startedBy: "Office Chorlton",
    completed: "20-10-2025",
    reviewDate: "20-10-2025",
    signOff: "20-11-2025",
    status: "Completed",
  },
  {
    id: 10,
    client: "Peter Johnson",
    planName: "Blister",
    started: "20-10-2025 09:32",
    startedBy: "Humayun Safdar",
    completed: "Pending",
    status: "Pending",
  },
];

const columns: GridColDef[] = [
  {
    field: "client",
    headerName: "Client",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => (
      <Typography className="text-purple-700 hover:underline cursor-pointer">
        {params.value}
      </Typography>
    ),
  },
  {
    field: "planName",
    headerName: "Plan Name",
    minWidth: 220,
    flex: 1.2,
  },
  {
    field: "started",
    headerName: "Started",
    minWidth: 160,
    flex: 0.9,
  },
  {
    field: "startedBy",
    headerName: "Started By",
    minWidth: 160,
    flex: 0.9,
  },
  {
    field: "completed",
    headerName: "Completed",
    minWidth: 120,
    flex: 0.7,
  },
  {
    field: "reviewDate",
    headerName: "Review Date",
    minWidth: 140,
    flex: 0.7,
  },
  {
    field: "signOff",
    headerName: "Sign Off",
    minWidth: 120,
    flex: 0.6,
  },
  {
    field: "actions",
    headerName: "View Plan",
    minWidth: 180,
    flex: 0.9,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const status = (params.row as RowType).status;
      return (
        <Box className="flex gap-2 items-center">
          {status === "Pending" && (
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: ACTION_ORANGE,
                color: "white",
                "&:hover": { backgroundColor: "#f59e0b" },
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              View Pending Plan
            </Button>
          )}

          {status === "Completed" && (
            <>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: ACTION_PURPLE,
                  color: "white",
                  "&:hover": { backgroundColor: "#5b1990" },
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                View Signature
              </Button>

              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: ACTION_TEAL,
                  color: "white",
                  "&:hover": { backgroundColor: "#0f9b8a" },
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                View Completed Plan
              </Button>
            </>
          )}

          {/* fallback small button for other cases */}
          {!status && (
            <Button size="small" variant="outlined" className="normal-case">
              View
            </Button>
          )}
        </Box>
      );
    },
  },
];

const AllPlansTaken: React.FC = () => {
  const [dateFrom, setDateFrom] = useState<string>("2025-10-19");
  const [dateTo, setDateTo] = useState<string>("2025-11-02");
  const [type, setType] = useState<string>("Client");
  const [searchBy, setSearchBy] = useState<string>("Started Dates");
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(true);
  const [archived, setArchived] = useState<boolean>(true);

  // filteredRows is just demo (no real filtering logic needed per your request)
  const filteredRows = demoRows;

  return (
    <Box className="bg-white min-h-screen p-6 font-[Inter]">
      {/* Page Title */}
      <Typography variant="h5" className="text-2xl font-normal text-gray-800 mb-4">
        Client &gt; All Plans Taken
      </Typography>

      {/* Search Panel */}
      <Paper elevation={0} className="p-4 mb-4 border border-gray-200 rounded">
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <Box className="flex items-center gap-2">
              <Typography className="w-28 text-sm text-gray-700">Search Dates</Typography>
              <TextField
                size="small"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                sx={{ width: 180 }}
              />
              <Box className="px-2 text-sm text-gray-500">to</Box>
              <TextField
                size="small"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                sx={{ width: 180 }}
              />
            </Box>

          </Grid>

          <Grid>
            <Box className="flex items-center justify-end gap-3">
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="Client">Client</MenuItem>
                  <MenuItem value="Carer">Carer</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="searchby-label">Search</InputLabel>
                <Select
                  labelId="searchby-label"
                  value={searchBy}
                  label="Search"
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <MenuItem value="Started Dates">Started Dates</MenuItem>
                  <MenuItem value="Completed Dates">Completed Dates</MenuItem>
                  <MenuItem value="Client Name">Client Name</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" sx={{ backgroundColor: "#06a3c6", textTransform: "none" }}>
                Search
              </Button>
            </Box>
          </Grid>


          <Box className="mt-3 flex items-center gap-6">
            <Typography className="text-sm text-gray-700">State:</Typography>
            <FormControlLabel
              control={<Checkbox checked={active} onChange={() => setActive((v) => !v)} />}
              label="Active"
            />
            <FormControlLabel
              control={<Checkbox checked={pending} onChange={() => setPending((v) => !v)} />}
              label="Pending"
            />
            <FormControlLabel
              control={<Checkbox checked={archived} onChange={() => setArchived((v) => !v)} />}
              label="Archived"
            />
          </Box>
        </Grid>

        <Box className="mt-3 flex items-center gap-3">
          <Button variant="contained" sx={{ backgroundColor: PRIMARY_PURPLE, color: "white", textTransform: "none" }}>
            + Filter
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#f59e0b", color: "white", textTransform: "none" }}>
            Clear Dates
          </Button>
        </Box>
      </Paper>

      {/* Toolbar */}
      <Box className="mb-3 flex items-center justify-between">
        <Box className="flex flex-wrap gap-2">
          {["Show 50 rows", "Copy", "Excel", "CSV", "PDF", "Print", "Area Search", "Plan Search", "Column visibility"].map(
            (label) => (
              <Button
                key={label}
                size="small"
                variant="outlined"
                className="normal-case text-gray-700 border-gray-300"
                sx={{ textTransform: "none" }}
              >
                {label}
              </Button>
            )
          )}
        </Box>

        <Box className="flex items-center gap-2">
          <Typography>Search:</Typography>
          <TextField
            size="small"
            placeholder=""
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            sx={{ width: 180 }}
            InputProps={{
              endAdornment: <Search />,
            }}
          />
        </Box>
      </Box>

      {/* Data Grid */}
      <Box className="border border-gray-200 rounded overflow-hidden">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fafafa",
              color: "#374151",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(0,0,0,0.04)",
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": { backgroundColor: "#ffffff" },
              "&:nth-of-type(even)": { backgroundColor: "#fbfbfb" },
            },
          }}
        />
      </Box>

      {/* Footer (showing entries & pagination) */}
      <Box className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <div>Showing 1 to {demoRows.length} of {demoRows.length} entries</div>
        <Box className="flex items-center gap-3">
          <Button size="small" variant="text" className="text-gray-600">Previous</Button>
          <Box className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</Box>
          <Button size="small" variant="text" className="text-gray-600">Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AllPlansTaken;
