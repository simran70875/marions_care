import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    Copy,
    Table,
} from "lucide-react";
import { Box, Chip, Button, TextField, Typography } from '@mui/material';



// =================================================================
// 2. TYPE DEFINITIONS & DUMMY DATA 📋
// =================================================================

interface LetterReportItem {
    id: number; // Required by DataGrid
    letterSentDate: string;
    sentBy: string;
    letterType: string;
    client: string;
    area: string;
    seen: boolean;
    signedBy: string;
    carerSignOff: boolean;
    clientSignOff: boolean;
    status: "Sent" | "Draft" | "Failed";
}

const lettersData: LetterReportItem[] = [
    {
        id: 1001,
        letterSentDate: "25-10-2025",
        sentBy: "Admin User",
        letterType: "Service Review",
        client: "Charles O'Connor",
        area: "Wythenshawe",
        seen: true,
        signedBy: "Dr. Smith",
        carerSignOff: true,
        clientSignOff: true,
        status: "Sent",
    },
    {
        id: 1002,
        letterSentDate: "01-11-2025",
        sentBy: "Care Manager",
        letterType: "Complaint Response",
        client: "Ann Shirley Lyons",
        area: "Manchester",
        seen: false,
        signedBy: "N/A",
        carerSignOff: false,
        clientSignOff: false,
        status: "Draft",
    },
    {
        id: 1003,
        letterSentDate: "20-10-2025",
        sentBy: "Admin User",
        letterType: "Care Plan Change",
        client: "Arun Aroun",
        area: "Wythenshawe",
        seen: true,
        signedBy: "Manager A",
        carerSignOff: true,
        clientSignOff: false,
        status: "Sent",
    },
    {
        id: 1004,
        letterSentDate: "30-10-2025",
        sentBy: "Care Manager",
        letterType: "Discharge Notice",
        client: "Barry",
        area: "Wythenshawe",
        seen: false,
        signedBy: "N/A",
        carerSignOff: false,
        clientSignOff: false,
        status: "Failed",
    },
];

/**
 * Helper function to map status to Chip color.
 */
const getStatusProps = (status: LetterReportItem['status']) => {
    switch (status) {
        case 'Sent':
            return { label: status, color: 'success' as const, variant: 'filled' as const };
        case 'Draft':
            return { label: status, color: 'warning' as const, variant: 'filled' as const };
        case 'Failed':
            return { label: status, color: 'error' as const, variant: 'filled' as const };
        default:
            return { label: status, color: 'default' as const, variant: 'filled' as const };
    }
}

// =================================================================
// 4. COLUMN DEFINITIONS ⚙️
// =================================================================

const columns: GridColDef<LetterReportItem>[] = [
    { 
        field: 'letterSentDate', 
        headerName: 'Letter Sent Date', 
        flex: 1, 
        minWidth: 120,
        sortable: true,
    },
    { field: 'sentBy', headerName: 'Sent By', flex: 1, minWidth: 100 },
    { field: 'letterType', headerName: 'Type', flex: 1, minWidth: 120 },
    { field: 'client', headerName: 'Client', flex: 1.5, minWidth: 150 },
    { field: 'area', headerName: 'Area', flex: 1, minWidth: 100 },
    { 
        field: 'seen', 
        headerName: 'Seen', 
        flex: 0.5, 
        minWidth: 80,
        type: 'boolean',
        align: 'center',
        headerAlign: 'center',
    },
    { field: 'signedBy', headerName: 'Signed By', flex: 1, minWidth: 100 },
    { 
        field: 'carerSignOff', 
        headerName: 'Carer Sign Off', 
        flex: 0.8, 
        minWidth: 100,
        type: 'boolean',
        align: 'center',
        headerAlign: 'center',
    },
    { 
        field: 'clientSignOff', 
        headerName: 'Client Sign Off', 
        flex: 0.8, 
        minWidth: 100,
        type: 'boolean',
        align: 'center',
        headerAlign: 'center',
    },
    { 
        field: 'status', 
        headerName: 'Status', 
        flex: 0.8, 
        minWidth: 100,
        renderCell: (params) => (
            <Chip {...getStatusProps(params.value as LetterReportItem['status'])} size="small" />
        ),
    },
];

// =================================================================
// 5. MAIN COMPONENT 🖼️
// =================================================================

export default function ClientLettersReportMuiGrid() {
   return (
            <Box className="bg-white rounded-lg shadow-xl">
                
                {/* Report Title & Controls */}
                <Box className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
                        Client Letters Report
                    </h1>
                    
                   <Box className="flex items-center gap-3 text-sm">
                        <Typography component="label" htmlFor="date-start" sx={{ whiteSpace: 'nowrap' }}>
                            Select dates (DD-MM-YYYY)
                        </Typography>
                        <TextField
                            id="date-start"
                            type="date"
                            defaultValue="2025-11-01" // 01-11-2025
                            size="small"
                            sx={{ width: 150 }}
                        />
                        <Typography>to</Typography>
                         <TextField
                            id="date-end"
                            type="date"
                            defaultValue="2025-11-30" // 30-11-2025
                            size="small"
                            sx={{ width: 150 }}
                        />
                        <Button variant="contained" color="primary" sx={{ height: 40 }}>
                            Search
                        </Button>
                        <Button variant="outlined" sx={{ height: 40, color: 'gray', borderColor: 'gray' }}>
                            Clear
                        </Button>
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
                        rows={lettersData}
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