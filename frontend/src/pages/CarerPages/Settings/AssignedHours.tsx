import { Box, Button, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AssignedHours = () => {
  // Dummy data
  const rows = [
    { id: 1, name: "Allan Cope", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" },
    { id: 2, name: "Favour Abiodun", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" },
    { id: 3, name: "Salima Eghraba", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: "" },
  ];

  // Columns
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "monday", headerName: "Monday", flex: 1 },
    { field: "tuesday", headerName: "Tuesday", flex: 1 },
    { field: "wednesday", headerName: "Wednesday", flex: 1 },
    { field: "thursday", headerName: "Thursday", flex: 1 },
    { field: "friday", headerName: "Friday", flex: 1 },
    { field: "saturday", headerName: "Saturday", flex: 1 },
    { field: "sunday", headerName: "Sunday", flex: 1 },
  ];

  return (
    <Box className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <Typography variant="h6" className="font-semibold text-gray-700 mb-2">
        Client › Settings › Assigned Hours
      </Typography>
  

      {/* Top Controls */}
      <Box className="flex flex-wrap items-center gap-2 mb-3">
        {["Row", "Copy", "Excel", "CSV", "PDF", "Print", "Month", "Area Search", "Column Visibility"].map((label) => (
          <Button
            key={label}
            size="small"
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              color: "#374151",
              textTransform: "none",
              backgroundColor: "#f9fafb",
              "&:hover": {
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            {label}
          </Button>
        ))}
        <TextField
          size="small"
          placeholder="Search"
          sx={{ ml: "auto", width: 220 }}
        />
      </Box>

      {/* Table */}
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
       
          disableColumnMenu
          disableRowSelectionOnClick
          sx={{
            borderColor: "#e5e7eb",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              borderColor: "#f3f4f6",
            },
          }}
        />
      </div>

      {/* Footer */}
      <Typography
        variant="caption"
        className="block text-gray-500 text-center mt-3"
      >
        Showing 1 to 100 of 100 entries
      </Typography>
    </Box>
  );
};

export default AssignedHours;
