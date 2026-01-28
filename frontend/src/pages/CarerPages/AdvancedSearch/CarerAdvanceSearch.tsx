import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "lucide-react";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

const PRIMARY_GREEN = "#10B981"; // Tailwind Emerald-500, matching the search button color in the screenshot
const ACCENT_BLUE = "#3B82F6"; // Tailwind Blue-500

interface CarerContact {
  id: number;
  clientRef: string; // The reference number next to the client's name
  clientName: string;
  clientAddress?: string;
  clientCounty?: string;
  clientPhone?: string;
  number?: string;
  name: string;
  address?: string;
  phone: string;
  relation: string;
  contactNight: string;
}

const contactTypes = [
  "Emergency Contact", // Highlighted in the screenshot
  "Next Of Kin",
  "Social Worker",
  "Pharmacy",
  "Courtney",
  "District Nurses",
  "INT",
  "Nagma",
];

const dummyRows: CarerContact[] = [
  {
    id: 1,
    clientRef: "2559",
    clientName: "Fawtun Cawad",
    clientAddress: "",
    clientCounty: "Manchester",
    clientPhone: "07518698484",
    number: "07518698484",
    name: "Mohamed Awad",
    address: "",
    phone: "07894546920",
    relation: "Father",
    contactNight: "",
  },
  {
    id: 2,
    clientRef: "2308",
    clientName: "Bhushan Mehra",
    clientAddress: "88, Ayres Road, Manchester",
    clientCounty: "Lancashire",
    clientPhone: "07724420003",
    number: "07724420003",
    name: "Soumik Halder",
    address: "",
    phone: "07975710291",
    relation: "Friend",
    contactNight: "Yes",
  },
  {
    id: 3,
    clientRef: "2453",
    clientName: "Tolulope Oluwashan-Amure",
    clientAddress: "34 Hulme High Street",
    clientCounty: "Manchester",
    clientPhone: "07593974959",
    number: "07593974959",
    name: "Ibrahim Gbolahan",
    address: "",
    phone: "07592434723",
    relation: "Husband",
    contactNight: "Yes",
  },
  {
    id: 4,
    clientRef: "2528",
    clientName: "Zainab S",
    clientAddress: "73 Sedgeborough Road, Moss Side, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07538543346",
    number: "07538543346",
    name: "Muhammad",
    address: "",
    phone: "07576927373",
    relation: "Husband",
    contactNight: "",
  },
];

const columns: GridColDef<CarerContact>[] = [
  {
    field: "clientRef",
    headerName: "Ref",
    width: 80,
    sortable: false,
    renderCell: (params) => params.row.clientRef,
  },
  {
    field: "clientName",
    headerName: "Client Name",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Typography
        variant="body2"
        className="text-purple-700 font-medium cursor-pointer"
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "clientAddress",
    headerName: "Address",
    width: 250,
    sortable: false,
    renderCell: (params) => params.row.clientAddress || "",
  },
  {
    field: "clientCounty",
    headerName: "County",
    width: 120,
    sortable: false,
    renderCell: (params) => params.row.clientCounty || "",
  },
  {
    field: "clientPhone",
    headerName: "Phone",
    width: 120,
    sortable: false,
    renderCell: (params) => params.row.clientPhone || "",
  },
  {
    field: "number",
    headerName: "Number",
    width: 120,
    sortable: false,
    renderCell: (params) => params.row.number || "",
  },
  { field: "name", headerName: "Name", width: 150, sortable: false },
  {
    field: "address",
    headerName: "Address",
    width: 200,
    sortable: false,
    renderCell: (params) => params.row.address || "",
  },
  { field: "phone", headerName: "Phone", width: 120, sortable: false },
  { field: "relation", headerName: "Relation", width: 100, sortable: false },
  {
    field: "contactNight",
    headerName: "Contact Night",
    width: 100,
    sortable: false,
    renderCell: (params) => params.row.contactNight || "",
  },
  {
    field: "view",
    headerName: "View",
    width: 80,
    sortable: false,
    renderCell: () => (
      <Button
        variant="contained"
        size="small"
        className={`normal-case text-white shadow-sm hover:bg-blue-600 ${ACCENT_BLUE}`}
        sx={{ backgroundColor: ACCENT_BLUE, minWidth: "60px" }}
      >
        View
      </Button>
    ),
  },
];

const toolbarButtons = [
  { label: "Copy", variant: "outlined" },
  { label: "Export Excel", variant: "outlined" },
  { label: "Export CSV", variant: "outlined" },
  { label: "Export PDF", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const CarerAdvanceSearch: React.FC = () => {
  const [selectedContactType, setSelectedContactType] = useState(
    contactTypes[0]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleContactTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedContactType(event.target.value);
  };

  const handleSearchClick = () => {
    // Implement actual search/filter logic here based on selectedContactType
    console.log("Search for:", selectedContactType);
  };

  const handleClearClick = () => {
    // Implement clear functionality
    setSelectedContactType(contactTypes[0]);
    setSearchTerm("");
  };

  const filteredRows = dummyRows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box className="bg-white min-h-screen">
      {/* Header: Reports > Carer Contacts */}
      <Box className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-300">
        <Typography variant="h5" className="text-xl font-normal text-gray-800">
          Reports &gt; Carer Contacts
        </Typography>
      </Box>

      {/* Top Search Controls */}
      <Box className="p-4 flex items-center gap-3 border-b border-gray-200">
        {/* Contact Type Dropdown */}
        <FormControl
          variant="outlined"
          size="small"
          sx={{ minWidth: 220, bgcolor: "white" }}
        >
          <Select
            value={selectedContactType}
            onChange={handleContactTypeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="border-gray-300 shadow-sm"
          >
            {contactTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
          variant="contained"
          onClick={handleSearchClick}
          className="normal-case text-white shadow-md"
          sx={{
            backgroundColor: PRIMARY_GREEN,
            "&:hover": { backgroundColor: "#059669" },
          }}
        >
          Search
        </Button>

        {/* Clear Button */}
        <Button
          variant="outlined"
          onClick={handleClearClick}
          className="normal-case text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          Clear
        </Button>

    
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
              className={`normal-case text-sm font-normal border-gray-300 shadow-sm`}
              sx={{
                borderColor: "#E5E7EB", // Default light border
                color: "#000", // Purple text for exports
                "&:hover": {
                  backgroundColor: "#F3F4F6", // Light hover background
                  borderColor: "#D1D5DB", // Darker border on hover
                },
              }}
            >
              {btn.label}
            </Button>
          ))}
        </Box>

        {/* Right: Global Search (re-added to match the right alignment in the screenshot) */}
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="font-semibold text-gray-700">
            Search:
          </Typography>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          rows={filteredRows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
          className="border border-gray-300 rounded-md"
          sx={{
            // Styling to match the simple, clean table design in the screenshot
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6", // light gray header
              color: "#374151",
              fontWeight: "600",
              minHeight: "35px !important",
              lineHeight: "35px !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold", // Header text bolding
            },
            "& .MuiDataGrid-row": {
              maxHeight: "35px !important", // Compact rows
            },
            "& .MuiDataGrid-cell": {
              padding: "4px 8px !important",
            },
          }}
        />
        {/* Footer info matching the screenshot */}
        <Typography variant="caption" className="text-gray-600 mt-2 block">
          Showing 1 to {filteredRows.length} of {filteredRows.length} entries
        </Typography>
      </Box>
    </Box>
  );
};

export default CarerAdvanceSearch;
