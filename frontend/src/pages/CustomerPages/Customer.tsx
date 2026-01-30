import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { GridColDef, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  Download,
  FileText,
  Printer,
  Copy,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useApi } from "../../hooks/useApi";
import { customerServices } from "../../services/customerServices";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import Select from "../../components/form/Select";
import DataTable from "../../components/common/DataTable";

// types/Customer.ts
export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  postcode?: string;
  country?: string;
  unit?: string;
  area: string;
}

export interface Finance {
  councilIdNo?: string;
  billingCode?: string;
  contractHours?: number;
  contractFee?: number;
  invoiceDiscount?: number;
  invoiceCycle?: string;
  payForTravel?: "Yes" | "No";
  travelDeduction?: number;
  commission?: number;
  jobType?: string;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived" },
  { value: "in-hospital", label: "In Hospital" },
];

export interface CustomerRow {
  _id: string;
  userId?: string;
  clientIdNo?: string;
  nhsNumber?: string;
  localPatientIdentifier?: string;
  healthAndCareNumber?: string;
  communityHealthIndexNumber?: string;

  firstName: string;
  lastName: string;
  knownAs?: string;
  fullNameOfficial?: string;
  gender?: string;
  maritalStatus?: string;
  spouseName?: string;
  nationality?: string;
  dateOfBirth?: string;

  email?: string;
  contactNumber?: string;
  mobileNumber?: string;
  preferredContactMethod?: string;

  firstContactDate?: string;
  serviceCommenced?: string;
  referralBy?: string;
  referralReason?: string;
  referralNote?: string;
  referralDate?: string;

  address: Address;
  finance?: Finance;

  additionalInformation?: string;
  dataSharing?: string;

  status: "active" | "Inactive" | "pending" | "archived" | "in-hospital";
  isDeleted?: boolean;
  deletedAt?: string;

  // Extra computed fields for UI
  name?: string; // full name shortcut
  type?: string;
  councilId?: string;
  dob?: string; // optional formatted string for DataGrid
}

const statusMap = ["active", "pending", "archived", "all"];

