import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (matching the screenshot: Dark Purple for 'All Carers' filter)
const PRIMARY_PURPLE = "#7b3b9b";

interface AllCarerRow {
  id: number;
  No: number;
  Name: string;
  Address: string;
  County: string;
  Phone: string;
  Email: string;
  Tags: string;
  NINumber: string;
  StatusChange: string;
  Comment: string;
  RecruitmentSource: string;
}

// Columns defined for the All Carers Report
const allCarersColumns: GridColDef<AllCarerRow>[] = [
  { field: "No", headerName: "No.", width: 60, sortable: true },
  { field: "Name", headerName: "Name", width: 120, sortable: true },
  // Address column spans multiple lines in the screenshot, setting a larger width/flex
  {
    field: "Address",
    headerName: "Address",
    flex: 1.5,
    minWidth: 200,
    sortable: true,
  },
  { field: "County", headerName: "County", width: 80, sortable: true },
  { field: "Phone", headerName: "Phone", width: 120, sortable: true },
  {
    field: "Email",
    headerName: "E-Mail",
    flex: 1,
    minWidth: 150,
    sortable: true,
  },
  { field: "Tags", headerName: "Tags", width: 80, sortable: true },
  { field: "NINumber", headerName: "NI Number", width: 100, sortable: true },
  {
    field: "StatusChange",
    headerName: "Status Change",
    width: 100,
    sortable: true,
  },
  { field: "Comment", headerName: "Comment", width: 100, sortable: true },
  {
    field: "RecruitmentSource",
    headerName: "Recruitment Source",
    width: 150,
    sortable: true,
  },
];

const dummyRows: AllCarerRow[] = [
  {
    id: 1,
    No: 2532,
    Name: "Fatima Abdi",
    Address: "14 Tamworth Apartment, 47 Moss Lane West, Manchester, M15 5PE",
    County: "",
    Phone: "07707040600",
    Email: "fatimaawale591@gmail.com",
    Tags: "",
    NINumber: "SG 64 19 00",
    StatusChange: "11-11-2025",
    Comment: "",
    RecruitmentSource: "",
  },
  {
    id: 2,
    No: 28,
    Name: "Noreen Butt",
    Address: "4 Silverdale Road, Chorlton, Manchester, M21 0SH",
    County: "",
    Phone: "07707063499",
    Email: "nono76@hotmail.co.uk",
    Tags: "",
    NINumber: "",
    StatusChange: "18-08-2022",
    Comment: "Created",
    RecruitmentSource: "",
  },
  // Use some of the actual data rows from the screenshot as dummy data
  {
    id: 3,
    No: 2529,
    Name: "Zainab S",
    Address: "73 Sedgeborough Road, Moss Side, Manchester, M16 7EF",
    County: "",
    Phone: "07530543346",
    Email: "",
    Tags: "",
    NINumber: "",
    StatusChange: "03-04-2023",
    Comment: "",
    RecruitmentSource: "",
  },
  {
    id: 4,
    No: 2314,
    Name: "Hijab Zainab",
    Address: "769A, M12 4GD, M12 4SD",
    County: "M12 4GD",
    Phone: "0742424695",
    Email: "hijab.zainab34@gmail.com",
    Tags: "",
    NINumber: "TL271439D",
    StatusChange: "27-12-2024",
    Comment: "",
    RecruitmentSource: "",
  },
  {
    id: 5,
    No: 2,
    Name: "Fatima Abaunur",
    Address: "16 Clinton Avenue, Fallowfield, Manchester, M14 7LW",
    County: "",
    Phone: "0795710777",
    Email: "fatima4673@hotmail.com",
    Tags: "",
    NINumber: "",
    StatusChange: "18-08-2022",
    Comment: "Created",
    RecruitmentSource: "",
  },
];

// Carer Status filter buttons
const statusFilters = [
  { label: "Active Carers", value: "Active" },
  { label: "Pending Carers", value: "Pending" },
  { label: "Archived Carers", value: "Archived" },
  { label: "All Carers", value: "All" },
];

// Toolbar buttons matching the screenshot
const toolbarButtons = [
  { label: "Rows", variant: "outlined" },
  { label: "Copy", variant: "outlined" },
  { label: "Excel", variant: "outlined" },
  { label: "CSV", variant: "outlined" },
  { label: "PDF", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Area Search", variant: "outlined" },
  { label: "Tag Search", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
  { label: "Clear Search", variant: "outlined" },
  { label: "Save Visibility", variant: "outlined" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const AllCarersReport: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); // Default to 'All Carers'

  // Custom component for the Header with status filter buttons
  const HeaderControls = () => (
    <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
      <Typography variant="h6" className="text-lg font-medium text-gray-800">
        All Carers
      </Typography>
      <Box className="flex gap-2">
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedStatus === filter.value ? "contained" : "outlined"}
            className="normal-case text-xs px-3 py-1"
            onClick={() => setSelectedStatus(filter.value)}
            sx={{
              backgroundColor:
                selectedStatus === filter.value ? PRIMARY_PURPLE : "#fff",
              color: selectedStatus === filter.value ? "white" : "black",
              borderColor: PRIMARY_PURPLE,
              "&:hover": {
                backgroundColor:
                  selectedStatus === filter.value ? PRIMARY_PURPLE : "#f5f5f5",
                borderColor: PRIMARY_PURPLE,
              },
              minWidth: 100,
              padding: "4px 12px",
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box className="bg-white min-h-screen">
      {/* Report Header with Status Filter Buttons */}
      <HeaderControls />

      {/* --- Export/Action Toolbar and Global Search --- */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        {/* Left: Action/Export Buttons */}
        <Box className="flex flex-wrap gap-2">
          {toolbarButtons.map((btn) => (
            <Button
              key={btn.label}
              size="small"
              variant="outlined" // All buttons in this row are outlined
              className={`normal-case text-xs font-normal shadow-sm`}
              sx={{
                color: "#000",
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
                height: 30,
                padding: "0 8px",
              }}
            >
              {btn.label}
            </Button>
          ))}
        </Box>

        {/* Right: Global Search */}
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="font-semibold text-gray-700">
            Search
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
      <Box className="p-0" sx={{ overflowX: "auto" }}>
        <DataGrid
          rows={dummyRows}
          columns={allCarersColumns.map((col) => ({
            ...col,
            flex: col.flex || 0,
            minWidth: col.minWidth || col.width || 100,
          }))}
          disableRowSelectionOnClick
          pageSizeOptions={[50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            // Sort by 'No.' descending to match the screenshot example
            sorting: { sortModel: [{ field: "No", sort: "desc" }] },
          }}
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
                  <Button size="small" disabled>
                    Previous
                  </Button>
                  <Button size="small" disabled>
                    Next
                  </Button>
                </Box>
              </Box>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default AllCarersReport;
