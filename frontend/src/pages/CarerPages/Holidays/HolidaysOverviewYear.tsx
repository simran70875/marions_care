import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (matching the screenshot)
const PRIMARY_PURPLE = "#7b3b9b"; // Dark Purple for Generate Report
const ACTIVE_GREEN = "#4CAF50"; // Green text for Active Status

interface HolidaysOverviewRow {
  id: number;
  No: number;
  Name: string;
  Surname: string;
  HolsWeeks: number;
  WorkWeeks: number;
  DaysWorked: number;
  HoursWorked: number;
  AvgWeekHrs: number;
  AvgDailyHrs: number;
  TimesheetHrsYr: number;
  Saturdays: number;
  Sundays: number;
  TotalDisplay: number;
  LeaveApproved: number;
  LeaveTaken: number;
  LeaveBalance: number;
  EntitlementForYr: number;
  TotalEntitlement: number;
  RemainingEntitlement: number;
  Accrued: number;
  RemainingAccrued: number;
  Status: string;
}

// Columns defined for the Holidays Overview Report
const holidaysOverviewColumns: GridColDef<HolidaysOverviewRow>[] = [
  { field: "No", headerName: "No.", width: 60, sortable: true },
  { field: "Name", headerName: "Name", width: 120, sortable: true },
  { field: "Surname", headerName: "Surname", width: 120, sortable: true },
  { field: "HolsWeeks", headerName: "Hols Weeks", width: 80, sortable: true },
  { field: "WorkWeeks", headerName: "Work Weeks", width: 90, sortable: true },
  { field: "DaysWorked", headerName: "Days Worked", width: 90, sortable: true },
  { field: "HoursWorked", headerName: "Hours Worked", width: 100, sortable: true },
  { field: "AvgWeekHrs", headerName: "AVG Week Hrs", width: 100, sortable: true },
  { field: "AvgDailyHrs", headerName: "AVG Daily Hrs", width: 100, sortable: true },
  { field: "TimesheetHrsYr", headerName: "Timesheet HRS (Yr)", width: 120, sortable: true },
  { field: "Saturdays", headerName: "Saturdays", width: 80, sortable: true },
  { field: "Sundays", headerName: "Sundays", width: 80, sortable: true },
  { field: "TotalDisplay", headerName: "Total Display", width: 100, sortable: true },
  { field: "LeaveApproved", headerName: "Leave Approved", width: 100, sortable: true },
  { field: "LeaveTaken", headerName: "Leave Taken", width: 100, sortable: true },
  { field: "LeaveBalance", headerName: "Leave Balance", width: 100, sortable: true },
  { field: "EntitlementForYr", headerName: "Entitlement For Yr", width: 120, sortable: true },
  {
    field: "TotalEntitlement",
    headerName: "Total Entitlement Yr Start + Balance",
    width: 150,
    sortable: true,
  },
  {
    field: "RemainingEntitlement",
    headerName: "Remaining Entitlement",
    width: 120,
    sortable: true,
  },
  { field: "Accrued", headerName: "Accrued", width: 100, sortable: true },
  {
    field: "RemainingAccrued",
    headerName: "Remaining Accrued",
    width: 120,
    sortable: true,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 80,
    sortable: true,
    renderCell: (params) => (
      <Typography
        variant="body2"
        className="font-medium"
        sx={{ color: params.value === "Active" ? ACTIVE_GREEN : RED_STATUS }}
      >
        {params.value}
      </Typography>
    ),
  },
];

// Reusing RED_STATUS from a previous component for Archived status color
const RED_STATUS = "#F44336"; 

