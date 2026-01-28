import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
    Search,
    Copy,
    Table,
} from "lucide-react";
import { Box, Chip, Button, TextField } from '@mui/material';

// =================================================================
// 2. TYPE DEFINITIONS & DUMMY DATA 📋
// =================================================================

interface FutureStatusItem {
    id: number; // Required by DataGrid
    name: string;
    currentStatus: "Active" | "In Hospital" | "Pending";
    originalStatus: "Active" | "In Hospital";
    setStatusChangeOn: string;
    changeTo: "In Hospital" | "Active" | "Pending";
    statusChangeUpdated: string;
    returnReviewDate: string;
    statusChangesBackTo: "Active" | "Pending";
    comments: string;
    changeType: "Return" | "Review";
}

const futureStatusData: FutureStatusItem[] = [
    {
        id: 1,
        name: "Meher Akhtar Choudhury",
        currentStatus: "Active",
        originalStatus: "Active",
        setStatusChangeOn: "03-06-2025\n09:47",
        changeTo: "In Hospital",
        statusChangeUpdated: "✔️",
        returnReviewDate: "19-01-2026\n10:39",
        statusChangesBackTo: "Active",
        comments: "Carers raised a concern with NOK regarding James not being well 02/06/2025. James taken to hospital via ambulance 03/06 due to low sodium",
        changeType: "Return",
    },
    {
        id: 2,
        name: "Ann Shirley Lyons",
        currentStatus: "Active",
        originalStatus: "Active",
        setStatusChangeOn: "03-06-2025\n09:47",
        changeTo: "In Hospital",
        statusChangeUpdated: "✔️",
        returnReviewDate: "01-12-2025\n10:50",
        statusChangesBackTo: "Active",
        comments: "Carers raised a concern with NOK regarding James not being well 02/06/2025. James taken to hospital via ambulance 03/06 due to low sodium",
        changeType: "Return",
    },
    {
        id: 3,
        name: "Marjorie McIver",
        currentStatus: "In Hospital",
        originalStatus: "In Hospital",
        setStatusChangeOn: "11-09-2025\n12:41",
        changeTo: "In Hospital",
        statusChangeUpdated: "✔️",
        returnReviewDate: "16-04-2026\n12:41",
        statusChangesBackTo: "Active",
        comments: "",
        changeType: "Return",
    },
    {
        id: 4,
        name: "Russell Wayne Folaiyo",
        currentStatus: "In Hospital",
        originalStatus: "In Hospital",
        setStatusChangeOn: "22-10-2025\n13:12",
        changeTo: "In Hospital",
        statusChangeUpdated: "✔️",
        returnReviewDate: "27-04-2026\n00:00",
        statusChangesBackTo: "Active",
        comments: "",
        changeType: "Review",
    },
    {
        id: 5,
        name: "Kalsoom Ul Haque",
        currentStatus: "Pending",
        originalStatus: "Active",
        setStatusChangeOn: "08-09-2025\n11:35",
        changeTo: "Pending",
        statusChangeUpdated: "✔️",
        returnReviewDate: "06-12-2025\n11:35",
        statusChangesBackTo: "Active",
        comments: "",
        changeType: "Return",
    },
];

// =================================================================
// 3. THEMING & CUSTOM RENDERING 🎨
// =================================================================


/**
 * Helper function to map status to Chip color for consistent status tags.
 */
const getStatusProps = (status: FutureStatusItem['currentStatus'] | FutureStatusItem['changeTo'] | FutureStatusItem['originalStatus'] | FutureStatusItem['statusChangesBackTo']) => {
    switch (status) {
        case 'Active':
            return { label: status, color: 'success' as const, variant: 'filled' as const };
        case 'In Hospital':
            return { label: status, color: 'primary' as const, variant: 'filled' as const };
        case 'Pending':
            return { label: status, color: 'warning' as const, variant: 'filled' as const };
        default:
            return { label: status, color: 'default' as const, variant: 'filled' as const };
    }
}

// =================================================================
// 4. COLUMN DEFINITIONS ⚙️
// =================================================================

const columns: GridColDef<FutureStatusItem>[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
        field: 'currentStatus',
        headerName: 'Current Status',
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
            <Chip {...getStatusProps(params.value)} size="small" />
        ),
    },
    {
        field: 'originalStatus',
        headerName: 'Original Status',
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
            <Chip {...getStatusProps(params.value)} size="small" />
        ),
    },
    { field: 'setStatusChangeOn', headerName: 'Set Status Change On', width: 150 },
    {
        field: 'changeTo',
        headerName: 'Status Change To',
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
            <Chip {...getStatusProps(params.value)} size="small" />
        ),
    },
    { field: 'statusChangeUpdated', headerName: 'Change Updated', width: 120, align: 'center', headerAlign: 'center' },
    { field: 'returnReviewDate', headerName: 'Return/Review Date', width: 150 },
    {
        field: 'statusChangesBackTo',
        headerName: 'Status Changes Back To',
        width: 180,
        renderCell: (params: GridRenderCellParams) => (
            <Chip {...getStatusProps(params.value)} size="small" />
        ),
    },
    { field: 'comments', headerName: 'Comments', flex: 1, minWidth: 300 },
    { field: 'changeType', headerName: 'Change Type', width: 120 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: () => (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" size="small" sx={{ borderColor: '#2563EB', color: '#2563EB', minWidth: '30px', padding: '4px 6px' }}>
                    Edit
                </Button>
                <Button variant="outlined" size="small" sx={{ borderColor: '#2563EB', color: '#2563EB', minWidth: '30px', padding: '4px 6px' }}>
                    Cancel
                </Button>
            </Box>
        ),
    },
];

// =================================================================
// 5. MAIN COMPONENT 🖼️
// =================================================================

export default function ClientsFutureStatusMuiGrid() {
    return (
            <Box className="bg-white rounded-lg shadow-xl">
                
                {/* Report Title & Controls */}
                <Box className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
                        Clients Future Status Changes
                    </h1>
                    
                    <Box className="flex gap-2">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            
                        >
                            View Completed
                        </Button>
                        <Button variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }}>
                            View All Future Status Changes
                        </Button>
                        <TextField
                            placeholder="Search"
                            size="small"
                            InputProps={{
                                startAdornment: <Search size={16} className="text-gray-400 mr-2" />,
                            }}
                            sx={{ width: 150 }}
                        />
                    </Box>
                </Box>
                
                {/* Export/Column Visibility Controls */}
                <Box className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <Box className="flex flex-wrap gap-3 text-sm font-medium mb-4 md:mb-0">
                        <Button color="inherit" startIcon={<Copy size={16} />}>Copy</Button>
                        <Button color="inherit">Export Excel</Button>
                        <Button color="inherit">Export CSV</Button>
                        <Button color="inherit">Export PDF</Button>
                        <Button color="inherit">Print</Button>
                        <Button color="inherit">Area Search</Button>
                        <Button color="inherit" startIcon={<Table size={16} />}>Column visibility</Button>
                    </Box>
                </Box>
                
                {/* MUI DataGrid Table */}
                <Box sx={{ height: 400, width: '100%', borderTop: '1px solid #e5e7eb' }}>
                    <DataGrid
                        rows={futureStatusData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                        // Custom styling to mimic hover effect
                        sx={{
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#f9fafb', // hover:bg-gray-50
                            },
                        }}
                    />
                </Box>

            </Box>
    );
}