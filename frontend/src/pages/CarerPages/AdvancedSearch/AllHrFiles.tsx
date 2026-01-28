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
  Checkbox, // Added Checkbox
  FormControlLabel, // Added FormControlLabel
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

const PRIMARY_PURPLE = "#8B5CF6"; // Using a purple for a slightly different look, but keeping it simple.

interface HRFile {
  id: number;
  name: string;
  comment: string;
  hrFile: string;
  dateAwarded: string;
  expiredDate: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Archived' | 'End of Service';
}

const hrFileTypes = [
  "All HR Files",
  "Due HR File",
  "Expired HR File",
  "Archived HR File",
];

const initialHRFiles: HRFile[] = [
  // Mock data based on the screenshot entry
  {
    id: 1,
    name: "Mohamed Elmi",
    comment: "First Aid Certificate",
    hrFile: "First Aid Certificate",
    dateAwarded: "17-08-2022",
    expiredDate: "17-08-2025",
    status: "End of Service", // Based on the visual status tag
  },
  // Additional mock data for more entries
  {
    id: 2,
    name: "Jane Doe",
    comment: "Annual Review",
    hrFile: "Annual Review",
    dateAwarded: "01-01-2024",
    expiredDate: "31-12-2024",
    status: "Active",
  },
  {
    id: 3,
    name: "John Smith",
    comment: "Driving License Copy",
    hrFile: "Driving License",
    dateAwarded: "10-05-2020",
    expiredDate: "10-05-2030",
    status: "Active",
  },
  {
    id: 4,
    name: "Alice Johnson",
    comment: "Passport Scan",
    hrFile: "Passport",
    dateAwarded: "03-03-2023",
    expiredDate: "03-03-2028",
    status: "Pending",
  },
  {
    id: 5,
    name: "Bob Brown",
    comment: "Manual Handling Cert",
    hrFile: "Training Cert",
    dateAwarded: "15-11-2021",
    expiredDate: "15-11-2024",
    status: "Expired",
  },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const AllHrFiles: React.FC = () => {
  const [selectedFileType, setSelectedFileType] =
    useState<string>("All HR Files");
  const [stateFilters, setStateFilters] = useState({
    active: false,
    pending: false,
    archived: false,
  });
  const [rowSearchTerms, setRowSearchTerms] = useState({
    name: "",
    comment: "",
    hrFile: "",
    dateAwarded: "",
    expiredDate: "",
    status: "",
  });
  const [mainSearchTerm, setMainSearchTerm] = useState<string>("");

  const handleFileTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedFileType(event.target.value);
  };

  const handleStateFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateFilters({
      ...stateFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRowSearchChange = (field: keyof typeof rowSearchTerms) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowSearchTerms({
      ...rowSearchTerms,
      [field]: event.target.value,
    });
  };

  const handleClearSearch = () => {
    setSelectedFileType("All HR Files");
    setStateFilters({
      active: false,
      pending: false,
      archived: false,
    });
    setRowSearchTerms({
      name: "",
      comment: "",
      hrFile: "",
      dateAwarded: "",
      expiredDate: "",
      status: "",
    });
    setMainSearchTerm("");
  };

  const filteredHRFiles = initialHRFiles.filter((file) => {
    const isStateFiltered = Object.values(stateFilters).some(v => v);
    let stateMatch = true;

    if (isStateFiltered) {
      if (stateFilters.active && file.status === 'Active') {
        stateMatch = true;
      } else if (stateFilters.pending && file.status === 'Pending') {
        stateMatch = true;
      } else if (stateFilters.archived && file.status === 'Archived') {
        stateMatch = true;
      } else if (stateFilters.active || stateFilters.pending || stateFilters.archived) {
          // If any state filter is active, but the file doesn't match any of them, it should be excluded
          stateMatch = false;
      }
    }

    const matchesRowSearch =
      (rowSearchTerms.name === "" || file.name.toLowerCase().includes(rowSearchTerms.name.toLowerCase())) &&
      (rowSearchTerms.comment === "" || file.comment.toLowerCase().includes(rowSearchTerms.comment.toLowerCase())) &&
      (rowSearchTerms.hrFile === "" || file.hrFile.toLowerCase().includes(rowSearchTerms.hrFile.toLowerCase())) &&
      (rowSearchTerms.dateAwarded === "" || file.dateAwarded.toLowerCase().includes(rowSearchTerms.dateAwarded.toLowerCase())) &&
      (rowSearchTerms.expiredDate === "" || file.expiredDate.toLowerCase().includes(rowSearchTerms.expiredDate.toLowerCase())) &&
      (rowSearchTerms.status === "" || file.status.toLowerCase().includes(rowSearchTerms.status.toLowerCase()));

    // Simple filtering based on the main dropdown for demonstration
    let matchesFileType = true;
    if (selectedFileType === "Due HR File" && file.status !== "Pending") matchesFileType = false;
    if (selectedFileType === "Expired HR File" && file.status !== "Expired") matchesFileType = false;
    if (selectedFileType === "Archived HR File" && file.status !== "Archived") matchesFileType = false;


    const matchesGlobalSearch = 
      mainSearchTerm === "" ||
      Object.values(file).some((value) => 
        String(value).toLowerCase().includes(mainSearchTerm.toLowerCase())
      );

    return stateMatch && matchesRowSearch && matchesFileType && matchesGlobalSearch;
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 250, sortable: true },
    { field: "comment", headerName: "Comment", width: 250 },
    { field: "hrFile", headerName: "HR File", width: 250, sortable: true },
    { field: "dateAwarded", headerName: "Date Awarded", width: 150, sortable: true },
    { field: "expiredDate", headerName: "Expired Date", width: 150, sortable: true },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let color = "bg-gray-200 text-gray-800"; // Default
        if (status === "Active") color = "bg-green-100 text-green-700";
        else if (status === "Pending") color = "bg-yellow-100 text-yellow-700";
        else if (status === "Expired" || status === "End of Service") color = "bg-red-100 text-red-700";

        return (
          <Box className={`${color} px-2 py-0.5 rounded-full text-xs font-medium`}>
            {status}
          </Box>
        );
      },
      sortable: true,
    },
  ];

  // Custom component for the row search text fields
  const RowSearchInput: React.FC<{ field: keyof HRFile; label: string }> = ({
    field,
    label,
  }) => {
    // Only include relevant search fields from the screenshot
    if (!['name', 'comment', 'hrFile', 'dateAwarded', 'expiredDate', 'status'].includes(field)) return null;

    return (
      <TextField
        size="small"
        placeholder={`Search ${label}`}
        value={rowSearchTerms[field as keyof typeof rowSearchTerms]}
        onChange={handleRowSearchChange(field as keyof typeof rowSearchTerms)}
        className="text-sm"
        sx={{ 
            width: field === 'status' ? '142px' : '242px', // Adjust widths to match column width approximation
            '& .MuiInputBase-input': { padding: '6px 8px' } // Adjust padding for smaller height
        }} 
      />
    );
  };

  return (
    <Box className="bg-white p-4">
      {/* Header with Generate Report Button */}
      <Box className="flex justify-between items-center pb-2 mb-4 border-b border-gray-200">
        <Typography
          variant="h5"
          className="text-xl font-normal text-gray-800 mr-4"
        >
          Advanced Search &gt;&gt; All HR File
        </Typography>
        <Button
          variant="contained"
          // Style to match the purple button in the screenshot (approx)
          style={{ backgroundColor: PRIMARY_PURPLE, color: "white" }} 
          className="normal-case shadow-md hover:bg-purple-700"
        >
          Generate Report
        </Button>
      </Box>

      {/* Top Search Controls (File Type and State Checkboxes) */}
      <Box className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4 flex items-center gap-6">
        <FormControl
          variant="outlined"
          size="small"
          sx={{ minWidth: 200, bgcolor: "white" }}
        >
          <Select
            id="file-type-select"
            value={selectedFileType}
            onChange={handleFileTypeChange}
            // No label on the select control, just the selected value showing
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {hrFileTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body1" className="font-medium text-gray-700 flex-shrink-0">
          State:
        </Typography>
        
        <FormControlLabel
          control={
            <Checkbox
              checked={stateFilters.active}
              onChange={handleStateFilterChange}
              name="active"
              sx={{ padding: '0 8px 0 0' }} // Adjust padding to match screenshot's layout
            />
          }
          label="Active"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stateFilters.pending}
              onChange={handleStateFilterChange}
              name="pending"
              sx={{ padding: '0 8px 0 0' }}
            />
          }
          label="Pending"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stateFilters.archived}
              onChange={handleStateFilterChange}
              name="archived"
              sx={{ padding: '0 8px 0 0' }}
            />
          }
          label="Archived"
        />

        <Button
          variant="outlined"
          onClick={handleClearSearch}
          className="normal-case text-gray-600 border-gray-300 hover:bg-gray-100 ml-auto"
          size="small"
        >
          Clear Search
        </Button>
      </Box>

      {/* Table Action Buttons and Global Search */}
      <Box className="p-1 flex justify-between items-center border-b border-gray-200 mb-4">
        <Box className="flex flex-wrap gap-1 text-sm font-normal">
          {[
            "Rows",
            "Copy",
            "Excel",
            "CSV",
            "PDF",
            "Print",
            "Area Search",
            "Column visibility",
            "Clear Search",
          ].map((label: string) => (
            // Using small buttons with minimal styling to match the screenshot's button group
            <Button
              key={label}
              size="small"
              variant="text"
              className="normal-case text-sm font-normal text-gray-700 hover:bg-gray-100 p-1 min-w-min"
              // Adding a right border to mimic the visual separation in the screenshot
              sx={{ borderRight: '1px solid #e5e7eb', borderRadius: 0 }} 
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Global Search Box (top right) */}
        <TextField
          size="small"
          placeholder="Search"
          value={mainSearchTerm}
          onChange={(e) => setMainSearchTerm(e.target.value)}
          sx={{ width: 150 }}
          InputProps={{
            className: "text-sm",
            style: { padding: '4px 8px' } // Make it smaller to match screenshot
          }}
          className="rounded-md border-gray-300 shadow-sm"
        />
      </Box>

      {/* DataGrid Table Container */}
      <Box className="h-[500px] w-full border border-gray-300 rounded-lg shadow-sm">
        {/* Row Search Inputs - positioned to look like they are part of the table header */}
        <Box 
            className="flex p-0.5 bg-gray-100 border-b border-gray-300"
            sx={{ 
                // Need to match the column layout exactly
                '& > div': { marginRight: '8px' }, // Small margin to separate inputs
            }}
        >
          <RowSearchInput field="name" label="Name" />
          <RowSearchInput field="comment" label="Comment" />
          <RowSearchInput field="hrFile" label="HR File" />
          <RowSearchInput field="dateAwarded" label="Date Awarded" />
          <RowSearchInput field="expiredDate" label="Expired Date" />
          <RowSearchInput field="status" label="Status" />
          {/* Add a spacer or flex-grow to push Status to the right */}
          <Box sx={{ flexGrow: 1 }}></Box> 
        </Box>
        
        <DataGrid
          rows={filteredHRFiles}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          disableColumnMenu
          disableRowSelectionOnClick
          // Remove default filter/sort icons to more closely match screenshot's simplicity
          disableColumnFilter 
          disableColumnSelector 
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: "600",
              minHeight: '30px !important', // Reduce header height to match screenshot
              lineHeight: '30px !important',
              borderBottom: '1px solid #ccc'
            },
            "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 'normal', // Resetting Mui's default bolding to match screenshot
            },
            // The row search inputs already handle the visual search below the header.
            "& .MuiDataGrid-toolbarContainer": {
                display: 'none', // Hide the default DataGrid toolbar if present
            },
            "& .MuiDataGrid-row": {
                maxHeight: '30px !important', // Reduce row height for compact look
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default AllHrFiles;