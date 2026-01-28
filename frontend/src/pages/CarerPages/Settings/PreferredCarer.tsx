import { Box, Button, Typography, Chip } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

const PreferredCarer = () => {
  const rows = [
    {
      id: 1,
      clientId: 230708,
      name: "Ellisha Bickerton",
      gender: "female",
      carers: ["Yvonne Marie Eaves"],
    },
    {
      id: 2,
      clientId: 230691,
      name: "Charles 'O CONNOR",
      gender: "male",
      carers: [
        "Sharon Threlfall",
        "Aisha Nadeem",
        "Feven Weddedawit",
        "Yvonne Marie Eaves",
        "Mercy Anuoluwapo",
        "Sarah Sharman",
        "Jemima Jane Clarke",
        "Ebrahim Esmail Bhana",
        "Joy Adebanjo",
        "Khadija Awale",
        "Najma Butt",
      ],
    },
  ];

  const columns = [
    {
      field: "clientId",
      headerName: "No.",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: params.row.gender === "female" ? "#C2185B" : "#1565C0",
            fontWeight: 500,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "carers",
      headerName: "Preferred Carer",
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          {params.value.map((carer: string, index: number) => (
            <Box key={index} className="flex items-center gap-2 mb-1">
              <Chip
                label={index + 1}
                size="small"
                sx={{
                  backgroundColor: "#A7D27D",
                  color: "#000",
                  fontWeight: 600,
                  height: 20,
                }}
              />
              <Typography variant="body2">{carer}</Typography>
              <Typography
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ●
              </Typography>
            </Box>
          ))}
          <Box className="flex gap-2 mt-2">
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#A7D27D",
                color: "#000",
                textTransform: "none",
                "&:hover": { backgroundColor: "#9CC96D" },
              }}
            >
              Add Preferred
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              Add Not Compatible
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box className="p-5 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <Box className="flex justify-between items-center mb-3">
        <Typography variant="h6" className="font-semibold text-gray-700">
          Preferred Carer
        </Typography>

        <Box className="flex gap-2">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4B2C77",
              textTransform: "none",
              "&:hover": { backgroundColor: "#3B1E68" },
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E91E63",
              textTransform: "none",
              "&:hover": { backgroundColor: "#C2185B" },
            }}
          >
            View Pending/Archived
          </Button>
        </Box>
      </Box>

      <Typography variant="body2" className="text-gray-600">
        Click on <span className="text-green-600 font-bold">①</span> to change
        position. Click on <span className="text-red-600 font-bold">🟥</span> to
        remove from list.
      </Typography>

      {/* Top Gray Buttons */}
      <Box className="flex flex-wrap items-center gap-2 mb-3 mt-5">
        {["Copy", "Excel", "CSV", "PDF", "Print", "Column visibility"].map(
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
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                },
              }}
            >
              {label}
            </Button>
          )
        )}
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded px-2 py-1 ml-auto text-sm focus:outline-none"
        />
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooterSelectedRowCount
          disableColumnMenu
          disableRowSelectionOnClick
          autoHeight
          getRowHeight={() => "auto"} // ✅ Dynamically adjusts height based on content
          sx={{
            borderColor: "#e5e7eb",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              alignItems: "flex-start",
              paddingTop: "10px",
              paddingBottom: "10px",
              whiteSpace: "normal", // ✅ Allows text wrapping
              lineHeight: "1.4",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PreferredCarer;
