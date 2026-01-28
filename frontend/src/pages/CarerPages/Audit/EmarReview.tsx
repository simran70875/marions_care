import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Eye, File, Printer } from "lucide-react";

export default function EMARReview() {
  // Dummy Data
  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    daysSince: Math.floor(Math.random() * 60),
    date: "02-09-2025 13:14:21",
    signedOffBy: i % 2 === 0 ? "Bhushan Mehra" : "Office Chorlton",
    client: ["Allan Cope", "Charles O’Connor", "Sylvia Reid", "Cecil Brown", "Maureen McCluskey"][i % 5],
    area: ["Chorlton", "Wythenshawe", "Didsbury", "Longsight"][i % 4],
    month: i % 2 === 0 ? "September 2025" : "October 2025",
    namePrinted: "Bhushan Mehra",
  }));

  // Columns Definition
  const columns = [
    {
      field: "daysSince",
      headerName: "Days Since Last Review",
      flex: 0.8,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "signedOffBy",
      headerName: "Signed-Off By",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "client",
      headerName: "Client",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "area",
      headerName: "Area",
      flex: 0.8,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "namePrinted",
      headerName: "Name Printed",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "signature",
      headerName: "Signature",
      flex: 0.8,
      renderCell: () => (
        <Button variant="contained" size="small" color="secondary">
          Admin
        </Button>
      ),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "pdf",
      headerName: "PDF",
      flex: 0.5,
      renderCell: () => (
        <IconButton color="primary" size="small">
          <File />
        </IconButton>
      ),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: () => (
        <IconButton color="info" size="small">
          <Eye />
        </IconButton>
      ),
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        EMAR Review
      </Typography>

      {/* Top Controls */}
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mb: 2,
          border: "1px solid #ddd",
        }}
      >
        <Box display="flex" gap={1} flexWrap="wrap">
          {["Rows", "Print", "Excel", "Area Search", "Column visibility"].map(
            (label, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                startIcon={label === "Print" ? <Printer /> : null}
              >
                {label}
              </Button>
            )
          )}
        </Box>

        {/* Search Bar */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontSize={14}>Search:</Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search"
            sx={{ width: 220 }}
          />
        </Box>
      </Paper>

      {/* Table */}
      <Paper elevation={3} sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // rowsPerPageOptions={[10, 20, 50]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#ede9fe",
              color: "#4c1d95",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f3ff",
            },
            "& .MuiDataGrid-cell": {
              fontSize: 13,
            },
          }}
        />
      </Paper>

      {/* Footer Info */}
      <Typography
        mt={2}
        fontSize={13}
        textAlign="right"
        color="gray"
      >{`Showing 1 to 10 of ${rows.length} entries`}</Typography>
    </Box>
  );
}
