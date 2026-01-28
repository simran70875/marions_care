import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search, ChevronDown } from "lucide-react";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS (Matching Screenshot Colors)
// =================================================================

// Theme Colors from Screenshots:
const UI_PURPLE_TEXT = "#6B21A8"; // Text color for unselected days and toolbar buttons
const UI_PURPLE_BG = "#581c87"; // Deeper purple for active/hover background
const ACTION_CYAN = "#42b6d0"; // Specific color for Search Availability button
const ACCENT_GREEN = "#81C784"; // Lighter green for the bar background color (like the screenshot)
const DARK_GREEN = "#1B5E20"; // Darker green text/label color (like the screenshot)
const LIGHT_GRAY = "#F3F4F6"; // Background for toolbar area

interface CarerAvailabilityEntry {
  id: number;
  carerName: string;
  position: string;
  scheduleConflicts: "No Conflict" | "Conflict";
  daysAvailable: number; // Percentage (0-100) for Days Available
  daysAvailableFromSchedule: number; // Percentage (0-100) for Days Available from Schedule
  daysSelected: string;
}

const carerPositions = [
  "All Positions",
  "Care Worker",
  "Senior Care Worker",
  "Coordinator",
  "Admin",
  "HR",
];

// Sample data exactly matching the visible columns in the screenshot
const dummyRows: CarerAvailabilityEntry[] = [
  {
    id: 1,
    carerName: "Ahmad Fraz",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 100,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 2,
    carerName: "Amina Abdalla",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 100,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 3,
    carerName: "Arfia Qaisar",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 100,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 4,
    carerName: "Ashdeep Singh",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 100,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 5,
    carerName: "Asma Mobeen Ahmed",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 100,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 6,
    carerName: "Bhushan Mehra",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 0,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 7,
    carerName: "Bunni Christiana Junaid",
    position: "Care Worker",
    scheduleConflicts: "No Conflict",
    daysAvailable: 100,
    daysAvailableFromSchedule: 100,
    daysSelected: "—",
  },
  {
    id: 20,
    carerName: "Dilsha Bibi",
    position: "Care Worker",
    scheduleConflicts: "Conflict",
    daysAvailable: 0,
    daysAvailableFromSchedule: 0,
    daysSelected: "—",
  },
  {
    id: 21,
    carerName: "Deepali Singh",
    position: "Senior Care Worker",
    scheduleConflicts: "Conflict",
    daysAvailable: 0,
    daysAvailableFromSchedule: 0,
    daysSelected: "—",
  },
];

// Helper function for rendering the SHORT progress bars (matches screenshot visual)
const renderShortProgressBar = (
  value: number,
  label: string
) => {
  // The bar itself is the light green background with "Mon" text and the percentage below
  return (
    <Box className="flex flex-col items-center justify-center">
      <Box
        className="rounded-sm flex items-center justify-center"
        sx={{
          // Set a fixed short width and height to match the screenshot's small bar
          width: "40px",
          height: "25px",
          backgroundColor: ACCENT_GREEN, // Light green background
          border: "1px solid #C8E6C9",
          padding: "2px",
        }}
      >
        {/* The "Mon" text in the upper part of the green box */}
        <Typography
          variant="caption"
          className="font-semibold"
          sx={{ color: DARK_GREEN, fontSize: "10px" }}
        >
          {label}
        </Typography>
      </Box>
      {/* The 100% text directly below the bar */}
      <Typography
        variant="caption"
        className="font-semibold"
        sx={{ color: DARK_GREEN, fontSize: "10px", marginTop: "2px" }}
      >
        {`${value}%`}
      </Typography>
    </Box>
  );
};