const dummyHolidaysRows: HolidaysOverviewRow[] = [
  {
    id: 1, No: 2, Name: "Fatima", Surname: "Abanur", HolsWeeks: 0, WorkWeeks: 50, DaysWorked: 236, HoursWorked: 1381.58, AvgWeekHrs: 27.63, AvgDailyHrs: 4.72, TimesheetHrsYr: 5.85, Saturdays: 1009.5, Sundays: 0, TotalDisplay: 0, LeaveApproved: 0, LeaveTaken: 0, LeaveBalance: 0, EntitlementForYr: 24, TotalEntitlement: 24, RemainingEntitlement: 24, Accrued: 13.81, RemainingAccrued: 13.81, Status: "Active",
  },
  {
    id: 2, No: 2513, Name: "Amina", Surname: "Abdalla", HolsWeeks: 0, WorkWeeks: 52, DaysWorked: 216, HoursWorked: 1016, AvgWeekHrs: 19.54, AvgDailyHrs: 4.71, TimesheetHrsYr: 664.83, Saturdays: 0, Sundays: 0, TotalDisplay: 0, LeaveApproved: 0, LeaveTaken: 0, LeaveBalance: 0, EntitlementForYr: 21, TotalEntitlement: 21, RemainingEntitlement: 21, Accrued: 11.29, RemainingAccrued: 11.29, Status: "Active",
  },
  {
    id: 3, No: 2532, Name: "Fatima", Surname: "Abdi", HolsWeeks: 0, WorkWeeks: 11, DaysWorked: 22, HoursWorked: 69.92, AvgWeekHrs: 6.36, AvgDailyHrs: 3.18, TimesheetHrsYr: 59.42, Saturdays: 0, Sundays: 0, TotalDisplay: 0, LeaveApproved: 0, LeaveTaken: 0, LeaveBalance: 0, EntitlementForYr: 10, TotalEntitlement: 8.5, RemainingEntitlement: 8.5, Accrued: 1.49, RemainingAccrued: 1.49, Status: "Archived",
  },
  {
    id: 4, No: 2562, Name: "Nimo", Surname: "Abdi", HolsWeeks: 0, WorkWeeks: 3, DaysWorked: 9, HoursWorked: 44.33, AvgWeekHrs: 14.78, AvgDailyHrs: 4.93, TimesheetHrsYr: 44.33, Saturdays: 0, Sundays: 0, TotalDisplay: 0, LeaveApproved: 0, LeaveTaken: 0, LeaveBalance: 0, EntitlementForYr: 15, TotalEntitlement: 6.5, RemainingEntitlement: 6.5, Accrued: 0.72, RemainingAccrued: 0.72, Status: "Active",
  },
  {
    id: 5, No: 2553, Name: "Dafdeel", Surname: "Abdon", HolsWeeks: 0, WorkWeeks: 7, DaysWorked: 10, HoursWorked: 46, AvgWeekHrs: 6.86, AvgDailyHrs: 4.6, TimesheetHrsYr: 48, Saturdays: 0, Sundays: 0, TotalDisplay: 0, LeaveApproved: 0, LeaveTaken: 0, LeaveBalance: 0, EntitlementForYr: 7.5, TotalEntitlement: 4, RemainingEntitlement: 4, Accrued: 0.8, RemainingAccrued: 0.8, Status: "Active",
  },
  {
    id: 6, No: 2392, Name: "Adetobi", Surname: "Abiodun", HolsWeeks: 0, WorkWeeks: 52, DaysWorked: 266, HoursWorked: 1795.08, AvgWeekHrs: 34.52, AvgDailyHrs: 6.74, TimesheetHrsYr: 1234.83, Saturdays: 0, Sundays: 0, TotalDisplay: 0, LeaveApproved: 0, LeaveTaken: 0, LeaveBalance: 0, EntitlementForYr: 26, TotalEntitlement: 26, RemainingEntitlement: 26, Accrued: 14.66, RemainingAccrued: 14.66, Status: "Active",
  },
];

