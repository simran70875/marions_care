import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
// Removed dependency: import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Search } from "lucide-react";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS (Matching Screenshot Colors)
// =================================================================

// Theme Colors from Screenshot:
const UI_PURPLE_BG = "#581c87"; // Search button background
const UI_PURPLE_TEXT = "#6B21A8"; // Header text color
const ACCENT_ORANGE = "#F97316"; // Time Over Lap color (Orange/Amber)
const ACCENT_GREEN = "#10B981"; // Same Time Event color (Green/Teal)
const LIGHT_GRAY = "#F3F4F6"; // General background for filter/header areas

interface CarerConflictEntry {
  id: number;
  carerName: string;
  position: string;
  area: string;
  date: string;
  firstEventTime: string;
  secondEventTime: string;
  type: "Single" | "Recur";
  conflictType: "Time Over Lap" | "Same Time Event" | "Schedule Conflict";
}

// Sample data exactly matching the visible rows in the screenshot
const dummyConflicts: CarerConflictEntry[] = [
  {
    id: 1,
    carerName: "Zeinab Mohammed",
    position: "Care Worker",
    area: "Chorlton",
    date: "01-Dec-2025",
    firstEventTime: "08:50 - 09:35",
    secondEventTime: "09:00 - 09:45",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 2,
    carerName: "Nabeel Rauf",
    position: "Care Worker",
    area: "Chorlton",
    date: "01-Dec-2025",
    firstEventTime: "13:00 - 13:30",
    secondEventTime: "12:00 - 12:45",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 3,
    carerName: "Nabeel Rauf",
    position: "Care Worker",
    area: "Chorlton",
    date: "01-Dec-2025",
    firstEventTime: "13:00 - 13:45",
    secondEventTime: "12:35 - 14:05",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 4,
    carerName: "Jululope Olusolun Olusolun-Amure",
    position: "Care Worker",
    area: "Longsight",
    date: "01-Dec-2025",
    firstEventTime: "08:50 - 09:35",
    secondEventTime: "09:00 - 09:45",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 5,
    carerName: "Humayun Safdar",
    position: "Care Worker",
    area: "Chorlton",
    date: "01-Dec-2025",
    firstEventTime: "14:30 - 15:30",
    secondEventTime: "16:00 - 16:30",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 6,
    carerName: "Abdellah Assafhi",
    position: "Care Worker",
    area: "Chorlton",
    date: "02-Dec-2025",
    firstEventTime: "08:25 - 09:25",
    secondEventTime: "08:00 - 08:50",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 7,
    carerName: "Abdellah Assafhi",
    position: "Care Worker",
    area: "Chorlton",
    date: "02-Dec-2025",
    firstEventTime: "09:00 - 09:50",
    secondEventTime: "09:30 - 10:15",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 8,
    carerName: "Saidou Diallo",
    position: "Care Worker",
    area: "Chorlton",
    date: "02-Dec-2025",
    firstEventTime: "08:25 - 09:25",
    secondEventTime: "09:00 - 09:50",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 9,
    carerName: "Saidou Diallo",
    position: "Care Worker",
    area: "Chorlton",
    date: "02-Dec-2025",
    firstEventTime: "08:00 - 08:50",
    secondEventTime: "09:30 - 10:15",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 10,
    carerName: "Waqas Ali",
    position: "Care Worker",
    area: "Chorlton",
    date: "02-Dec-2025",
    firstEventTime: "08:30 - 07:30",
    secondEventTime: "06:30 - 08:00",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 11,
    carerName: "Asim Latif",
    position: "Care Worker",
    area: "Chorlton",
    date: "03-Dec-2025",
    firstEventTime: "12:10 - 13:10",
    secondEventTime: "14:25 - 14:55",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 12,
    carerName: "Dabho Illo",
    position: "Care Worker",
    area: "Wythenshawe",
    date: "03-Dec-2025",
    firstEventTime: "21:18 - 21:50",
    secondEventTime: "21:45 - 22:15",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 13,
    carerName: "Nishinan Osman",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "12:55 - 13:20",
    secondEventTime: "12:55 - 13:20",
    type: "Recur",
    conflictType: "Same Time Event",
  },
  {
    id: 14,
    carerName: "Zeinab Mohammed",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "21:10 - 21:50",
    secondEventTime: "21:45 - 22:15",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 15,
    carerName: "Joy Adebanjo",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "19:25 - 20:05",
    secondEventTime: "19:35 - 20:05",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 16,
    carerName: "Joy Adebanjo",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "19:35 - 20:05",
    secondEventTime: "20:00 - 20:30",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 17,
    carerName: "Asim Latif",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "12:50 - 13:20",
    secondEventTime: "21:45 - 22:15",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 18,
    carerName: "Asim Latif",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "12:45 - 13:20",
    secondEventTime: "14:25 - 14:55",
    type: "Single",
    conflictType: "Time Over Lap",
  },
  {
    id: 19,
    carerName: "Aisha Nadeem",
    position: "Care Worker",
    area: "Wythenshawe",
    date: "04-Dec-2025",
    firstEventTime: "09:10 - 09:40",
    secondEventTime: "09:30 - 10:00",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
  {
    id: 20,
    carerName: "Humayun Safdar",
    position: "Care Worker",
    area: "Chorlton",
    date: "04-Dec-2025",
    firstEventTime: "09:20 - 10:30",
    secondEventTime: "10:10 - 10:40",
    type: "Recur",
    conflictType: "Time Over Lap",
  },
];

/**
 * Renders the time box cell with background color matching the screenshot style.
 */
const renderTimeBox = (time: string) => {
  const bgColor = "#FEEBC8"; // Yellowish background for both in the screenshot
  const borderColor = "#FACC15"; // Darker yellow border

  return (
    <Box
      className="px-2 py-0.5 rounded-md text-center text-sm font-medium"
      sx={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: "#374151", // Dark gray text
        minWidth: "110px",
        margin: "auto", // Center horizontally/vertically in the table cell
      }}
    >
      {time}
    </Box>
  );
};

