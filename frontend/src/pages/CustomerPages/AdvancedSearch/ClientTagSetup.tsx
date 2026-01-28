import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Forward } from "lucide-react";

const rows = [
  {
    id: 230308,
    client: "Adrian Grogan",
    address: "Flat 31 Elmswood Park, 32 Bowes Street, M14 4UZ, Manchester",
    area: "Chorlton",
    tags: [
      "Risk Level: HIGH",
      "Carers Administer Meds",
      "Repositioned",
      "SALT",
    ],
  },
  {
    id: 230688,
    client: "Allan Cope",
    address:
      "Flat 56, Gorton Mill House, 420 Abbey Hey Lane, Gorton, Manchester, M18 8DU",
    area: "Longsight",
    tags: [
      "DNAR in place",
      "Risk Level: HIGH",
      "Carers Administer Meds",
      "Repositioned",
    ],
  },
  {
    id: 230153,
    client: "Amy Boss",
    address: "498 Claremont Road, M14 5WA, Manchester",
    area: "Chorlton",
    tags: ["DNAR in place", "Risk Level: MEDIUM", "Carers Administer Meds"],
  },
  {
    id: 230441,
    client: "Ann Shirley Lyons",
    address: "164 Ravenscar Crescent, Wythenshawe, Manchester, M22 0HN",
    area: "Wythenshawe",
    tags: [
      "DNAR in place",
      "Risk Level: MEDIUM",
      "Family Administer Meds",
      "Repositioned",
    ],
  },
  {
    id: 230370,
    client: "Arthur Choularton",
    address: "56 Grosvenor Street, Manchester, Lancashire, M1 7EW",
    area: "Longsight",
    tags: ["Risk Level: LOW", "Self Administer Meds"],
  },
];

const getTagColor = (tag: string) => {
  if (tag.includes("HIGH")) return "#f87171";
  if (tag.includes("MEDIUM")) return "#fbbf24";
  if (tag.includes("LOW")) return "#4ade80";
  if (tag.includes("DNAR")) return "#ec4899";
  if (tag.includes("Family")) return "#38bdf8";
  if (tag.includes("Carers")) return "#22d3ee";
  if (tag.includes("Self")) return "#60a5fa";
  if (tag.includes("SALT")) return "#06b6d4";
  if (tag.includes("Repositioned")) return "#a78bfa";
  return "#d1d5db";
};

const allTags = [
  "Carers Administer Meds",
  "DNAR in place",
  "Family Administer Meds",
  "Has Capacity",
  "Lacks Capacity",
  "Repositioned",
  "Risk Level: HIGH",
  "Risk Level: MEDIUM",
  "Risk Level: LOW",
  "Self Administer Meds",
  "Catheter",
  "Cough Assist",
  "PEG Feeding",
  "Peristeen",
  "SALT",
  "Stoma",
];

const recentlyUsed = ["Clear Pick"];

const ClientTagSetupSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");

  const handleOpen = (clientName: string) => {
    setSelectedClient(clientName);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const filteredRows = rows.filter(
    (row) =>
      row.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "No.", minWidth: 100, flex: 0.5 },
    {
      field: "client",
      headerName: "Client",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          className="text-purple-700 font-medium hover:underline cursor-pointer"
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "address", headerName: "Address", minWidth: 300, flex: 2 },
    {
      field: "area",
      headerName: "Area",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Box className="flex items-center justify-between w-full">
          <Typography>{params.value}</Typography>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleOpen(params.row.client)}
          >
            <Forward fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "tags",
      headerName: "Client Tags",
      flex: 2,
      minWidth: 250,
      renderCell: (params) => (
        <Box className="flex flex-wrap gap-1">
          {params.value.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: getTagColor(tag),
                color: "white",
                fontSize: "0.75rem",
                height: 22,
              }}
            />
          ))}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box className="flex items-center px-4 py-3 border-b border-gray-200 mb-4">
        <Typography variant="h5" className="text-2xl font-normal text-gray-800">
          &gt;&gt; Client Tag Setup
        </Typography>
      </Box>

      {/* Toolbar */}
      <Box className="p-3 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200">
        <Box className="flex flex-wrap gap-2 text-sm font-normal mb-3 md:mb-0">
          {[
            "Show 50 rows",
            "Copy",
            "Excel",
            "PDF",
            "Print",
            "Area Search",
            "Column visibility",
          ].map((label) => (
            <Button
              key={label}
              size="small"
              variant="outlined"
              className="normal-case font-normal text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              {label}
            </Button>
          ))}
        </Box>

        <Box className="flex items-center space-x-2">
          <Typography variant="body2" className="font-semibold text-gray-700">
            Search:
          </Typography>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 240 }}
            className="bg-white rounded-md border border-gray-300"
          />
        </Box>
      </Box>

      {/* Table */}
      <Box className="p-4">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[5, 10, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          className="border border-gray-300 rounded-md"
        />
      </Box>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: "z-[99999]", // ✅ this gives the modal topmost z-index
        }}
      >
        <DialogTitle className="bg-cyan-700 text-white">
          Tag Setup - {selectedClient}
        </DialogTitle>
        <DialogContent dividers className="bg-white">
          <Box className="mb-3">
            <Typography variant="body2" className="mb-2">
              Tags: (Click tags to add)
            </Typography>
            <TextField
              size="small"
              placeholder="Tag search"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box className="flex flex-wrap gap-1">
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  clickable
                  sx={{
                    backgroundColor: getTagColor(tag),
                    color: "white",
                    height: 26,
                    fontSize: "0.8rem",
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box className="mt-4">
            <Typography variant="body2" className="mb-1">
              Recently Used Tags:
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {recentlyUsed.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  clickable
                  sx={{
                    backgroundColor: "#e5e7eb",
                    color: "#111827",
                    height: 24,
                    fontSize: "0.8rem",
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="bg-gray-50">
          <Button onClick={handleClose} variant="outlined" color="inherit">
            Close
          </Button>
          <Button variant="contained" color="primary">
            Save Tags
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientTagSetupSearch;
