import React, { useState } from "react";
import {
    Button,
    Modal,
    Box,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DigitalTaskSheet: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const tasks: any = [];

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "task", headerName: "Task", flex: 1 },
        { field: "details", headerName: "Details", flex: 1 },
        { field: "startDate", headerName: "Start Date", width: 150 },
        { field: "finishDate", headerName: "Finish Date", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Ellisha Bickerton - Digital TaskSheet Schedule
                </h1>
                <div className="flex gap-3">
                    <Button variant="contained" color="info">
                        History
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Add New Task
                    </Button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex items-center gap-4 mb-4">
                <TextField
                    type="date"
                    size="small"
                    label="Select Date"
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl size="small">
                    <InputLabel>Themes</InputLabel>
                    <Select label="Themes" defaultValue="">
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Missed">Missed</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined">Print</Button>
                <Button variant="outlined">Column Visibility</Button>
                <Button variant="outlined">Month View</Button>
            </div>

            {/* DataGrid */}
            <div className="bg-white rounded-xl shadow border p-4">
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            {/* Modal for Add New Task */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    className="absolute top-1/2 left-1/2 bg-white rounded-xl shadow-lg p-6 w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[90vh]"
                >
                    <Typography variant="h6" className="mb-4 font-semibold">
                        Create Digital TaskSheet
                    </Typography>
                    <div className="p-2"></div>
                    <div className="space-y-4">
                        <div>
                            <TextField
                                fullWidth
                                label="Select Task"
                                placeholder="Search Tasks"
                                size="small"
                            />
                            <div className="p-1"></div>
                            <Button className="mt-2" variant="contained">
                                Add New Task
                            </Button>
                        </div>


                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Details"
                            placeholder="Enter task details"
                        />
                        <div className="p-2"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <TextField
                                type="date"
                                label="Start Date"
                                fullWidth
                                size="small"
                            />
                            <TextField
                                type="date"
                                label="Finish Date"

                                fullWidth
                                size="small"
                            />
                        </div>

                        <FormControlLabel control={<Checkbox />} label="Mandatory" />

                        <TextField
                            type="time"
                            label="Time"
                            fullWidth
                            size="small"
                        />
                        <div className="p-2"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <FormControl size="small" fullWidth>
                                <InputLabel>Repeat Every</InputLabel>
                                <Select defaultValue="1" label="Repeat Every">
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" fullWidth>
                                <InputLabel>Unit</InputLabel>
                                <Select defaultValue="days" label="Unit">
                                    <MenuItem value="days">Days</MenuItem>
                                    <MenuItem value="weeks">Weeks</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="contained" color="success">
                                Save
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default DigitalTaskSheet;
