import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "lucide-react";

const carerList = [
  "Amina Abdalla",
  "Arthur Choularton",
  "Bana Begum Hussain",
  "Eva Kertesz",
  "James Delaney",
  "Julie Wilkinson",
  "Margaret Guilfoyle",
  "Verion Faye Henry",
];

const dummyRows = [
  {
    id: 1,
    carer: "Amina Abdalla",
    client: "Allan Cope",
    distanceKm: 1.856,
    distanceMiles: 1.1533,
    manual: "Yes",
  },
  {
    id: 2,
    carer: "Amina Abdalla",
    client: "Arthur Choularton",
    distanceKm: 5.646,
    distanceMiles: 3.5083,
    manual: "No",
  },
  {
    id: 3,
    carer: "Amina Abdalla",
    client: "Bana Begum Hussain",
    distanceKm: 5.339,
    distanceMiles: 3.3175,
    manual: "Yes",
  },
  {
    id: 4,
    carer: "Amina Abdalla",
    client: "James Delaney",
    distanceKm: 5.598,
    distanceMiles: 3.4784,
    manual: "No",
  },
  {
    id: 5,
    carer: "Amina Abdalla",
    client: "Margaret Guilfoyle",
    distanceKm: 5.5,
    distanceMiles: 3.4175,
    manual: "Yes",
  },
];

const columns: GridColDef[] = [
  { field: "carer", headerName: "Carer", flex: 1, minWidth: 180 },
  { field: "client", headerName: "Client", flex: 1, minWidth: 180 },
  { field: "distanceKm", headerName: "Distance(KM)", flex: 1, minWidth: 150 },
  { field: "distanceMiles", headerName: "Distance(Miles)", flex: 1, minWidth: 150 },
  { field: "manual", headerName: "Manual", flex: 0.5, minWidth: 100 },
  {
    field: "view",
    headerName: "View",
    flex: 0.5,
    minWidth: 100,
    renderCell: () => (
      <span className="text-purple-700 cursor-pointer">●</span>
    ),
  },
];

const CarerSearch: React.FC = () => {
  const [selectedCarer, setSelectedCarer] = useState("Amina Abdalla");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Box>
      {/* Header */}
      <Box className="flex items-center px-0 py-3 border-b border-gray-200 mb-4">
        <Typography variant="h5" className="text-2xl font-normal text-gray-800 ml-4">
          All Travel Clients / Carer
        </Typography>
      </Box>

      {/* Search Controls */}
      <Box className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row items-center gap-3">
        <FormControl variant="outlined" size="small" sx={{ minWidth: 220, bgcolor: "white" }}>
          <InputLabel id="carer-label">Carer Search</InputLabel>
          <Select
            labelId="carer-label"
            value={selectedCarer}
            onChange={(e) => setSelectedCarer(e.target.value)}
            label="Carer Search"
          >
            {carerList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#6B21A8", "&:hover": { backgroundColor: "#581C87" } }}
          className="normal-case text-white shadow-md"
        >
          Generate Report
        </Button>
      </Box>

      {/* Toolbar */}
      <Box className="p-3 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200">
        <Box className="flex flex-wrap gap-2 text-sm font-normal mb-3 md:mb-0">
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
              variant="outlined"
              className="normal-case font-normal text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              {label}
            </Button>
          ))}
        </Box>

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
            className="bg-white rounded-md border border-gray-300"
          />
        </Box>
      </Box>

      {/* Data Table */}
      <Box className="p-4">
        <DataGrid
          rows={dummyRows.filter(
            (row) =>
              row.carer.toLowerCase().includes(searchTerm.toLowerCase()) ||
              row.client.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          className="border border-gray-300 rounded-md"
        />
      </Box>
    </Box>
  );
};

export default CarerSearch;