// Toolbar buttons matching the screenshot (Export buttons moved to the left)
const toolbarButtons = [
  { label: "Copy", variant: "outlined" },
  { label: "Export Excel", variant: "outlined" },
  { label: "Export CSV", variant: "outlined" },
  { label: "Export PDF", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
];

const leaveTypeCheckboxes = [
  { label: "Include Holiday and Other Paid Leave Types (Sick and Training NOT included)", name: "paidLeave" },
  { label: "Values calculated over 52 weeks", name: "over52Weeks" },
  { label: "Leave Calendar Days", name: "leaveCalendarDays" },
  { label: "Leave Work Days", name: "leaveWorkDays" },
  { label: "Leave Entitlements", name: "leaveEntitlements" },
  { label: "Leave Accruals", name: "leaveAccruals" },
  { label: "Leave Allocated (Yr)", name: "leaveAllocated" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const HolidaysOverviewYear: React.FC = () => {
  const [startDate, setStartDate] = useState("01-04-2025");
  const [endDate, setEndDate] = useState("31-03-2026");
  const [globalSearch, setGlobalSearch] = useState("");
  const [leaveFilters, setLeaveFilters] = useState<Record<string, boolean>>({}); // State for checkboxes

  const handleGenerateReport = () => {
    console.log("Generating Holidays Overview Report:", { startDate, endDate, leaveFilters });
    // In a real application, this would fetch data based on the criteria
  };
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveFilters({
      ...leaveFilters,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box className="bg-white min-h-screen">
      
      {/* Report Header */}
      <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
        <Typography variant="h6" className="text-lg font-medium text-gray-800">
          &gt; Holidays
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: PRIMARY_PURPLE,
            "&:hover": { backgroundColor: PRIMARY_PURPLE },
            fontSize: 12,
            textTransform: 'none',
            minWidth: 150,
          }}
        >
          Holiday Overview (New Filters)
        </Button>
      </Box>

      {/* --- Date Range & Generate Report Controls --- */}
      <Paper
        elevation={0}
        className="p-4 flex flex-col gap-3 border-b border-gray-200"
      >
        <Box className="flex items-center gap-4">
          <Typography className="text-sm font-semibold text-gray-700">
            Date Search
          </Typography>
          <TextField
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ width: 120, bgcolor: "white" }}
          />
          <Typography>to</Typography>
          <TextField
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ width: 120, bgcolor: "white" }}
          />
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            className="normal-case text-white shadow-md"
            sx={{
              backgroundColor: PRIMARY_PURPLE,
              "&:hover": { backgroundColor: PRIMARY_PURPLE },
              minWidth: 140,
              height: 35,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Generate Report
          </Button>
        </Box>

        {/* Calculations and Leave Type Checkboxes */}
        <Box className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <Typography variant="caption" className="font-semibold text-gray-700">
            * Calculations Include Holiday and Other Paid Leave Types (Sick and Training NOT included).
          </Typography>
          
          {leaveTypeCheckboxes.map((item, index) => (
            <FormControlLabel
              key={item.name}
              control={
                <Checkbox
                  checked={!!leaveFilters[item.name]}
                  onChange={handleCheckboxChange}
                  name={item.name}
                  size="small"
                  sx={{ p: 0.5 }}
                />
              }
              label={
                <Typography variant="caption" className="text-gray-700 text-xs">
                  {item.label}
                </Typography>
              }
              // The first item is a plain text disclaimer in the image, so we use its content as the first element's label.
              // We split the list into the disclaimer and the actual filter checkboxes for better structural clarity.
              sx={{ margin: index === 0 ? '0 16px 0 0' : '0 16px 0 0' }}
            />
          ))}
        </Box>
      </Paper>

      {/* --- Export Toolbar and Global Search --- */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        {/* Left: Export Buttons */}
        <Box className="flex flex-wrap gap-2">
          {toolbarButtons.map((btn) => (
            <Button
              key={btn.label}
              size="small"
              variant="outlined"
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
      <Box className="p-0" sx={{ overflowX: "auto" }}>
        <DataGrid
          rows={dummyHolidaysRows}
          columns={holidaysOverviewColumns}
          autoHeight
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            // Sort by 'No.' descending to match the screenshot example
            sorting: { sortModel: [{ field: "No", sort: "asc" }] },
          }}
          className="border border-gray-300"
          getRowHeight={() => 35}
          sx={{
            minWidth: 2500, // Ensure enough width to fit all columns
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
              minHeight: "35px !important",
              lineHeight: "35px !important",
              borderBottom: "1px solid #d1d5db",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              fontSize: 13,
              whiteSpace: 'normal',
              lineHeight: 1.2,
            },
            "& .MuiDataGrid-row": {
              maxHeight: "35px !important",
              borderBottom: "1px solid #e5e7eb",
              // Apply alternating row colors as seen in the screenshot
              "&:nth-of-type(odd)": {
                backgroundColor: "#f9f9f9", 
              },
            },
            "& .MuiDataGrid-cell": {
              padding: "0px 8px !important",
              lineHeight: "35px !important",
              maxHeight: "35px !important",
            },
          }}
        />

        {/* Footer info (Simple version) */}
        <Box className="flex justify-start items-center p-2 text-sm text-gray-600 border-t border-gray-200">
          <Typography variant="caption" className="text-gray-600 block">
            Showing 1 to {dummyHolidaysRows.length} of {dummyHolidaysRows.length} entries
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HolidaysOverviewYear;