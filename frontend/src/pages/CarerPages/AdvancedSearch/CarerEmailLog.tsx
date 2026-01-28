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

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

const PRIMARY_PURPLE = "#6B21A8"; // Deep Purple for buttons and accents

interface EmailLogEntry {
  id: number;
  date: string;
  time: string;
  logType: string;
  sentBy: string;
  email: string;
  carer: string;
  carerArea: string;
  sentDate: string;
  sentTime: string;
  openedDate: string;
  openedTime: string;
  bounced: string;
  complaint: string;
  status: string; // Delivered, Opened, Bounced
}

const emailLogTypes = ["E-mail Log", "SMS Log", "App Log"];
const clientAreas = [
  "Select Area",
  "All Client Area",
  "Cheetham Hill",
  "Chorlton",
  "Didsbury",
  "Longsight",
];


const dummyRows: EmailLogEntry[] = [
  // Keeping just the first few rows for brevity, as requested
  {
    id: 1,
    date: "02-Dec-2025",
    time: "04:13 pm",
    logType: "Late Login in Sent",
    sentBy: "sharon@testrail@.co.uk",
    email: "clemens77@gmail.co.uk",
    carer: "Sharon Threfall",
    carerArea: "Wythenshawe",
    sentDate: "02-Dec-2025",
    sentTime: "04:12:09 pm",
    openedDate: "02-Dec-2025",
    openedTime: "04:12:09 pm",
    bounced: "",
    complaint: "",
    status: "Bounced",
  },
  {
    id: 2,
    date: "02-Dec-2025",
    time: "04:08 pm",
    logType: "Late Login in Sent",
    sentBy: "sharon@testrail@.co.uk",
    email: "clemens77@gmail.co.uk",
    carer: "Sharon Threfall",
    carerArea: "Wythenshawe",
    sentDate: "02-Dec-2025",
    sentTime: "04:07:07 pm",
    openedDate: "",
    openedTime: "",
    bounced: "",
    complaint: "",
    status: "Delivered",
  },
  {
    id: 3,
    date: "02-Dec-2025",
    time: "04:07 pm",
    logType: "Late Login in Sent",
    sentBy: "jennabdbd@gmail.com",
    email: "suniel@gmail.com",
    carer: "Susan Clemed",
    carerArea: "Chorlton",
    sentDate: "02-Dec-2025",
    sentTime: "04:06:07 pm",
    openedDate: "",
    openedTime: "",
    bounced: "",
    complaint: "",
    status: "Delivered",
  },
  {
    id: 4,
    date: "02-Dec-2025",
    time: "12:53 pm",
    logType: "Late Login in Sent",
    sentBy: "zunairabd@gmail.com",
    email: "zubair@gmail.com",
    carer: "Zunair Mohammed",
    carerArea: "Chorlton",
    sentDate: "02-Dec-2025",
    sentTime: "12:52:07 pm",
    openedDate: "",
    openedTime: "",
    bounced: "",
    complaint: "",
    status: "Delivered",
  },
  {
    id: 5,
    date: "02-Dec-2025",
    time: "12:12 pm",
    logType: "Late Login in Sent",
    sentBy: "zunairabd@gmail.com",
    email: "zubair@gmail.com",
    carer: "Zunair Mohammed",
    carerArea: "Chorlton",
    sentDate: "02-Dec-2025",
    sentTime: "12:11:12 pm",
    openedDate: "",
    openedTime: "",
    bounced: "",
    complaint: "",
    status: "Delivered",
  },
];

// Define the columns based on the screenshot, including the first set of columns
const columns: GridColDef<EmailLogEntry>[] = [
  { field: "date", headerName: "Date", width: 120 },
  { field: "time", headerName: "Time", width: 100 },
  { field: "logType", headerName: "Log Type", width: 150 },
  { field: "sentBy", headerName: "Sent By", width: 200 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "carer", headerName: "Carer", width: 150 },
  { field: "carerArea", headerName: "Carer Area", width: 120 },
  { field: "sentDate", headerName: "Sent Date", width: 120 },
  { field: "sentTime", headerName: "Sent Time", width: 100 },
  { field: "openedDate", headerName: "Opened Date", width: 120 },
  { field: "openedTime", headerName: "Opened Time", width: 100 },
  { field: "bounced", headerName: "Bounced", width: 80 },
  { field: "complaint", headerName: "Complaint Made", width: 120 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => (
      <Typography
        variant="body2"
        className={`font-semibold ${ params.value === "Delivered" ? "text-emerald-600"  : params.value === "Bounced" ? "text-red-600" : "text-amber-600"}`}>
        {params.value}
      </Typography>
    ),
  },
];


// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const CarerEmailLog: React.FC = () => {
  const [selectedLogType, setSelectedLogType] = useState(emailLogTypes[0]);
  const [selectedClientArea, setSelectedClientArea] = useState(clientAreas[0]);
  const [emailSearchTerm, setEmailSearchTerm] = useState("");
  const [mainSearchTerm, setMainSearchTerm] = useState("");

  const handleSearchClick = () => {
    // Implement actual search logic here
    console.log("Searching with filters...");
  };

  const filteredRows = dummyRows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(mainSearchTerm.toLowerCase())
    )
  );


  return (
    <Box className="bg-white min-h-screen">
      {/* Header: Carer > Summary E-mail Log Last Month */}
      <Box className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-300">
        <Typography variant="h5" className="text-xl font-normal text-gray-800">
          Carer &gt; Summary E-mail Log Last Month
        </Typography>
      </Box>

      {/* --- Filter Controls --- */}
      {/* Replicating the filter section from the screenshot */}
      <Box className={`p-4 border-b border-gray-200 bg-white`}>
        <div className="flex justify-between items-start">
          {/* Group 1: Date and Type */}
          <div className="flex gap-6 items-end">
            {/* Search Date (From/To) */}
            <div className="flex flex-col gap-1">
              <Typography
                variant="caption"
                className="text-gray-700 font-medium"
              >
                Search Date
              </Typography>
              <div className="flex items-center gap-2">
                <TextField
                  size="small"
                  type="date"
                  className="bg-white border-gray-300 shadow-sm"
                  sx={{ width: 130 }}
                />
                <Typography variant="body2" className="text-gray-600">
                  to
                </Typography>
                <TextField
                  size="small"
                  type="date"
                  
                  className="bg-white border-gray-300 shadow-sm"
                  sx={{ width: 130 }}
                />
              </div>
            </div>

            {/* E-mail Type */}
            <FormControl
              variant="outlined"
              size="small"
              sx={{ minWidth: 150, bgcolor: "white" }}
            >
              <InputLabel>E-mail Type</InputLabel>
              <Select
                value={selectedLogType}
                onChange={(e) => setSelectedLogType(e.target.value)}
                label="E-mail Type"
                className="border-gray-300 shadow-sm"
              >
                {emailLogTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Group 2: Client Area and Carer Area */}
          <div className="flex gap-6 items-end">
            {/* Client Area */}
            <div className="flex flex-col gap-1">
              <Typography
                variant="caption"
                className="text-gray-700 font-medium"
              >
                Client Area
              </Typography>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 150, bgcolor: "white" }}
              >
                <Select
                  value={selectedClientArea}
                  onChange={(e) => setSelectedClientArea(e.target.value)}
                  className="border-gray-300 shadow-sm">
                  {clientAreas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Carer Area (Complex Dropdown/Checkbox Structure) */}
           <div className="flex flex-col gap-1">
              <Typography
                variant="caption"
                className="text-gray-700 font-medium"
              >
                Carer Area
              </Typography>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 150, bgcolor: "white" }}
              >
                <Select
                  value={selectedClientArea}
                  onChange={(e) => setSelectedClientArea(e.target.value)}
                  className="border-gray-300 shadow-sm">
                  {clientAreas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Search Button for Areas */}
            <Button
              variant="contained"
              onClick={() => console.log("Search Areas")}
              className="normal-case text-white shadow-md font-medium px-6 self-end"
              sx={{
                backgroundColor: PRIMARY_PURPLE,
                "&:hover": { backgroundColor: "#581C87" },
                height: "38px", // Match height of select/textfield
              }}
            >
              Search Areas
            </Button>
          </div>

          {/* Group 3: Email Search */}
          <div className="flex gap-6 items-end">
            {/* Email Search Field */}
            <div className="flex flex-col gap-1">
              <Typography
                variant="caption"
                className="text-gray-700 font-medium"
              >
                Email Search
              </Typography>
              <TextField
                size="small"
                placeholder="Enter Email Address"
                value={emailSearchTerm}
                onChange={(e) => setEmailSearchTerm(e.target.value)}
                className="bg-white border-gray-300 shadow-sm"
                sx={{ width: 200 }}
              />
            </div>

            {/* Search Button for Emails */}
            <Button
              variant="contained"
              onClick={() => handleSearchClick()}
              className="normal-case text-white shadow-md font-medium px-6 self-end"
              sx={{
                backgroundColor: PRIMARY_PURPLE,
                "&:hover": { backgroundColor: "#581C87" },
                height: "38px", // Match height of select/textfield
              }}
            >
              Search Emails
            </Button>
          </div>
        </div>
      </Box>

      {/* --- Export/Action Toolbar (Matching Screenshot) --- */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        <Box className="flex flex-wrap gap-2">
          {/* Note: The screenshot shows a slightly different set/order of buttons here. */}
          {["Rows", "Copy", "CSV", "Column visibility", "Clear Search"].map(
            (label) => (
              <Button
                key={label}
                size="small"
                variant={label === "CSV" ? "contained" : "outlined"} // CSV is darker/contained in this part of the screenshot
                className={`normal-case text-sm font-normal border-gray-300 shadow-sm`}
                sx={{
                  borderColor: "#E5E7EB",
                  color: PRIMARY_PURPLE,
                  backgroundColor: label === "CSV" ? "#E5E7EB" : "white",
                  "&:hover": {
                    backgroundColor: "#F3F4F6",
                  },
                }}
              >
                {label}
              </Button>
            )
          )}
          {/* Buttons below the main header in the original screenshot */}
          {["Triggered", "E-mail Type", "E-Mail"].map((label) => (
            <Button
              key={label}
              size="small"
              variant="outlined"
              className={`normal-case text-sm font-normal border-gray-300 shadow-sm text-gray-700`}
              sx={{
                borderColor: "#D1D5DB",
                "&:hover": { backgroundColor: "#F3F4F6" },
              }}
            >
              {label}
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
            placeholder="" // Blank search box to match screenshot
            value={mainSearchTerm}
            onChange={(e) => setMainSearchTerm(e.target.value)}
            sx={{ width: 200 }}
            InputProps={{
              className: "border border-gray-400", // Darker border for the final search box
            }}
            className="bg-white rounded-md shadow-sm"
          />
        </Box>
      </Box>

      {/* --- Data Table --- */}
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
        
        />
        {/* Footer info matching the screenshot */}
        <Typography variant="caption" className="text-gray-600 mt-2 block">
          Showing 1 to {filteredRows.length} of {dummyRows.length} entries
        </Typography>
      </Box>
    </Box>
  );
};

export default CarerEmailLog;
