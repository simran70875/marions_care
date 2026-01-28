import  { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pencil, Plus } from "lucide-react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Button as MuiButton,
} from "@mui/material";
import Button from "../../../../components/ui/button/Button";
import { useNavigate } from "react-router";

const AssessmentPage = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const [newAssessment, setNewAssessment] = useState({
        name: "",
        assessmentDate: "",
        nextAssessmentDate: "",
        assessedBy: "",
        note: "",
    });

    const rows = [
        {
            id: 1,
            name: "Medical Assessment",
            assessmentDate: "03-11-2025",
            nextAssessmentDate: "03-08-2026",
            assessedBy: "Dr. Smith",
            note: "Quarterly review pending.",
        },
        {
            id: 2,
            name: "Pre Admission",
            assessmentDate: "Date Not Set",
            nextAssessmentDate: "Date Not Set",
            assessedBy: "",
            note: "",
        },
        {
            id: 3,
            name: "Care Plan Review",
            assessmentDate: "Date Not Set",
            nextAssessmentDate: "Date Not Set",
            assessedBy: "",
            note: "",
        },
    ];

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "assessmentDate", headerName: "Assessment Date", flex: 1 },
        { field: "nextAssessmentDate", headerName: "Next Assessment Date", flex: 1 },
        { field: "assessedBy", headerName: "Assessed By", flex: 1 },
        {
            field: "actions",
            headerName: "Update",
            width: 120,
            renderCell: (params) => (
                <button
                    className="border border-gray-400 rounded p-1.5 hover:bg-gray-100 text-orange-500"
                    onClick={() => handleEdit(params.row)}
                >
                    <Pencil size={18} />
                </button>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    const handleEdit = (row: any) => {
        setSelected(row);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenEdit(false);
        setSelected(null);
    };

    const handleUpdate = () => {
        // Here you can send update API call
        console.log("Updated values:", selected);
        handleClose();
    };


    const handleAddOpen = () => setOpenAdd(true);
    const handleAddClose = () => {
        setOpenAdd(false);
        setNewAssessment({
            name: "",
            assessmentDate: "",
            nextAssessmentDate: "",
            assessedBy: "",
            note: "",
        });
    };

    const handleAddSave = () => {
        console.log("New assessment added:", newAssessment);
        handleAddClose();
    };

    const navigate = useNavigate()

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-gray-700">
                    Assessments
                </h1>

                <Button
                    variant="outline"

                    onClick={() => {
                        navigate('/customers/settings/assessment-type')
                    }}
                >
                    <Plus size={18} className="text-blue-500" />
                    Assessment Set-up
                </Button>
            </div>


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
                    onClick={handleAddOpen}
                    variant="outline"
                    className="border border-gray-400 text-green-600 hover:bg-green-50 font-semibold flex items-center gap-1"
                >
                    <Plus size={18} /> Add New Assessment
                </Button>
            </div>

            {/* -------- Modal -------- */}
            <Dialog
                open={openEdit}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle className="bg-teal-500 text-white font-semibold">
                    Edit Assessment
                </DialogTitle>

                <DialogContent className="mt-3">
                    <div className="flex flex-col space-y-4">
                        <div className="pb-2"></div>
                        <TextField

                            label="Name"
                            fullWidth
                            value={selected?.name || ""}
                        />
                        <div className="pb-2"></div>
                        <TextField
                            label="Assessment Date"
                            fullWidth
                            type="date"
                            value={
                                selected?.assessmentDate && selected.assessmentDate !== "Date Not Set"
                                    ? selected.assessmentDate.split("-").reverse().join("-")
                                    : ""
                            }
                            onChange={(e) =>
                                setSelected({ ...selected, assessmentDate: e.target.value })
                            }
                        />
                        <div className="pb-2"></div>
                        <TextField
                            label="Next Assessment Date"
                            fullWidth
                            type="date"
                            value={
                                selected?.nextAssessmentDate &&
                                    selected.nextAssessmentDate !== "Date Not Set"
                                    ? selected.nextAssessmentDate.split("-").reverse().join("-")
                                    : ""
                            }
                            onChange={(e) =>
                                setSelected({ ...selected, nextAssessmentDate: e.target.value })
                            }
                        />
                        <div className="pb-2"></div>
                        <TextField
                            label="Assessed By"
                            select
                            fullWidth
                            value={selected?.assessedBy || ""}
                            onChange={(e) =>
                                setSelected({ ...selected, assessedBy: e.target.value })
                            }
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                            <MenuItem value="Nurse Allen">Nurse Allen</MenuItem>
                        </TextField>
                        <div className="pb-2"></div>
                        <TextField
                            label="Note"
                            multiline
                            rows={3}
                            fullWidth
                            value={selected?.note || ""}
                            onChange={(e) => setSelected({ ...selected, note: e.target.value })}
                        />
                        <div className="pb-2"></div>
                    </div>
                </DialogContent>

                <DialogActions className="p-4 flex justify-between">
                    <MuiButton
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        sx={{ backgroundColor: "#3b9e9f" }}
                    >
                        Update
                    </MuiButton>
                    <MuiButton variant="outlined" color="warning">
                        Archive
                    </MuiButton>
                    <MuiButton variant="outlined" color="error" onClick={handleClose}>
                        Cancel
                    </MuiButton>
                </DialogActions>
                <div className="pb-2"></div>
            </Dialog>


            {/* ======= Add Modal ======= */}
            <Dialog
                open={openAdd}
                onClose={handleAddClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    className: "z-[99999] relative",
                }}
                sx={{
                    "& .MuiBackdrop-root": { zIndex: 99998 },
                    "& .MuiDialog-paper": { borderRadius: "10px", overflow: "hidden" },
                }}
            >
                <DialogTitle className="bg-teal-500 text-white font-semibold">
                    Add New Assessment
                </DialogTitle>
                <DialogContent className="mt-3">
                    <div className="flex flex-col space-y-4">
                        <div className="pb-2"></div>
                        <TextField
                            label="Assessment Name"
                            select
                            fullWidth
                            value={newAssessment.name}
                            onChange={(e) =>
                                setNewAssessment({ ...newAssessment, name: e.target.value })
                            }
                        >
                            <MenuItem value="">Select Assessment</MenuItem>
                            <MenuItem value="Medical Assessment">Medical Assessment</MenuItem>
                            <MenuItem value="Pre Admission">Pre Admission</MenuItem>
                            <MenuItem value="Meds Review">Meds Review</MenuItem>
                            <MenuItem value="Care Plan Review">Care Plan Review</MenuItem>
                            <MenuItem value="Property Risk Assessment">
                                Property Risk Assessment
                            </MenuItem>
                            <MenuItem value="SpotCheck">SpotCheck</MenuItem>
                            <MenuItem value="Quality Call">Quality Call</MenuItem>
                        </TextField>
                        <div className="pb-2"></div>
                        <TextField
                            label="Assessment Date"
                            type="date"
                            fullWidth
                            value={newAssessment.assessmentDate}
                            onChange={(e) =>
                                setNewAssessment({
                                    ...newAssessment,
                                    assessmentDate: e.target.value,
                                })
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                        <div className="pb-2"></div>
                        <TextField
                            label="Next Assessment Date"
                            type="date"
                            fullWidth
                            value={newAssessment.nextAssessmentDate}
                            onChange={(e) =>
                                setNewAssessment({
                                    ...newAssessment,
                                    nextAssessmentDate: e.target.value,
                                })
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                        <div className="pb-2"></div>
                        <TextField
                            label="Assessed By"
                            select
                            fullWidth
                            value={newAssessment.assessedBy}
                            onChange={(e) =>
                                setNewAssessment({
                                    ...newAssessment,
                                    assessedBy: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                            <MenuItem value="Nurse Allen">Nurse Allen</MenuItem>
                        </TextField>
                        <div className="pb-2"></div>
                        <TextField
                            label="Note"
                            multiline
                            rows={3}
                            fullWidth
                            value={newAssessment.note}
                            onChange={(e) =>
                                setNewAssessment({ ...newAssessment, note: e.target.value })
                            }
                        />
                    </div>
                </DialogContent>
                <DialogActions className="p-4 flex justify-between">
                    <MuiButton
                        variant="contained"
                        color="primary"
                        onClick={handleAddSave}
                        sx={{ backgroundColor: "#3b9e9f" }}
                    >
                        Save
                    </MuiButton>
                    <MuiButton variant="outlined" color="error" onClick={handleAddClose}>
                        Cancel
                    </MuiButton>
                </DialogActions>
                <div className="pb-5"></div>

            </Dialog>

        </div>
    );
};

export default AssessmentPage;
