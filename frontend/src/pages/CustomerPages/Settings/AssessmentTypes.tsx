import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MoveRight, Pencil, Plus } from "lucide-react";
import Button from "../../../components/ui/button/Button";

const AssessmentType = () => {
  const rows = [
    { id: 1, type: "Care Plan Review", duration: "6 month" },
    { id: 2, type: "Medical Assessment", duration: "9 month" },
    { id: 3, type: "Meds Review", duration: "6 month" },
    { id: 4, type: "Pre Admission", duration: "" },
    { id: 5, type: "Property Risk Assessment", duration: "6 month" },
    { id: 6, type: "Quality Call", duration: "4 week" },
    { id: 7, type: "SpotCheck", duration: "4 week" },
  ];

  const columns: GridColDef[] = [
    {
      field: "icon",
      headerName: "",
      width: 80,
      align:'center',
      renderCell: () => (
        <div className="text-green-600 text-2xl font-bold flex justify-center w-full">
          <MoveRight />        
          </div>
      ),
      sortable: false,
      filterable: false,
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "duration", headerName: "Default Duration", flex: 1 },
    {
      field: "actions",
      headerName: "Edit Name",
      width: 120,
      renderCell: () => (
        <button className="border border-gray-400 rounded p-1.5 hover:bg-gray-100 text-orange-500">
          <Pencil size={18} />
        </button>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold mb-4 text-gray-700">
        Assessment Type
      </h1>

      <div className="border rounded-lg overflow-hidden">
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          autoHeight
          disableColumnMenu
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #ddd",
            },
          }}
        />
      </div>

      <div className="flex justify-center mt-5">
        <Button
          variant="outline"
          className="border border-gray-400 text-green-600 hover:bg-green-50 font-semibold flex items-center gap-1"
        >
          <Plus size={18} /> Add New
        </Button>
      </div>
    </div>
  );
};

export default AssessmentType;
