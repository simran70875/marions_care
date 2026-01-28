import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Search,
  Lock,
  Mail,
  ArrowUp, // For sort icon
} from "lucide-react";
import { Box, Chip, Button, TextField, Typography } from "@mui/material";

// =================================================================
// 2. TYPE DEFINITIONS & DUMMY DATA 📋
// Columns and data restructured to match the screenshot
// =================================================================

interface ClientItem {
  id: number;
  clientName: string;
  address: string;
  county: string;
  phone: string;
  dob: string;
  jobType: string;
  status: "Active" | "Archived" | "Pending" | "Reviewed";
  comment: "Created" | "N/A" | "";
  isLocked: boolean;
  isEmail: boolean;
}

const allClientsData: ClientItem[] = [
  {
    id: 230708,
    clientName: "Elisha Bickerton",
    address: "101 Oakmoor Road, Manchester, Lancashire, M23 1WL",
    county: "Lancashire",
    phone: "07756906205, 07756906205",
    dob: "30-11-2001",
    jobType: "MCC SPOT",
    status: "Active",
    comment: "Created",
    isLocked: false,
    isEmail: true,
  },
  {
    id: 230202,
    clientName: "Peter Anthony O'Toole",
    address:
      "Flat 7, Jack Edwards Court, 5 Lapwing Lane, Manchester, England, M20 2NT",
    county: "England",
    phone: "07914003814",
    dob: "08-12-1946",
    jobType: "BLOCK",
    status: "Archived",
    comment: "",
    isLocked: true,
    isEmail: false,
  },
  {
    id: 1,
    clientName: "Staff Training",
    address: "1 Main St, London",
    county: "",
    phone: "123456789",
    dob: "",
    jobType: "Man CCG",
    status: "Archived",
    comment: "",
    isLocked: false,
    isEmail: false,
  },
  {
    id: 230200,
    clientName: "Pamela Wallace",
    address: "52 Thelwall Avenue M14 7WF, Manchester, M14 7WF",
    county: "",
    phone: "07377128404",
    dob: "15-01-1953",
    jobType: "BLOCK",
    status: "Archived",
    comment: "",
    isLocked: false,
    isEmail: false,
  },
  {
    id: 230480,
    clientName: "John Winston Churchill",
    address:
      "Flat 79, 3 Hollyhedge Court Road, Wythenshawe, Manchester, United Kingdom, M22 4ZP",
    county: "United Kingdom",
    phone: "07783070823, Elizabeth - 07783070823",
    dob: "04-07-1953",
    jobType: "MCC SPOT",
    status: "Archived",
    comment: "",
    isLocked: false,
    isEmail: false,
  },
  {
    id: 230691,
    clientName: "Charles 'O Connor",
    address:
      "Longmire Centre, 181 Langley Lane, Wythenshawe, Manchester, M22 4HY",
    county: "Manchester",
    phone: "07444180807",
    dob: "23-04-1998",
    jobType: "MCC SPOT",
    status: "Active",
    comment: "Created",
    isLocked: true,
    isEmail: false,
  },
  {
    id: 230630,
    clientName: "Thomas A Walker",
    address: "12 Yew Tree Lane, Northenden, Manchester, County, M22 4DY",
    county: "County",
    phone: "0161 998 2234, Charlie (Son) 07789814176",
    dob: "28-06-1935",
    jobType: "BLOCK",
    status: "Archived",
    comment: "",
    isLocked: true,
    isEmail: false,
  },
  {
    id: 230644,
    clientName: "Favour Abiodun",
    address: "9 Ridsdale Avenue, Manchester, m20 1eq",
    county: "",
    phone: "07908301119",
    dob: "07-11-2006",
    jobType: "MCC SPOT",
    status: "Active",
    comment: "Created",
    isLocked: false,
    isEmail: false,
  },
];

// =================================================================
// 3. HELPERS 🎨
// =================================================================

