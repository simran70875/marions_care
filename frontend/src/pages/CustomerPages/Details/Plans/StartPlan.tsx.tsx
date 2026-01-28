import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StartPlan: React.FC = () => {
    // const { id } = useParams();
    const [selectedAssessment, setSelectedAssessment] = useState("");
    const [outcomeText, setOutcomeText] = useState("");
    const [progress] = useState(30); // demo progress value
    const navigate = useNavigate();

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-10">
            {/* Top Header */}
            <div className="bg-white border-b shadow-sm p-5 flex flex-col gap-2">
                <Typography variant="h6" className="text-slate-700 font-semibold">
                    Plan Overview:
                    <span className="text-blue-600 font-semibold pl-3">
                        (Charles 'O CONNOR) Plan/Form
                    </span>
                </Typography>
            </div>

            <div className="pt-6">
                {/* Plan Header Info */}
                <div className="bg-white border shadow-sm p-5 mb-6">
                    <Typography className="text-slate-700 font-medium mb-1">
                        Title: <span className="font-semibold text-blue-700">Client Onboarding</span>
                    </Typography>
                    <Typography className="text-sm text-gray-600">
                        Plan/Form started on:{" "}
                        <span className="font-semibold text-blue-700">06-11-2025 07:10</span> &nbsp;|&nbsp;
                        By: <span className="font-semibold text-blue-700">Bhushan Mehra</span>
                    </Typography>
                </div>

                {/* Plan Details */}
                <Card className="rounded-2xl border shadow-md mb-8">
                    <CardContent>
                        <div className="flex justify-between">

                            <div>
                                <Typography variant="h6" className="font-semibold text-slate-700 mb-3">
                                    Plan/Form Details
                                </Typography>

                                <Typography variant="body2" className="text-gray-600 pb-10">
                                    Please complete each applicable section below by clicking on each box.
                                </Typography>
                            </div>

                            {/* Dropdown */}
                            <div>
                                <Select
                                    size="small"
                                    value={selectedAssessment}
                                    onChange={(e) => setSelectedAssessment(e.target.value)}
                                    displayEmpty
                                    className="bg-white rounded-md min-w-[260px]"
                                >
                                    <MenuItem value="">-- Select additional assessment --</MenuItem>
                                    <MenuItem value="CarePlanReview">Care Plan Review</MenuItem>
                                    <MenuItem value="MedicationReview">Medication Review</MenuItem>
                                </Select>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#2563eb",
                                        textTransform: "none",
                                        borderRadius: "8px",
                                        px: 3,
                                        mx: 2,
                                        "&:hover": { backgroundColor: "#1e40af" },
                                    }}
                                >
                                    Add to Plan
                                </Button>
                            </div>
                        </div>





                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Box */}
                            <div onClick={() => {
                                navigate('/customer/plans/start-plan/care-assessment')
                            }} className="bg-blue-600 text-white rounded-xl p-5 flex flex-col justify-between shadow-sm cursor-pointer">
                                <div>
                                    <Typography className="font-semibold text-lg pb-2">
                                        Initial Care Assessment
                                    </Typography>
                                    <Typography variant="body2" className="opacity-90 pb-2">
                                        Part 1
                                    </Typography>
                                </div>

                                <div className="w-full bg-blue-300/40 rounded-full h-2.5 mb-5">
                                    <div
                                        className="bg-white h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <Typography variant="caption" className="text-blue-100">
                                    Form Last Updated: 06-11-2025 07:30 <br />
                                    Current Status: Open
                                </Typography>
                            </div>

                            {/* Right Box */}
                            <div onClick={() => {
                                navigate('/customer/plans/start-plan/tags-view')
                            }} className="bg-blue-100 rounded-xl p-5 border border-blue-200 cursor-pointer">
                                <Typography
                                    variant="subtitle1"
                                    className="font-semibold text-blue-800 mb-2"
                                >
                                    Tags
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="text-blue-700 font-medium"
                                >
                                    (Admin Abilities)
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </Card>


                {/* Outcomes */}
                <Card className="rounded-2xl border shadow-sm mb-6">
                    <CardContent>
                        <Typography variant="h6" className="font-semibold text-slate-700 pb-3">
                            Outcomes
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={outcomeText}
                            onChange={(e) => setOutcomeText(e.target.value)}
                            placeholder="Describe the outcomes here..."
                            variant="outlined"
                            sx={{
                                backgroundColor: "#f1f5f9",
                                borderRadius: "8px",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#cbd5e1" },
                                    "&:hover fieldset": { borderColor: "#2563eb" },
                                    "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                                },
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Preview */}
                <Card className="rounded-2xl border shadow-sm mb-6">
                    <CardContent>
                        <Typography variant="h6" className="font-semibold text-slate-700 pb-3">
                            Preview
                        </Typography>
                        <Button
                           onClick={() => {
                            navigate("/customer/plans/plan/web-view")
                           }}
                            variant="outlined"
                            sx={{
                                borderColor: "#93c5fd",
                                color: "#2563eb",
                                textTransform: "none",
                                borderRadius: "8px",
                                "&:hover": { borderColor: "#2563eb", backgroundColor: "#eff6ff" },
                            }}
                        >
                            Web View
                        </Button>
                    </CardContent>
                </Card>

                {/* Sign Off Plan */}
                <Card className="rounded-2xl border shadow-sm mb-6">
                    <CardContent>
                        <Typography variant="h6" className="font-semibold text-slate-700 pb-3">
                            Sign Off Plan
                        </Typography>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: "#93c5fd",
                                color: "#2563eb",
                                textTransform: "none",
                                borderRadius: "8px",
                                "&:hover": { borderColor: "#2563eb", backgroundColor: "#eff6ff" },
                            }}
                        >
                            Sign Off
                        </Button>
                    </CardContent>
                </Card>

                {/* Finish Plan/Form */}
                <Card className="rounded-2xl border shadow-sm">
                    <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <Typography variant="h6" className="font-semibold text-slate-700">
                            Finish Plan/Form
                        </Typography>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#2563eb",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    "&:hover": { backgroundColor: "#1e40af" },
                                }}
                            >
                                Complete & Save Plan/Form
                            </Button>
                            <TextField
                                size="small"
                                placeholder="Next Review Date"
                                className="bg-white rounded-md"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StartPlan;