export default function CustomerPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
  const [paginationModel, setPaginationModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 100 });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: "include",
      ids: new Set<GridRowId>([]),
    });

  useEffect(() => {
    console.log("Row selection model changed:", rowSelectionModel);
  }, [rowSelectionModel]);

  const { data, loading, call } = useApi<{
    data: CustomerRow[];
    pagination: any;
  }>();

  console.log("Customer data:", data);

  const fetchCustomers = async () => {
    const status = statusMap[activeTab];
    const params: {
      search: string;
      page: number;
      limit: number;
      status: string;
    } = {
      search,
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      status: status === "all" ? "" : status, // send empty string if 'all'
    };
    if (status !== "all") params.status = status;

    try {
      const res = await call(customerServices.getUsers(params));
      setTotalRows(res.pagination.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [activeTab, search, paginationModel]);

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchor(event.currentTarget);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a CSV or Excel file");
      return;
    }

    try {
      setImportLoading(true);
      setImportProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      await call(
        customerServices.uploadBulk(formData, {
          onUploadProgress: (progressEvent: any) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setImportProgress(percent);
          },
        }),
      );

      toast.success("Customers imported successfully");
      fetchCustomers();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to import customers");
    } finally {
      setImportLoading(false);
      setImportProgress(0);
      e.target.value = "";
    }
  };

  const handleExportClose = () => {
    setExportAnchor(null);
  };

  const avatarColors = [
    "#F44336", // red
    "#E91E63", // pink
    "#9C27B0", // purple
    "#3F51B5", // indigo
    "#2196F3", // blue
    "#03A9F4", // light blue
    "#009688", // teal
    "#4CAF50", // green
    "#FF9800", // orange
    "#FF5722", // deep orange
  ];

  const columns: GridColDef<CustomerRow>[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const firstLetter =
          params.row?.firstName?.charAt(0)?.toUpperCase() || "?";
        const colorIndex =
          Number(params.row?._id.slice(-1)) % avatarColors.length;
        return (
          <Box display="flex" gap={1} alignItems={"center"} height={"100%"}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/customer/view", { state: { id: params.row._id } })
              }
            >
              <Avatar sx={{ bgcolor: avatarColors[colorIndex], color: "#fff" }}>
                {firstLetter}
              </Avatar>
            </div>
          </Box>
        );
      },
    },
    { field: "_id", headerName: "ID", width: 120 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "knownAs", headerName: "Known As", width: 120 },
    { field: "fullNameOfficial", headerName: "Official Name", width: 150 },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "contactNumber",
      headerName: "Phone",
      width: 150,
      renderCell: (params) =>
        (params.row?.contactNumber || params.row?.mobileNumber) ?? "",
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 110,
      renderCell: (params) => params.row?.dateOfBirth?.split("T")[0] || "",
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      renderCell: (params) =>
        `${params.row?.address?.addressLine1 || ""}, ${params.row?.address?.town || ""}, ${params.row?.address?.county || ""}`,
    },
    {
      field: "area",
      headerName: "Area",
      width: 120,
      renderCell: (params) => params.row?.address?.area || "",
    },
    {
      field: "councilId",
      headerName: "Council ID",
      width: 120,
      renderCell: (params) => params.row?.finance?.councilIdNo || "",
    },
    {
      field: "contractFee",
      headerName: "Contract Fee",
      width: 120,
      renderCell: (params) => params.row?.finance?.contractFee || "",
    },
    {
      field: "invoiceCycle",
      headerName: "Invoice Cycle",
      width: 120,
      renderCell: (params) => params.row?.finance?.invoiceCycle || "",
    },
    {
      field: "payForTravel",
      headerName: "Pay For Travel",
      width: 120,
      renderCell: (params) => params.row?.finance?.payForTravel || "",
    },
    {
      field: "referralBy",
      headerName: "Referral By",
      width: 150,
    },
    {
      field: "additionalInformation",
      headerName: "Additional Info",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const currentStatus = params.row.status;

        return (
          <Select
            options={statusOptions}
            value={currentStatus}
            className="min-w-[140px]"
            onChange={async (newStatus: string) => {
              if (newStatus === currentStatus) return;

              const confirmed = window.confirm(
                `Are you sure you want to change status from "${currentStatus}" to "${newStatus}"?`,
              );

              if (!confirmed) return;

              try {
                await call(
                  customerServices.updateStatus(params.row._id, newStatus),
                );

                toast.success("Status updated successfully");

                // refresh list
                fetchCustomers();
              } catch (err: any) {
                toast.error(
                  err?.response?.data?.message || "Failed to update status",
                );
              }
            }}
          />
        );
      },
    },
    {
      field: "visits",
      headerName: "Visits",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => navigate(`/customer/visits/${params.row?._id}`)}
        >
          <Calendar />
        </IconButton>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const navigate = useNavigate();

        return (
          <Box display="flex" gap={1} alignItems={"center"} height={"100%"}>
            {/* Update */}
            <IconButton
              size="small"
              color="info"
              onClick={() =>
                navigate("/customers/addClient", {
                  state: { id: params.row._id },
                })
              }
              title="Update Customer"
            >
              <Edit size={16} />
            </IconButton>

            {/* Delete */}
            <IconButton
              size="small"
              color="error"
              title="Delete Customer"
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this customer? This is a soft delete — you can restore this customer within 30 days. After 30 days, the customer and all related data will be permanently deleted.",
                );

                if (!confirmed) return;

                try {
                  await call(customerServices.deleteCustomer(params.row._id));

                  toast.success("Customer deleted successfully");

                  // Refresh customer list
                  fetchCustomers();
                } catch (err: any) {
                  toast.error(
                    err?.response?.data?.message || "Failed to delete customer",
                  );
                }
              }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  // Dynamic heading + subtitle based on tab
  const tabTitles = [
    {
      title: "Active Customers",
      subtitle: "Manage all currently active customers.",
    },
    {
      title: "Pending Customers",
      subtitle: "Approve or reject pending customer requests.",
    },
    {
      title: "Archived Customers",
      subtitle: "Restore previously archived customers.",
    },
    { title: "All Customers", subtitle: "View all customers in the system." },
  ];

  const handleExport = async (type: "csv" | "excel" | "print" | "copy") => {
    if (!data) return;

    const rowsToExport = data?.data.map((c) => ({
      ID: c._id,
      Name: `${c.firstName} ${c.lastName}`,
      Email: c.email,
      Phone: c.contactNumber || c.mobileNumber,
      DOB: c.dateOfBirth,
      Status: c.status,
      Address: `${c.address.addressLine1 || ""}, ${c.address.town || ""}, ${c.address.county || ""}`,
      Area: c.address.area,
      CouncilID: c.finance?.councilIdNo,
      ContractFee: c.finance?.contractFee,
      InvoiceCycle: c.finance?.invoiceCycle,
      PayForTravel: c.finance?.payForTravel,
      AdditionalInfo: c.additionalInformation,
      ReferralBy: c.referralBy,
    }));

    if (type === "copy") {
      const text = rowsToExport
        .map((r) => Object.values(r).join("\t"))
        .join("\n");
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } else if (type === "print") {
      const printContent = rowsToExport
        .map((r) => Object.values(r).join(" | "))
        .join("\n");
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(`<pre>${printContent}</pre>`);
      printWindow?.document.close();
      printWindow?.print();
    } else {
      // CSV / Excel
      const worksheet = XLSX.utils.json_to_sheet(rowsToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

      const buffer = XLSX.write(workbook, {
        bookType: type === "csv" ? "csv" : "xlsx",
        type: "array",
      });

      const blob = new Blob([buffer], {
        type:
          type === "csv"
            ? "text/csv;charset=utf-8;"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `customers.${type === "csv" ? "csv" : "xlsx"}`);
    }

    handleExportClose(); // close the menu
  };

  return (
    <Box>
      {/* Heading + Subtitle */}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {tabTitles[activeTab].title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tabTitles[activeTab].subtitle}
          </Typography>
        </Box>
        {/* Search Middle */}
        <div className="relative">
          <button className="absolute -translate-y-1/2 left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </button>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPaginationModel((prev) => ({ ...prev, page: 0 }));
            }}
            type="text"
            placeholder="Search or type command..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
          />

          <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
            <span> ⌘ </span>
            <span> K </span>
          </button>
        </div>

        {/* Buttons Right */}
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/customers/addClient")}
          >
            + Add Customer
          </Button>
        </Box>
      </Box>

      {/* Header Controls */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {/* Tabs Left */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ minHeight: "44px" }}
        >
          <Tab label="Active Customers" />
          <Tab label="Pending Customers" />
          <Tab label="Archived Customers" />
          <Tab label="All Customers" />
        </Tabs>

        <Box display="flex" alignItems="center" gap={2}>
          <div>
            <Button
              variant="outlined"
              onClick={handleImportClick}
              startIcon={<Download size={16} />}
              disabled={importLoading}
            >
              {importLoading ? "Importing..." : "Import"}
            </Button>
            {importLoading && (
              <Box mt={1} width={250}>
                <Typography variant="caption">
                  Uploading: {importProgress}%
                </Typography>
                <Box
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#e0e0e0",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${importProgress}%`,
                      backgroundColor: "#1976d2",
                      transition: "width 0.3s",
                    }}
                  />
                </Box>
              </Box>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls"
            style={{ display: "none" }}
          />

          <Button
            variant="outlined"
            onClick={handleExportClick}
            startIcon={<Download size={16} />}
          >
            Export
          </Button>
        </Box>

        <Menu
          anchorEl={exportAnchor}
          open={Boolean(exportAnchor)}
          onClose={handleExportClose}
        >
          <MenuItem onClick={() => handleExport("csv")}>
            <FileText size={16} className="mr-2" /> Export as CSV
          </MenuItem>
          <MenuItem onClick={() => handleExport("excel")}>
            <FileText size={16} className="mr-2" /> Export as Excel
          </MenuItem>
          <MenuItem onClick={() => handleExport("print")}>
            <Printer size={16} className="mr-2" /> Print
          </MenuItem>
          <MenuItem onClick={() => handleExport("copy")}>
            <Copy size={16} className="mr-2" /> Copy
          </MenuItem>
        </Menu>
      </Box>

      {/* <DataGrid
          rows={data?.data || []}
          columns={columns}
          loading={loading}
          rowCount={totalRows}
          paginationMode="server"
          paginationModel={{ page, pageSize }} // <-- use this instead of 'page' and 'pageSize'
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
          getRowId={(row) => row?._id}
        /> */}

      <DataTable
        rows={data?.data || []}
        columns={columns}
        loading={loading}
        rowCount={totalRows}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)}
        getRowId={(row: any) => row._id}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newSelection: any) => {
          setRowSelectionModel(newSelection);
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Box>
  );
}