const PRIMARY_PURPLE = "blue"; // Assuming this is your primary color
const ACTIVE_GREEN = "#10B981"; // Tailwind green-500
const ARCHIVED_PINK = "#EC4899"; // Tailwind pink-500

/**
 * Helper function to map status to Chip color, matching the screenshot.
 */
const getStatusChip = (status: ClientItem["status"]) => {
  switch (status) {
    case "Active":
      return {
        label: "Active",
        color: "success" as const,
        sx: { bgcolor: ACTIVE_GREEN, color: "white", fontWeight: "bold" },
      };
    case "Archived":
      return {
        label: "Archived",
        color: "error" as const,
        sx: { bgcolor: ARCHIVED_PINK, color: "white", fontWeight: "bold" },
      };
    case "Pending":
      return { label: "Pending", color: "warning" as const };
    case "Reviewed":
      return { label: "Reviewed", color: "primary" as const };
    default:
      return { label: status, color: "default" as const };
  }
};

// =================================================================
// 4. COLUMN DEFINITIONS ⚙️
// Updated columns to match the screenshot
// =================================================================

const columns: GridColDef<ClientItem>[] = [
  {
    field: "id",
    headerName: "No.",
    flex: 0.5,
    minWidth: 70,
    renderHeader: () => (
      // Custom header to show sort icon
      <Box className="flex items-center space-x-1">
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "#4b5563" }}
        >
          No.
        </Typography>
        <ArrowUp size={12} className="text-gray-500" />
      </Box>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Box className="flex items-center space-x-1">
        {params.row.isLocked && <Lock size={12} className="text-pink-500" />}
        {params.row.isEmail && <Mail size={12} className="text-gray-500" />}
        <Typography variant="body2" component="span" fontWeight="normal">
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "clientName",
    headerName: "Name",
    minWidth: 150,
  },
  { field: "address", headerName: "Address", minWidth: 200 },
  { field: "county", headerName: "County", flex: 1, minWidth: 100 },
  { field: "phone", headerName: "Phone", flex: 1.5, minWidth: 150 },
  { field: "dob", headerName: "DOB", flex: 0.8, minWidth: 90 },
  { field: "jobType", headerName: "Job Type", flex: 1, minWidth: 100 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.8,
    minWidth: 100,
    renderCell: (params) => (
      <Chip
        {...getStatusChip(params.value as ClientItem["status"])}
        size="small"
        variant="filled"
      />
    ),
  },
  {
    field: "comment",
    headerName: "Comment",
    flex: 1,
    minWidth: 100,
  },
];

// =================================================================
// 5. MAIN COMPONENT 🖼️
// =================================================================

