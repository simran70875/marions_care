import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const BodyAssessmentHistory = () => {
  // Dummy Data
  const rows: any[] = [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "problem", headerName: "Problem", flex: 1 },
    { field: "cause", headerName: "Cause", flex: 1 },
    { field: "treatment", headerName: "Treatment", flex: 1 },
    { field: "painIntensity", headerName: "Pain Intensity", flex: 1 },
    {
      field: "highestLowest",
      headerName: "Highest / Lowest (Pain Intensity)",
      flex: 1.2,
    },
    { field: "painDescription", headerName: "Pain Description", flex: 1 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Body Assessment History
      </h1>

      {/* Pain Scale Bar */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex flex-col items-end">
          <div
            className="w-[420px] h-6 rounded-lg"
            style={{
              background:
                "linear-gradient(to right, #10b981, #f59e0b, #ef4444)",
            }}
          ></div>
          <div className="flex justify-between w-[420px] text-xs text-gray-600 mt-1">
            <span>0 No Pain</span>
            <span>5 Moderate Pain</span>
            <span>10 Severe Pain</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Body Diagram */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <img
              src="https://care2.onetouchhealth.net/cm/in/images/bodyFrontBack.jpg"
              alt="Body Diagram"
              className="w-[380px]"
            />
          </div>
        </div>

        {/* Right Side: DataGrid */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: "#ccc",
                  color: "#555",
                  fontSize: "0.85rem",
                }}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: "#ccc",
                  color: "#555",
                  fontSize: "0.85rem",
                }}
              >
                Excel
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: "#ccc",
                  color: "#555",
                  fontSize: "0.85rem",
                }}
              >
                Column visibility
              </Button>
            </div>

            <TextField
              size="small"
              placeholder="Search"
              sx={{ width: 200 }}
            />
          </div>

          {/* DataGrid Table */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              hideFooterSelectedRowCount
              sx={{
                border: "1px solid #e5e7eb",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                  color: "#374151",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e5e7eb",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #e5e7eb",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyAssessmentHistory;