// Define the columns
const columns: GridColDef<CarerAvailabilityEntry>[] = [
  {
    field: "carerName",
    headerName: "Carer Name",
    width: 200,
    renderCell: (params) => (
      <Typography
        variant="body2"
        className="text-blue-700 font-medium cursor-pointer"
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "position",
    headerName: "Position",
    width: 150,
    // Sort indicator is present in the screenshot
    renderHeader: () => (
      <Box className="flex items-center">
        <Typography variant="body2" className="font-bold mr-1">
          Position
        </Typography>
        <Typography variant="caption" sx={{ color: ACTION_CYAN }}>
          ▲
        </Typography>{" "}
        {/* Cyan/Teal arrow */}
      </Box>
    ),
  },
  {
    field: "scheduleConflicts",
    headerName: "Schedule Conflicts",
    width: 150,
    renderCell: (params) => (
      <Box
        className={`px-2 py-1 text-xs font-medium rounded-md w-full text-center ${
          params.value === "No Conflict"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-yellow-100 text-yellow-700 border border-yellow-300" // Conflict looks yellow/orange
        }`}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "daysAvailableFromSchedule",
    headerName: "Days Available from Schedule",
    width: 250,
    // USE THE NEW SHORT PROGRESS BAR
    renderCell: (params) =>
      renderShortProgressBar(params.value, ACCENT_GREEN),
  },
  {
    field: "daysAvailable",
    headerName: "Days Available",
    width: 200,
    renderCell: (params) => {
      // This column shows a dashed line or percentage
      if (params.value === 0) return <Typography variant="body2">—</Typography>;
      // If it was a progress bar, we would use the new function, but based on the screenshot it's empty or dashed.
      // If we assume the visual element for Days Available is the same structure:
      // return renderShortProgressBar(params.value, ACCENT_GREEN, 'Mon');

      // Sticking to the text output matching the screenshot ("—" or "0%")
      return (
        <Typography variant="body2">
          {params.value === 0 ? "—" : `${params.value}%`}
        </Typography>
      );
    },
  },
  {
    field: "daysSelected",
    headerName: "Selected",
    width: 120,
    renderCell: (params) => (
      <Typography variant="body2">{params.value}</Typography>
    ),
  },
];

const toolbarButtons = [
  "Copy",
  "Export Excel",
  "Export CSV",
  "Export PDF",
  "Print",
  "Column visibility",
  "Clear Search",
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const CarerAvailability: React.FC = () => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon"]);
  const [mainSearchTerm, setMainSearchTerm] = useState("");
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
  const [positionSearch, setPositionSearch] = useState("");

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handlePositionToggle = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  };

  const handleSearchAvailability = () => {
    console.log("Searching availability...");
  };

  const filteredPositions = carerPositions.filter((p) =>
    p.toLowerCase().includes(positionSearch.toLowerCase())
  );

  const filteredRows = dummyRows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(mainSearchTerm.toLowerCase())
    )
  );

  return (
    <Box className="bg-white min-h-screen">
      {/* Header: Carer Availability */}
      <Box className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-300">
        <Typography variant="h5" className="text-xl font-normal text-gray-800">
          Carer Availability
        </Typography>
      </Box>

      {/* --- Filter Controls --- */}
      <Box className="p-4 flex flex-col gap-4 border-b border-gray-200">
        {/* Row 1: Date, Time, Days */}
        <div className="flex items-center gap-4">
          {/* Date Picker */}
          <TextField
            size="small"
            type="text" // Use type text to display DD-MM-YYYY as in screenshot
            className="bg-white border border-gray-300 shadow-sm"
            sx={{ width: 150 }}
          />

          {/* Time Range */}
          <TextField
            size="small"
            type="time"
            className="bg-white border border-gray-300 shadow-sm"
            sx={{ width: 80, padding: "2px 0" }}
          />
          <Typography variant="body2" className="text-gray-600 font-semibold">
            to
          </Typography>
          <TextField
            size="small"
            type="time"
            className="bg-white border border-gray-300 shadow-sm"
            sx={{ width: 80, padding: "2px 0" }}
          />

          {/* Day Selectors (Mon, Tue, Wed, Thu, Fri, Sat, Sun) */}
          <Box className="flex gap-0 border border-gray-300 rounded-sm bg-white overflow-hidden">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                size="small"
                variant={selectedDays.includes(day) ? "contained" : "text"}
                onClick={() => handleDayToggle(day)}
                className="min-w-0 px-3 py-1 text-sm font-semibold rounded-none"
                sx={{
                  color: selectedDays.includes(day) ? "white" : UI_PURPLE_TEXT,
                  backgroundColor: selectedDays.includes(day)
                    ? UI_PURPLE_BG
                    : "white",
                  border: "none",
                  "&:hover": {
                    backgroundColor: selectedDays.includes(day)
                      ? UI_PURPLE_BG
                      : LIGHT_GRAY,
                    border: "none",
                  },
                  // Add vertical separator for text buttons
                  "&:not(:last-child)": { borderRight: "1px solid #E5E7EB" },
                }}
              >
                {day}
              </Button>
            ))}
          </Box>
        </div>

        {/* Row 2: Area, Position, Search Button */}
        <div className="flex items-center gap-4">
          {/* Area Dropdown (Custom styling for SelectArea button in screenshot) */}
          <div className="relative">
            <Button
              variant="outlined"
              size="small"
              onClick={() => console.log("Area Dropdown Clicked")}
              className="normal-case text-gray-700 bg-white border-gray-300 shadow-sm justify-between pr-2"
              sx={{
                width: 150,
                height: "38px",
                borderColor: "#D1D5DB",
                color: UI_PURPLE_TEXT, // Text is purple in the screenshot
              }}
              endIcon={<ChevronDown size={18} className="text-gray-500" />}
            >
              <span className="truncate text-sm">Select Area</span>
            </Button>
          </div>

          {/* Position Dropdown (Custom with Search and Checkboxes) */}
          <div className="relative">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsPositionDropdownOpen(!isPositionDropdownOpen)}
              className="normal-case text-gray-700 bg-white border-gray-300 shadow-sm justify-between pr-2"
              sx={{
                width: 150,
                height: "38px",
                borderColor: "#D1D5DB",
                color: UI_PURPLE_TEXT, // Text is purple in the screenshot
              }}
              endIcon={<ChevronDown size={18} className="text-gray-500" />}
            >
              <span className="truncate text-sm">
                {selectedPositions.length === 0
                  ? "Select Position"
                  : `${selectedPositions.length} Selected`}
              </span>
            </Button>

            {/* Position Dropdown Content */}
            {isPositionDropdownOpen && (
              <div className="absolute z-20 top-full mt-1 border border-gray-300 bg-white shadow-lg rounded-md w-64 p-2">
                {/* Search Input within Dropdown */}
                <div className="flex items-center p-1 mb-2 border border-gray-300 rounded-md">
                  <Search size={16} className="text-gray-400 mr-2" />
                  <TextField
                    size="small"
                    placeholder="Search"
                    value={positionSearch}
                    onChange={(e) => setPositionSearch(e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      className: "text-sm",
                    }}
                    className="flex-grow"
                  />
                </div>

                {/* Checkbox List */}
                <div className="max-h-40 overflow-y-auto">
                  {filteredPositions.map((position) => (
                    <FormControlLabel
                      key={position}
                      control={
                        <Checkbox
                          checked={selectedPositions.includes(position)}
                          onChange={() => handlePositionToggle(position)}
                          size="small"
                          sx={{
                            color: ACTION_CYAN,
                            "&.Mui-checked": { color: ACTION_CYAN },
                          }}
                          className="p-1"
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          className="text-gray-700 text-sm"
                        >
                          {position}
                        </Typography>
                      }
                      className="m-0 py-0 block"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Availability Button (The large blue-green button) */}
          <Button
            variant="contained"
            onClick={handleSearchAvailability}
            className="normal-case text-white shadow-md"
          >
            Search Availability
          </Button>
        </div>
      </Box>

      {/* --- Action/Toolbar Bar --- */}
      <Box
        className={`p-3 flex justify-between items-center border-b border-gray-200 ${LIGHT_GRAY}`}
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
                borderColor:
                  label === "Export Excel" ? UI_PURPLE_TEXT : "#D1D5DB",
                color: UI_PURPLE_TEXT,
                backgroundColor: label === "Export Excel" ? "#E5E7EB" : "white",
                "&:hover": {
                  backgroundColor: LIGHT_GRAY,
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
            placeholder=""
            value={mainSearchTerm}
            onChange={(e) => setMainSearchTerm(e.target.value)}
            sx={{ width: 200 }}
            InputProps={{
              className: "border border-gray-400",
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
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
            sorting: { sortModel: [{ field: "position", sort: "asc" }] },
          }}
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

export default CarerAvailability;
