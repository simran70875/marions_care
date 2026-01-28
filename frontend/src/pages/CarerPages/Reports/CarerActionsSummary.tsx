import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  MenuItem, // Import MenuItem for the dropdown
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (matching the screenshot: Blue for the Search button)
const PRIMARY_BLUE = "#1976d2"; // Standard MUI Blue color for Search
const STATUS_OPTIONS = ["Pending", "Active"]; // Options for the State dropdown

interface ActionReportRow {
  id: number;
  No: number;
  Name: string;
  StatusChangeDate: string;
  ActionComment: string;
  HasContractSigned: string;
  HasBackgroundCheckReturned: string;
}

const actionReportColumns: GridColDef<ActionReportRow>[] = [
  { field: "No", headerName: "No.", flex:1, sortable: true },
  { field: "Name", headerName: "Name", flex:1, sortable: true },
  { field: "StatusChangeDate", headerName: "Status Change Date", flex:1, sortable: true },
  { field: "ActionComment", headerName: "Action Comment", flex:1, sortable: true },
  { field: "HasContractSigned", headerName: "Has the carer signed and returned the contract", flex:1, sortable: true },
  { field: "HasBackgroundCheckReturned", headerName: "Has the carer returned the background check",flex:1, sortable: true },
];

const dummyRows: ActionReportRow[] = [
  // Placeholder data since the screenshot shows "No data available in table"
];

// Toolbar buttons based on the Actions Report screenshot
const toolbarButtons = [
  { label: "Copy", variant: "outlined" },
  { label: "Export Excel", variant: "outlined" },
  { label: "Export CSV", variant: "outlined" },
  { label: "Export PDF", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
  { label: "Area Search", variant: "outlined" },
  { label: "Tag Search", variant: "outlined" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const ActionsReport: React.FC = () => {
  const [selectedState, setSelectedState] = useState("Pending"); // Default to 'Pending' as shown selected
  const [globalSearch, setGlobalSearch] = useState("");

  const handleSearchClick = () => {
    console.log("Search for Actions Report with State:", selectedState);
  };

  return (
    <Box className="bg-white min-h-screen">
      {/* Report Header */}
      <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
        <Typography variant="h6" className="text-lg font-medium text-gray-800">
          Actions Report
        </Typography>
        <Typography variant="body2" className="text-sm text-gray-600">
          Carer Action Summary V2
        </Typography>
      </Box>

      {/* --- Top Search/Filter Controls --- */}
      <Paper
        elevation={0}
        className="p-4 flex flex-col gap-4 border-b border-gray-200"
      >
        {/* State Selection Row */}
        <Box className="flex items-end gap-2">
          <Box>
            <Typography variant="caption" className="text-gray-600 block mb-1">
              Select State
            </Typography>
            {/* Using TextField with select to mimic the dropdown behavior in the screenshot */}
            <TextField
              select
              size="small"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              sx={{ width: 150, bgcolor: "white" }}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem 
                  key={option} 
                  value={option}
                  // Highlight the selected option (Active) to match the screenshot look
                  sx={option === 'Active' ? { backgroundColor: PRIMARY_BLUE, color: 'white' } : {}} 
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          
          {/* Search Button */}
          <Button
            variant="contained"
            onClick={handleSearchClick}
            className="normal-case text-white shadow-md"
            sx={{
              backgroundColor: PRIMARY_BLUE,
              "&:hover": { backgroundColor: PRIMARY_BLUE },
              minWidth: 80,
              height: 35,
            }}
          >
            Search
          </Button>
        </Box>
      </Paper>

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
              {btn.label.replace("Export ", "")}
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
            placeholder=""
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            sx={{ width: 200 }}
            InputProps={{
              style: { height: 32 },
            }}
            className="bg-white rounded-md border border-gray-300 shadow-sm"
          />
        </Box>
      </Box>

      {/* Data Table */}
      <Box className="p-0">
        <DataGrid
          rows={dummyRows}
          columns={actionReportColumns}
          disableRowSelectionOnClick
          pageSizeOptions={[50]}
          initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
          className="border border-gray-300"
          getRowHeight={() => 35}
          slots={{
            // Custom slot to render the inline search fields above the data rows
            footer: () => (
              <Box className="flex items-center border-t border-gray-200 justify-between">
                <Box className="p-2 text-sm text-gray-600">
                  Showing 0 to 0 of 0 entries
                </Box>
                <Box className="flex justify-end p-2 text-sm text-gray-600">
                    <Button size="small" disabled>Previous</Button>
                    <Button size="small" disabled>Next</Button>
                </Box>
              </Box>
            ),
          }}
        
        />
   
      
      </Box>
    </Box>
  );
};

export default ActionsReport;