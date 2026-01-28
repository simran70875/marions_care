import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Search } from "lucide-react";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions matching the screenshot legend and styles
const RED_CAPACITY_THRESHOLD = "#FBCFE8"; // Light Pink/Red for > 75%
const GREEN_CAPACITY_THRESHOLD = "#D1FAE5"; // Light Green for between 25% and 75%
const BLUE_CAPACITY_THRESHOLD = "#DBEAFE"; // Light Blue for between 1% and 25%
const PRIMARY_GREEN = "#4C779C"; // Dark Blue/Gray-Blue from the original search button

interface CapacityRow {
  id: number;
  firstName: string;
  surname: string;
  area: string;
  hrsMM: string; // Contracted Hours Used(%) Per Carer
  hrs: string; // Contracted Hours Used(%) Per Carer
  daysInRow: number;
  wed03: number | string;
  thu04: number | string;
  fri05: number | string;
  sat06: number | string;
  sun07: number | string;
  mon08: number | string;
  tue09: number | string;
  wed10: number | string;
}

// Helper function for conditional cell styling
const renderCapacityCell = (params: GridRenderCellParams<any, number | string>) => {
  const value = typeof params.value === 'string' ? parseFloat(params.value) : params.value;
  let backgroundColor = 'inherit';
  let color = 'inherit';

  // Check the Hrs column value for the specific color coding logic
  const hrsValue = parseFloat(params.row.hrs) || 0;

  if (params.field === 'hrs') {
    if (hrsValue > 25) { // Assuming red is for high capacity usage
      backgroundColor = RED_CAPACITY_THRESHOLD;
    }
  } else if (params.field.match(/^(mon|tue|wed|thu|fri|sat|sun)/)) {
    // Styling the daily capacity cells based on the legend logic
    if (value === 0) {
      backgroundColor = 'inherit'; // White/default background
      color = '#374151'; // Darker text for visibility
    } else if (value && value >= 75) {
      backgroundColor = RED_CAPACITY_THRESHOLD; // 75% or more
      color = '#991B1B'; // Dark red text
    } else if (value && value >= 25 && value < 75) {
      backgroundColor = GREEN_CAPACITY_THRESHOLD; // Between 25% and 75%
      color = '#065F46'; // Dark green text
    } else if (value && value >= 1 && value < 25) {
      backgroundColor = BLUE_CAPACITY_THRESHOLD; // Between 1% and 25%
      color = '#1E40AF'; // Dark blue text
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        color: color,
        border: 'none', // Remove the default cell border for a cleaner look
      }}
    >
      {params.value}
    </Box>
  );
};


const capacityColumns: GridColDef<CapacityRow>[] = [
  { field: "firstName", headerName: "First Name", width: 120, sortable: false },
  { field: "surname", headerName: "Surname", width: 120, sortable: false },
  { field: "area", headerName: "Area", width: 150, sortable: false },
  { field: "hrsMM", headerName: "Hrs:MM", width: 100, sortable: false },
  { field: "hrs", headerName: "Hrs", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "daysInRow", headerName: "Days in Row", width: 110, sortable: false },
  // Daily Capacity Columns (mimicking the date range in the screenshot: Wed 03 - Wed 10)
  { field: "wed03", headerName: "Wed 03", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "thu04", headerName: "Thu 04", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "fri05", headerName: "Fri 05", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "sat06", headerName: "Sat 06", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "sun07", headerName: "Sun 07", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "mon08", headerName: "Mon 08", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "tue09", headerName: "Tue 09", width: 80, sortable: false, renderCell: renderCapacityCell },
  { field: "wed10", headerName: "Wed 10", width: 80, sortable: false, renderCell: renderCapacityCell },
];