export default function AllClientsMuiGrid() {
  // Note: The screenshot uses three tabs: Active Clients, Pending Clients, Archived Clients.
  // The main view button is "All Clients".
  const [activeFilter, setActiveFilter] = React.useState("All Clients");

  // Filter buttons data (matching screenshot tabs)
  const filterButtons = [
    "Active Clients",
    "Pending Clients",
    "Archived Clients",
  ];

  return (
    <Box className="bg-white">
      {/* Header & Tabs */}
      <Box className="flex items-center justify-between px-0 py-2 border-b border-gray-200">
        {/* Title */}

        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          All Clients
        </h1>

        {/* Filter Tabs (as full-width buttons) */}
        <Box className="flex flex-1 space-x-1 justify-end">
          {filterButtons.map((label) => (
            <Button
              key={label}
              variant="text"
              onClick={() => setActiveFilter(label)}
              size="medium"
              sx={{
                color: "#6B7280", // Text color for inactive tabs
                borderRadius: 0,
                px: 2,
                py: 0.5,
                fontSize: "0.875rem",
                // Active tab style matching the screenshot (dark purple/primary color)
                ...(activeFilter === label && {
                  bgcolor: PRIMARY_PURPLE,
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: PRIMARY_PURPLE },
                }),
              }}
            >
              {label}
            </Button>
          ))}
          {/* The main active tab style is applied to the All Clients button */}
          <Button
            variant="text"
            onClick={() => setActiveFilter("All Clients")}
            size="medium"
            sx={{
              borderRadius: 0,
              px: 2,
              py: 0.5,
              fontSize: "0.875rem",
              bgcolor: PRIMARY_PURPLE,
              color: "white",
              fontWeight: "bold",
              "&:hover": { bgcolor: PRIMARY_PURPLE },
            }}
          >
            All Clients
          </Button>
        </Box>
      </Box>

      {/* Export/Column Visibility and Search Controls */}
      <Box className="p-3 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200">
        <Box className="flex flex-wrap gap-2 text-sm font-normal mb-3 md:mb-0">
          {/* Buttons matching the screenshot order */}
          {[
            "Rows",
            "Copy",
            "Excel",
            "CSV",
            "PDF",
            "Print",
            "Area Search",
            "Tag Search",
            "Column visibility",
            "Clear Search",
          ].map((label) => (
            <Button
              key={label}
              size="small"
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 400,
                fontSize: 12,
                border: "1px solid #d1d5db", // Light border for button
                color: "#4B5563", // Dark gray text
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
        {/* Search Box on the right */}
        <Box className="flex items-center gap-2">
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "#4B5563" }}
          >
            Search:
          </Typography>
          <TextField
            size="small"
            sx={{ width: 150 }}
            InputProps={{
              // No search icon visible in this specific search box
              endAdornment: <Search size={16} className="text-gray-400 mr-1" />,
            }}
          />
        </Box>
      </Box>

      {/* MUI DataGrid Table */}
      <Box sx={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={allClientsData}
          columns={columns}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: "id", sort: "asc" }] }, // Default sorting based on 'No.'
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          // Styling to match the screenshot's thin lines and look
          sx={{
            border: "none",
            // Stripe effect for rows (white and very light gray/off-white)
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": {
                backgroundColor: "#F9FAFB", // Light gray/off-white (bg-gray-50)
              },
            },
            // Header style
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FFFFFF", // White background
              borderBottom: "1px solid #E5E7EB", // Lighter border
              lineHeight: "normal",
              maxHeight: "none !important",
            },
            // Individual column header cell styling
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #E5E7EB !important", // Thin vertical divider
              height: "unset !important",
              maxHeight: "none !important",
              padding: "8px 12px",
            },
            // Individual cell styling
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              fontSize: 12,
              lineHeight: "1.4 !important",
              padding: "8px 12px",
              borderRight: "1px solid #E5E7EB !important", // Thin vertical divider
              borderBottom: "1px solid #E5E7EB !important", // Thin horizontal divider
            },
            // Column header title capitalization (sentence/title case)
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
              fontSize: 12,
              color: "#4b5563",
              whiteSpace: "normal",
              lineHeight: "1.2",
            },
          }}
        />
      </Box>

      {/* Pagination Footer */}
      <Box className="p-3 border-t flex justify-between items-center text-sm text-gray-600">
        <p>Showing 1 to 10 of 298 entries</p>
        <Box className="flex items-center space-x-2">
          <Button size="small" color="inherit" sx={{ textTransform: "none" }}>
            Previous
          </Button>
          <Chip
            label="1"
            size="small"
            sx={{
              bgcolor: PRIMARY_PURPLE,
              color: "white",
              borderRadius: "4px",
            }}
          />
          <Button size="small" color="inherit" sx={{ textTransform: "none" }}>
            2
          </Button>
          <Button size="small" color="inherit" sx={{ textTransform: "none" }}>
            3
          </Button>
          <Button size="small" color="inherit" sx={{ textTransform: "none" }}>
            ...
          </Button>
          <Button size="small" color="inherit" sx={{ textTransform: "none" }}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
