import DataTable from "../common/DataTable";

export default function ShiftTable() {
  const rows = [
    { id: 1, date: "27-09-2025", customer: "Allan Cope", area: "Longsight", dueIn: "03:00", dueOut: "03:30" },
    { id: 2, date: "28-09-2025", customer: "Adrian Grogan", area: "Chorlton", dueIn: "05:30", dueOut: "06:00" },
    { id: 3, date: "29-09-2025", customer: "Favour Abiodun", area: "Chorlton", dueIn: "12:00", dueOut: "13:00" },
  ];

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "customer", headerName: "Customer Name", flex: 2 },
    { field: "area", headerName: "Area", flex: 1 },
    { field: "dueIn", headerName: "Due In", flex: 1 },
    { field: "dueOut", headerName: "Due Out", flex: 1 },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Shifts With No Assigned Carer</h3>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
}