const dummyRows: CapacityRow[] = [
  // Noreen Butt
  { id: 1, firstName: "Noreen", surname: "Butt", area: "Wythenshawe", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  { id: 2, firstName: "Noreen", surname: "Butt", area: "Wythenshawe", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  { id: 3, firstName: "Noreen", surname: "Butt", area: "Wythenshawe", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  // Fatima Abanur
  { id: 4, firstName: "Fatima", surname: "Abanur", area: "Chorlton", hrsMM: "28.20", hrs: "28.33", daysInRow: 5, wed03: "5.25", thu04: "5.25", fri05: "3.67", sat06: "3.67", sun07: "5.25", mon08: "5.25", tue09: "5.25", wed10: "5.25" },
  { id: 5, firstName: "Fatima", surname: "Abanur", area: "Chorlton", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  { id: 6, firstName: "Fatima", surname: "Abanur", area: "Chorlton", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  // Amina Abdalla
  { id: 7, firstName: "Amina", surname: "Abdalla", area: "Longsight", hrsMM: "29.10", hrs: "29.17", daysInRow: 3, wed03: "5.50", thu04: "6.25", fri05: "5.25", sat06: "", sun07: "", mon08: "6", tue09: "6.08", wed10: "" },
  { id: 8, firstName: "Amina", surname: "Abdalla", area: "Longsight", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  { id: 9, firstName: "Amina", surname: "Abdalla", area: "Longsight", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
  // Nimo Abdi
  { id: 10, firstName: "Nimo", surname: "Abdi", area: "Chorlton", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0", thu04: "0", fri05: "0", sat06: "0", sun07: "0", mon08: "0", tue09: "0", wed10: "0" },
  { id: 11, firstName: "Nimo", surname: "Abdi", area: "Chorlton", hrsMM: "12:55", hrs: "12.92", daysInRow: 1, wed03: "", thu04: "", fri05: "4.75", sat06: "4.5", sun07: "", mon08: "3.67", tue09: "", wed10: "" },
  { id: 12, firstName: "Nimo", surname: "Abdi", area: "Chorlton", hrsMM: "0", hrs: "0", daysInRow: 0, wed03: "0%", thu04: "0%", fri05: "0%", sat06: "0%", sun07: "0%", mon08: "0%", tue09: "0%", wed10: "0%" },
];


const toolbarButtons = [
  { label: "Show 50 rows", variant: "outlined" },
  { label: "Copy", variant: "outlined" },
  { label: "Export Excel", variant: "outlined" },
  { label: "Export CSV", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Area Search", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const ContractedCapacityAnalysis: React.FC = () => {
  const [capacityUnit, setCapacityUnit] = useState<"%" | "Hrs">("%");
  const [startDate, setStartDate] = useState("03-12-2025");
  const [endDate, setEndDate] = useState("10-12-2025");

  const handleSearchClick = () => {
    // Implement actual search/filter logic here
    console.log("Search for:", { startDate, endDate, capacityUnit });
  };

  const handleClearClick = () => {
    // Implement clear functionality
    setStartDate("03-12-2025");
    setEndDate("10-12-2025");
    setCapacityUnit("%");
  };

  return (
    <Box className="bg-white min-h-screen">
      {/* Report Header */}
      <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300">
        <Typography variant="h6" className="text-lg font-medium text-gray-800">
          Contracted Capacity Analysis
        </Typography>
        <Typography variant="body2" className="text-sm text-gray-600">
          Report: Contracted Hours Used(%) Per Carer Grouped by Contracted, Scheduled, Capacity per day
        </Typography>
      </Box>

      {/* --- Top Search/Filter Controls --- */}
      <Paper elevation={0} className="p-4 flex items-center gap-3 border-b border-gray-200">
        <TextField
          size="small"
          label=""
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: 120, bgcolor: "white" }}
        />
        <Typography>to</Typography>
        <TextField
          size="small"
          label=""
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ width: 120, bgcolor: "white" }}
        />

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Capacity Unit Toggle */}
        <RadioGroup
          row
          value={capacityUnit}
          onChange={(e) => setCapacityUnit(e.target.value as "%" | "Hrs")}
        >
          <FormControlLabel
            value="% Capacity"
            control={<Radio size="small" />}
            label="% Capacity"
            sx={{
                '& .MuiSvgIcon-root': { fontSize: 16 }
            }}
          />
          <FormControlLabel
            value="Hrs"
            control={<Radio size="small" />}
            label="Hrs"
            sx={{
                '& .MuiSvgIcon-root': { fontSize: 16 }
            }}
          />
        </RadioGroup>
        
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

        {/* Search and Clear Buttons */}
        <Button
          variant="contained"
          onClick={handleSearchClick}
          className="normal-case text-white shadow-md"
          sx={{
            backgroundColor: PRIMARY_GREEN,
            "&:hover": { backgroundColor: PRIMARY_GREEN },
            minWidth: 100
          }}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={handleClearClick}
          className="normal-case text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          Clear
        </Button>
      </Paper>

      {/* --- Legend --- */}
      <Box className="p-4 flex flex-wrap items-center gap-4 border-b border-gray-200">
        <Box
          className="flex items-center gap-2 px-3 py-1 rounded-md"
          sx={{ backgroundColor: RED_CAPACITY_THRESHOLD, border: '1px solid #FBCFE8' }}
        >
          <Typography variant="body2" className="font-medium">
            75% of more
          </Typography>
        </Box>
        <Box
          className="flex items-center gap-2 px-3 py-1 rounded-md"
          sx={{ backgroundColor: GREEN_CAPACITY_THRESHOLD, border: '1px solid #D1FAE5' }}
        >
          <Typography variant="body2" className="font-medium">
            Between 75% and 25%
          </Typography>
        </Box>
        <Box
          className="flex items-center gap-2 px-3 py-1 rounded-md"
          sx={{ backgroundColor: BLUE_CAPACITY_THRESHOLD, border: '1px solid #DBEAFE' }}
        >
          <Typography variant="body2" className="font-medium">
            Between 25% and 1%
          </Typography>
        </Box>
      </Box>
      
      {/* --- Export/Action Toolbar --- */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        {/* Left: Export Buttons */}
        <Box className="flex flex-wrap gap-2">
          {toolbarButtons.map((btn) => (
            <Button
              key={btn.label}
              size="small"
              variant={btn.variant as "outlined" | "contained"}
              className={`normal-case text-sm font-normal shadow-sm`}
              sx={{
                color: "#000",
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
              }}
            >
              {btn.label.replace('Export ', '')} {/* Clean up labels to match screenshot */}
            </Button>
          ))}
        </Box>

        {/* Right: Global Search */}
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="font-semibold text-gray-700">
            Search:
          </Typography>
          <TextField
            size="small"
            placeholder="Search..."
            sx={{ width: 200 }}
            InputProps={{
              endAdornment: <Search size={16} className="text-gray-400 mr-1" />,
            }}
            className="bg-white rounded-md border border-gray-300 shadow-sm"
          />
        </Box>
      </Box>

      {/* Data Table */}
      <Box className="p-4">
        <DataGrid
          rows={dummyRows}
          columns={capacityColumns}
          autoHeight
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[50]}
          initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
          className="border border-gray-300 rounded-md"
          getRowHeight={() => 35} // Explicitly set row height
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
              minHeight: "35px !important",
              lineHeight: "35px !important",
              borderBottom: '1px solid #d1d5db',
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "35px !important",
              borderBottom: '1px solid #e5e7eb',
            },
            "& .MuiDataGrid-cell": {
              padding: "0px 8px !important",
              lineHeight: "35px !important",
              maxHeight: "35px !important",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
                // Remove odd/even row shading and rely on data colors
                '& .MuiDataGrid-row:nth-of-type(odd)': {
                    backgroundColor: 'white',
                },
                '& .MuiDataGrid-row:nth-of-type(even)': {
                    backgroundColor: '#f9fafb', // Very light gray for even rows
                },
            }
          }}
        />
        {/* Footer info matching the screenshot */}
        <Typography variant="caption" className="text-gray-600 mt-2 block">
          Showing 1 to {dummyRows.length} of {dummyRows.length} entries
        </Typography>
      </Box>
    </Box>
  );
};

export default ContractedCapacityAnalysis;