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
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "lucide-react";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

const PRIMARY_BLUE = "#2563EB"; // Tailwind Blue-600

interface ClientContact {
  id: number;
  clientNo: string;
  clientName: string;
  clientAddress: string;
  clientCounty: string;
  clientPhone: string;
  clientMobile: string;
  area: string;
  contactName: string;
  contactJobType: string;
  contactAddress: string;
  phone: string;
  relation: string;
  contactNight: string;
  originCode: string;
}

const contactTypes = [
  "All Contacts",
  "No contact assigned",
  "Emergency Contact",
  "Next Of Kin",
  "Key Holder",
  "GP",
  "Public Health Nurse",
  "Occupational Therapy",
  "Physiotherapy",
  "Funder",
  "Professional Contacts",
  "Care Manager",
  "Consultant",
  "Invoice",
  "Personal Contacts",
  "Social Worker",
  "Pharmacy",
  "Courtney",
  "District Nurses",
  "INT",
];

const initialClientContacts: ClientContact[] = [
  {
    id: 1,
    clientNo: "230691",
    clientName: "CONNOR",
    clientAddress: "Longmire Centre, 181 Langley Lane, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07444180807",
    clientMobile: "07444180807",
    area: "Wythenshawe",
    contactName: "Pauline Connor",
    contactJobType: "Aunt",
    contactAddress: "",
    phone: "07809837872",
    relation: "Aunt",
    contactNight: "",
    originCode: "",
  },
  {
    id: 2,
    clientNo: "230691",
    clientName: "CONNOR",
    clientAddress: "Longmire Centre, 181 Langley Lane, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07444180807",
    clientMobile: "07444180807",
    area: "Wythenshawe",
    contactName: "Sophie Beccaria-Adams",
    contactJobType: "Brother",
    contactAddress: "",
    phone: "07773281750",
    relation: "Brother",
    contactNight: "",
    originCode: "",
  },
  {
    id: 3,
    clientNo: "230691",
    clientName: "CONNOR",
    clientAddress: "Longmire Centre, 181 Langley Lane, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07444180807",
    clientMobile: "07444180807",
    area: "Wythenshawe",
    contactName: "Andrew",
    contactJobType: "",
    contactAddress: "",
    phone: "07426755982",
    relation: "Brother",
    contactNight: "",
    originCode: "",
  },
  {
    id: 4,
    clientNo: "230691",
    clientName: "CONNOR",
    clientAddress: "Longmire Centre, 181 Langley Lane, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07444180807",
    clientMobile: "07444180807",
    area: "Wythenshawe",
    contactName: "Northenden Group Practice",
    contactJobType: "GP",
    contactAddress: "59 Palatine Road, Manchester, England",
    phone: "0161 998",
    relation: "",
    contactNight: "",
    originCode: "",
  },
  {
    id: 5,
    clientNo: "230691",
    clientName: "CONNOR",
    clientAddress: "Longmire Centre, 181 Langley Lane, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07444180807",
    clientMobile: "07444180807",
    area: "Wythenshawe",
    contactName: "Well Pharmacy",
    contactJobType: "Pharmacy",
    contactAddress: "191 Palatine Road, Northenden, Manchester, England",
    phone: "0161 945",
    relation: "",
    contactNight: "",
    originCode: "",
  },
  {
    id: 6,
    clientNo: "230644",
    clientName: "Favour",
    clientAddress: "9 Ridsdale Avenue, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07908301119",
    clientMobile: "07908301119",
    area: "Chorlton",
    contactName: "Ruth Abudun",
    contactJobType: "Mother",
    contactAddress: "9 Ridsdale Avenue, Manchester",
    phone: "07908301119",
    relation: "Mother",
    contactNight: "",
    originCode: "",
  },
  {
    id: 7,
    clientNo: "230644",
    clientName: "Favour",
    clientAddress: "9 Ridsdale Avenue, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07908301119",
    clientMobile: "07908301119",
    area: "Chorlton",
    contactName: "Angela - Abbott Nurse",
    contactJobType: "Nurse",
    contactAddress: "",
    phone: "07907901113",
    relation: "",
    contactNight: "",
    originCode: "",
  },
  {
    id: 8,
    clientNo: "230644",
    clientName: "Favour",
    clientAddress: "9 Ridsdale Avenue, Manchester",
    clientCounty: "Manchester",
    clientPhone: "07908301119",
    clientMobile: "07908301119",
    area: "Chorlton",
    contactName: "Mary Bamagya",
    contactJobType: "Social Worker",
    contactAddress: "",
    phone: "07903223558",
    relation: "Social Worker",
    contactNight: "",
    originCode: "",
  },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const ClientContactSearch: React.FC = () => {
  const [selectedContactType, setSelectedContactType] =
    useState<string>("All Contacts");
  const [mainSearchTerm, setMainSearchTerm] = useState<string>("");
  const [tableSearchTerm, setTableSearchTerm] = useState<string>("");

  const handleContactTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedContactType(event.target.value);
  };

  const handleMainSearch = () => {
    console.log("Main Search Triggered:", {
      selectedContactType,
      searchTerm: mainSearchTerm,
    });
  };

  const handleClearSearch = () => {
    setSelectedContactType("All Contacts");
    setMainSearchTerm("");
    setTableSearchTerm("");
  };

  const filteredContacts = initialClientContacts.filter((contact) => {
    const matchesMainSearch =
      mainSearchTerm === "" ||
      Object.values(contact).some((value) =>
        String(value).toLowerCase().includes(mainSearchTerm.toLowerCase())
      );

    const matchesTableSearch =
      tableSearchTerm === "" ||
      Object.values(contact).some((value) =>
        String(value).toLowerCase().includes(tableSearchTerm.toLowerCase())
      );

    return matchesMainSearch && matchesTableSearch;
  });

  const columns: GridColDef[] = [
    { field: "clientNo", headerName: "Client No.", width: 110 },
    { field: "clientName", headerName: "Client Name", width: 130 },
    { field: "clientAddress", headerName: "Client Address", width: 230 },
    { field: "clientCounty", headerName: "Client County", width: 130 },
    { field: "clientPhone", headerName: "Client Phone", width: 130 },
    { field: "clientMobile", headerName: "Client Phone (Mobile)", width: 160 },
    { field: "area", headerName: "Area", width: 100 },
    { field: "contactName", headerName: "Contact Name", width: 150 },
    { field: "contactJobType", headerName: "Contact Job Type", width: 150 },
    { field: "contactAddress", headerName: "Contact Address", width: 230 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "relation", headerName: "Relation", width: 120 },
    { field: "contactNight", headerName: "Contact C Night", width: 130 },
    { field: "originCode", headerName: "Origin Code", width: 130 },
  ];

  return (
    <Box className="bg-white">
      {/* Header */}
      <Box className="flex items-center px-0 py-2 border-b border-gray-200 mb-4">
        <Typography
          variant="h5"
          className="text-2xl font-normal text-gray-800 mr-4 flex-shrink-0"
        >
          Reports &gt; Client Contacts
        </Typography>
      </Box>

      {/* Top Search Controls */}
      <Box className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-6 flex flex-col md:flex-row items-center gap-3">
        <FormControl
          variant="outlined"
          size="small"
          sx={{ minWidth: 350, bgcolor: "white" }}
        >
          <InputLabel id="contact-type-label">All Contacts</InputLabel>
          <Select
            labelId="contact-type-label"
            id="contact-type-select"
            value={selectedContactType}
            onChange={handleContactTypeChange}
            label="All Contacts"
          >
            {contactTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleMainSearch}
          style={{ backgroundColor: PRIMARY_BLUE }}
          className="normal-case text-white shadow-md hover:bg-blue-700"
        >
          Search
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearSearch}
          className="normal-case text-gray-600 border-gray-300 hover:bg-gray-100"
        >
          Clear
        </Button>
      </Box>

      {/* Table Action Buttons */}
      <Box className="p-3 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 mb-4">
        <Box className="flex flex-wrap gap-2 text-sm font-normal mb-3 md:mb-0">
          {[
            "Copy",
            "Excel",
            "CSV",
            "PDF",
            "Print",
            "Area Search",
            "Column visibility",
          ].map((label: string) => (
            <Button
              key={label}
              size="small"
              variant="outlined"
              className="normal-case font-normal border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {label}
            </Button>
          ))}
        </Box>

        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#EF4444" }}
            className="normal-case text-white shadow-md hover:bg-red-600"
          >
            Client Contacts History
          </Button>

          <div className="flex items-center gap-2 mt-2">
            <Typography
              variant="body2"
              className="font-bold text-gray-700 flex-shrink-0"
            >
              Search:
            </Typography>
            <TextField
              size="small"
              placeholder="Search..."
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
              sx={{ width: 200 }}
              InputProps={{
                endAdornment: (
                  <Search size={16} className="text-gray-400 mr-1" />
                ),
              }}
              className="rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </Box>

      {/* DataGrid Table */}
      <Box className="h-[600px] w-full border border-gray-300 rounded-lg shadow-sm">
        <DataGrid
          rows={filteredContacts}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          disableColumnMenu
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: "600",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ClientContactSearch;
