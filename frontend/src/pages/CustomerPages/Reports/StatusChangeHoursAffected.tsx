import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {  Copy, Table } from "lucide-react";
import {
  Box,
  Chip,
  Button,
  TextField,
  Typography,
} from "@mui/material";

// =================================================================
// 2. TYPE DEFINITIONS & DUMMY DATA 📋
// =================================================================

interface HoursAffectedItem {
  id: number | string; // Use string for total rows
  client: string;
  statusChangedFrom: "Active" | "In Hospital";
  statusChangedTo: "Active" | "In Hospital";
  datePeriodAffected: string;
  numDaysAffected: number | string;
  hoursAffected: number | string;
  hrsMins: string;
}

const hoursAffectedData: HoursAffectedItem[] = [
  {
    id: 1,
    client: "James Scott",
    statusChangedFrom: "Active",
    statusChangedTo: "In Hospital",
    datePeriodAffected: "22-10-2025 - 28-10-2025",
    numDaysAffected: 7,
    hoursAffected: 13,
    hrsMins: "13hrs 0mins",
  },
  // --- Aggregation Rows (These need custom rendering) ---
  {
    id: "page-total",
    client: "Page Total",
    statusChangedFrom: "Active", // Dummy value
    statusChangedTo: "In Hospital", // Dummy value
    datePeriodAffected: "",
    numDaysAffected: "",
    hoursAffected: 13,
    hrsMins: "13hrs 0mins",
  },
  {
    id: "full-total",
    client: "Full Total",
    statusChangedFrom: "Active", // Dummy value
    statusChangedTo: "In Hospital", // Dummy value
    datePeriodAffected: "",
    numDaysAffected: "",
    hoursAffected: 13,
    hrsMins: "13hrs 0mins",
  },
];

/**
 * Helper function to map status to Chip color.
 */
const getStatusProps = (
  status:
    | HoursAffectedItem["statusChangedFrom"]
    | HoursAffectedItem["statusChangedTo"]
) => {
  switch (status) {
    case "Active":
      return {
        label: status,
        color: "success" as const,
        variant: "filled" as const,
      };
    case "In Hospital":
      return {
        label: status,
        color: "primary" as const,
        variant: "filled" as const,
      };
    default:
      return {
        label: status,
        color: "default" as const,
        variant: "filled" as const,
      };
  }
};

// =================================================================
// 4. COLUMN DEFINITIONS ⚙️
// =================================================================

const columns: GridColDef<HoursAffectedItem>[] = [
  {
    field: "client",
    headerName: "Client",
    flex: 1.5,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams) => {
      if (params.row.id === "page-total" || params.row.id === "full-total") {
        return (
          <Box sx={{ width: "100%", textAlign: "right", pr: 2 }}>
            {params.value}
          </Box>
        );
      }
      return params.value;
    },
  },
  {
    field: "statusChangedFrom",
    headerName: "Status Changed From",
    flex: 1,
    minWidth: 140,
    renderCell: (params: GridRenderCellParams) =>
      // Only show chip for normal data rows
      params.row.id !== "page-total" && params.row.id !== "full-total" ? (
        <Chip
          {...getStatusProps(
            params.value as HoursAffectedItem["statusChangedFrom"]
          )}
          size="small"
        />
      ) : null,
  },
  {
    field: "statusChangedTo",
    headerName: "Status Changed To",
    flex: 1,
    minWidth: 140,
    renderCell: (params: GridRenderCellParams) =>
      // Only show chip for normal data rows
      params.row.id !== "page-total" && params.row.id !== "full-total" ? (
        <Chip
          {...getStatusProps(
            params.value as HoursAffectedItem["statusChangedTo"]
          )}
          size="small"
        />
      ) : null,
  },
  {
    field: "datePeriodAffected",
    headerName: "Date Period Affected",
    flex: 1.5,
    minWidth: 180,
  },
  {
    field: "numDaysAffected",
    headerName: "Num of days Affected",
    flex: 1,
    minWidth: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "hoursAffected",
    headerName: "Hours Affected",
    flex: 1,
    minWidth: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "hrsMins",
    headerName: "Hrs : Mins",
    flex: 1,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
];

// =================================================================
// 5. MAIN COMPONENT 🖼️
// =================================================================

export default function StatusChangeHoursAffectedMuiGrid() {
  return (
    <Box className="bg-white rounded-lg shadow-xl">
      {/* Report Title & Controls */}
      <Box className="p-4 sm:p-6 border-b border-gray-200 justify-between items-start sm:items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          Status Change Hours Affected
        </h1>

        <Box className="flex items-center gap-3 text-sm">
          <Typography
            component="label"
            htmlFor="date-start"
            sx={{ whiteSpace: "nowrap" }}
          >
            Select dates (DD-MM-YYYY)
          </Typography>
          <TextField
            id="date-start"
            type="date"
            defaultValue="2025-11-01" // 01-11-2025
            size="small"
            sx={{ width: 150 }}
          />
          <Typography>to</Typography>
          <TextField
            id="date-end"
            type="date"
            defaultValue="2025-11-30" // 30-11-2025
            size="small"
            sx={{ width: 150 }}
          />
          <Button variant="contained" color="primary" sx={{ height: 40 }}>
            Search
          </Button>
          <Button
            variant="outlined"
            sx={{ height: 40, color: "gray", borderColor: "gray" }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* Export/Column Visibility Controls */}
      <Box className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <Box className="flex flex-wrap gap-3 text-sm font-medium mb-4 md:mb-0">
          <Button color="inherit" startIcon={<Copy size={16} />}>
            Copy
          </Button>
          <Button color="inherit">Export Excel</Button>
          <Button color="inherit">Export CSV</Button>
          <Button color="inherit">Export PDF</Button>
          <Button color="inherit">Print</Button>
          <Button color="inherit">Area Search</Button>
          <Button color="inherit" startIcon={<Table size={16} />}>
            Column visibility
          </Button>
        </Box>
      </Box>

      {/* MUI DataGrid Table */}
      <Box sx={{ height: 400, width: "100%", borderTop: "1px solid #e5e7eb" }}>
        <DataGrid
          rows={hoursAffectedData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          // Custom styling to mimic hover effect
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f9fafb", // hover:bg-gray-50
            },
          }}
        />
      </Box>
    </Box>
  );
}
