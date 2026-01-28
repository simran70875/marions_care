import { Box, Button, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AssignJobType = () => {
  const rows = [
    {
      id: 1,
      surname: "Bickerton",
      firstname: "Ellisha",
      address: "101 Oakmoor Road, Manchester, Lancashire",
      jobType: "MCC SPOT",
    },
    {
      id: 2,
      surname: "O' CONNOR",
      firstname: "Charles",
      address:
        "Longrime Centre, 181 Langley Lane, Wythenshawe, Manchester",
      jobType: "MCC SPOT",
    },
    {
      id: 3,
      surname: "Abiodun",
      firstname: "Favour",
      address: "9 Ridsdale Avenue, Manchester",
      jobType: "MCC SPOT",
    },
  ];

  const columns = [
    { field: "surname", headerName: "Surname", flex: 1 },
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "jobType", headerName: "Job Type", flex: 1 },
    {
      field: "add",
      headerName: "Add Job Type",
      width: 160,
      renderCell: () => (
        <Button
          size="small"
          variant="outlined"
          sx={{
            borderColor: "#A7D27D",
            color: "#000",
            backgroundColor: "#A7D27D",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#9CC96D",
              borderColor: "#9CC96D",
            },
          }}
        >
          Add Job Type
        </Button>
      ),
    },
    {
      field: "remove",
      headerName: "Remove Job Type",
      width: 180,
      renderCell: () => (
        <Button
          size="small"
          variant="outlined"
          sx={{
            borderColor: "#94A3B8",
            color: "#fff",
            backgroundColor: "#94A3B8",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#64748B",
              borderColor: "#64748B",
            },
          }}
        >
          Remove Job Type
        </Button>
      ),
    },
  ];

  return (
    <Box className="p-5 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-semibold text-gray-700">
          Client › All Clients
        </Typography>

        <Box className="flex gap-2 items-center">
          <Typography variant="body2" className="text-gray-600">
            Show
          </Typography>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            {[10, 25, 50, 100].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <Typography variant="body2" className="text-gray-600">
            entries
          </Typography>

          <TextField
            size="small"
            placeholder="Search"
            sx={{
              ml: 2,
              "& .MuiOutlinedInput-root": {
                height: 30,
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          autoHeight
          getRowHeight={() => "auto"}
          sx={{
            borderColor: "#e5e7eb",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              lineHeight: 1.5,
              paddingY: 1,
            },
          }}
        />
      </Box>

      {/* Bottom Pagination & Search Filters */}
      <Box className="flex flex-wrap items-center justify-between mt-4 gap-2">
        <Box className="flex flex-wrap gap-2">
          {["Search Surname", "Search First N", "Search Address", "Search Job", "Search Remove Jr"].map(
            (label) => (
              <Button
                key={label}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "#d1d5db",
                  color: "#374151",
                  textTransform: "none",
                  backgroundColor: "#f9fafb",
                  "&:hover": { backgroundColor: "#f3f4f6" },
                }}
              >
                {label}
              </Button>
            )
          )}
        </Box>

        <Typography variant="body2" className="text-gray-600">
          Showing 1 to 25 of 103 entries
        </Typography>
      </Box>
    </Box>
  );
};

export default AssignJobType;
