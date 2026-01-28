import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "../../../../components/ui/button/Button";

interface AssessmentRow {
  id: number;
  createdBy: string;
  date: string;
  classification: string;
  location: string;
  surfaceArea: string;
  grade: string;
  infectionStatus: string;
  reviewDate: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 80 },
  { field: "createdBy", headerName: "Created By", width: 150 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "classification", headerName: "Classification", width: 180 },
  { field: "location", headerName: "Location of Wound", width: 200 },
  { field: "surfaceArea", headerName: "Surface Area", width: 160 },
  { field: "grade", headerName: "Grade", width: 120 },
  { field: "infectionStatus", headerName: "Infection Status", width: 160 },
  { field: "reviewDate", headerName: "Review Date", width: 160 },
  {
    field: "details",
    headerName: "Details",
    width: 130,
    renderCell: () => (
      <Button className="bg-sky-600 hover:bg-sky-700 text-white text-xs px-3 py-1">
        View
      </Button>
    ),
  },
];

const rows: AssessmentRow[] = []; // dummy data for now

export default function SkinAssessmentHistory() {
  const [status, setStatus] = useState<string>("Not Healed");

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-lg font-semibold text-gray-800">
          🩹 Wound / Skin Assessment History
        </h1>
        <Button className="bg-sky-600 hover:bg-sky-700">New Assessment</Button>
      </div>

      {/* Client Info */}
      <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-md border border-gray-200">
        <div>
          <span className="font-semibold text-gray-700">Client:</span>{" "}
          <span className="text-gray-800">Ellisha Bickerton</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Client No:</span>{" "}
          <span className="text-gray-800">230708</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">DOB:</span>{" "}
          <span className="text-gray-800">30-11-2001</span>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-md text-sm">
        ⚠️ No Allergies Inserted for this Client
      </div>

      {/* Body Part Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-700">Choose a body part:</h2>
        <div className="flex gap-3">
          {["Front / Back", "Feet", "Head", "Side"].map((part) => (
            <Button
              key={part}
              className="bg-sky-700 hover:bg-sky-800 text-sky-700 font-medium px-4 py-2 rounded-md"
            >
              {part}
            </Button>
          ))}
        </div>

        {/* Body Outline */}
        <div className="flex justify-center mt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 w-[380px] h-[380px] flex items-center justify-center">
            <img
              src="https://care2.onetouchhealth.net/cm/in/images/bodyFrontBack.jpg"
              alt="Body Outline"
              className="object-contain w-full h-full opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Filter + Actions */}
      <div className="flex justify-between items-center mt-8">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-md p-2 text-gray-700"
        >
          <option value="Not Healed">Not Healed</option>
          <option value="Healed">Healed</option>
        </select>

        <div className="flex gap-2">
          <Button className="bg-gray-500 text-gray-700 px-4 py-1">Print</Button>
          <Button className="bg-gray-500 text-gray-700 px-4 py-1">Excel</Button>
          <Button className="bg-gray-500 text-gray-700 px-4 py-1">
            Column Visibility
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm">
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          paginationModel={{ pageSize: 5, page: 0 }}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f1f5f9",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              fontSize: 14,
            },
          }}
        />
      </div>
    </div>
  );
}