/**
 * Renders the conflict type tag with specific colors.
 */
const renderConflictTag = (conflictType: string) => {
  let colorClass = "";
  let bgColor = "";

  if (conflictType === "Time Over Lap") {
    colorClass = "text-white";
    bgColor = ACCENT_ORANGE; // Orange-ish background
  } else if (conflictType === "Same Time Event") {
    colorClass = "text-white";
    bgColor = ACCENT_GREEN; // Green/Teal background
  } else {
    colorClass = "text-gray-800";
    bgColor = "#E5E7EB";
  }

  return (
    <Box
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}
      sx={{
        backgroundColor: bgColor,
        minWidth: "100px",
        margin: "auto", // Center horizontally/vertically in the table cell
        textAlign: "center",
      }}
    >
      {conflictType}
    </Box>
  );
};

// Simple array of headers for the custom table
const tableHeaders = [
  "Date",
  "Carer Name",
  "Position",
  "Area",
  "First Event",
  "Second Event",
  "Type",
  "Conflict Type",
];

// Toolbar buttons matching the combination of screenshots
const toolbarButtons = [
  "Export Excel",
  "Export PDF",
  "Print",
  "Area Search",
  "Column visibility",
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const CarerConflicts: React.FC = () => {
  // const [startDate, setStartDate] = useState("01-12-2025");
  // const [endDate, setEndDate] = useState("08-12-2025");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // This is where API call/data fetching would happen in a real application
    // console.log(`Searching conflicts from ${startDate} to ${endDate}`);
  };

  const filteredRows = dummyConflicts
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(0, 15); // Limit to the visible rows for initial view

  return (
    <Box className="bg-gray-50 min-h-screen">
      {/* Header: Carer Conflicts (Purple text in the screenshot) */}
      <Box className="flex items-center px-4 py-3 bg-white border-b border-gray-300 shadow-sm">
        <Typography
          variant="h5"
          className="text-xl font-normal"
          sx={{ color: UI_PURPLE_TEXT }}
        >
          Carer Conflicts
        </Typography>
      </Box>

      {/* --- Filter Controls --- */}
      <Box className="p-4 flex flex-col gap-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Start Date */}
          <TextField
            size="small"
            type="text"
            label="Start Date"
           
            className="bg-white"
            sx={{ width: 150 }}
          />
          <Typography variant="body2" className="text-gray-600 font-semibold">
            to
          </Typography>
          {/* End Date */}
          <TextField
            size="small"
            type="text"
            label="End Date"
            className="bg-white"
            sx={{ width: 150 }}
          />
          {/* Search Button (The main purple button) */}
          <Button
            variant="contained"
            onClick={handleSearch}
            className="normal-case text-white shadow-md"
            sx={{
              backgroundColor: UI_PURPLE_BG,
              "&:hover": { backgroundColor: "#4a0e7a" },
              height: "40px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Search
          </Button>
        </div>
      </Box>

      {/* --- Main Content Area: Calendar + Table --- */}

      {/* Right Side: Toolbar and Data Table */}
      <Box>
        {/* Action/Toolbar Bar */}
        <Box
          className={`p-2 flex justify-between items-center border border-gray-200 rounded-t-md ${LIGHT_GRAY}`}
        >
          {/* Left: Export/Action Buttons */}
          <Box className="flex flex-wrap gap-2">
            {toolbarButtons.map((label) => (
              <Button
                key={label}
                size="small"
                variant="outlined"
                className={`normal-case text-sm font-normal shadow-sm`}
                sx={{
                  minWidth: "auto",
                  padding: "4px 12px",
                  borderColor: UI_PURPLE_TEXT,
                  color: UI_PURPLE_TEXT,
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#E5E7EB",
                    borderColor: UI_PURPLE_TEXT,
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Right: Search */}
          <Box className="flex items-center gap-2">
            <Typography variant="body2" className="font-semibold text-gray-700">
              Search:
            </Typography>
            <TextField
              size="small"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 180 }}
              InputProps={{
                startAdornment: (
                  <Search size={16} className="text-gray-400 mr-2" />
                ),
              }}
              className="bg-white rounded-md shadow-sm"
            />
          </Box>
        </Box>

        {/* Data Table Container */}
        <Box className="w-full border-x border-b border-gray-300 rounded-b-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-xs font-normal text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 h-10">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {row.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-700 font-medium cursor-pointer">
                    {row.carerName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.position}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.area}
                  </td>
                  <td className="px-4 py-1 whitespace-nowrap text-sm">
                    {renderTimeBox(row.firstEventTime)}
                  </td>
                  <td className="px-4 py-1 whitespace-nowrap text-sm">
                    {renderTimeBox(row.secondEventTime)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.type}
                  </td>
                  <td className="px-4 py-1 whitespace-nowrap text-sm">
                    {renderConflictTag(row.conflictType)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Fallback for empty table */}
          {filteredRows.length === 0 && (
            <Box className="text-center p-8 text-gray-500">
              No conflicts found for the selected criteria.
            </Box>
          )}
        </Box>

        {/* Footer info matching the screenshot */}
        <Typography variant="caption" className="text-gray-600 mt-2 block">
          Showing 1 to {filteredRows.length} of {dummyConflicts.length} entries
        </Typography>
      </Box>
    </Box>
  );
};

export default CarerConflicts;
