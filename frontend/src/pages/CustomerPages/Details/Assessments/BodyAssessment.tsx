import React, { useState } from "react";
import { Button, TextField, MenuItem, Slider } from "@mui/material";

const BodyAssessment = () => {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);
  const [formData, setFormData] = useState({
    problem: "",
    cause: "",
    currentPain: 1,
    worstPain: 1,
    bestPain: 1,
    description: "",
    treatment: "",
  });

  // Handle click on body diagram
  const handleBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelectedPoint({ x, y });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log("Saved Body Assessment:", { selectedPoint, ...formData });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Body Assessment</h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6d28d9",
            "&:hover": { backgroundColor: "#5b21b6" },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
          }}
        >
          + Add Assessment
        </Button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Body Diagram */}
        <div className="flex justify-center">
          <div
            className="relative w-[400px] h-[500px] bg-white rounded-md shadow-sm flex justify-center items-center cursor-crosshair"
            onClick={handleBodyClick}
          >
            <img
              src="https://care2.onetouchhealth.net/cm/in/images/bodyFrontBack.jpg"
              alt="Human body diagram"
              className="w-[380px] select-none pointer-events-none"
            />

            {/* Dot indicator */}
            {selectedPoint && (
              <div
                className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-black"
                style={{
                  left: selectedPoint.x - 8,
                  top: selectedPoint.y - 8,
                }}
              />
            )}
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Affected Area</h2>

          <div className="flex flex-col gap-4">
            <TextField
              label="Problem"
              variant="outlined"
              value={formData.problem}
              onChange={(e) => handleInputChange("problem", e.target.value)}
              fullWidth
              multiline
            />

            <TextField
              label="Cause"
              variant="outlined"
              value={formData.cause}
              onChange={(e) => handleInputChange("cause", e.target.value)}
              fullWidth
              multiline
            />

            {/* Pain Scale Visual */}
            <div className="mt-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pain Scale (0–10)
              </label>
              <div className="w-full h-4 rounded-full mb-2"
                   style={{ background: "linear-gradient(to right, #10b981, #f59e0b, #ef4444)" }}>
              </div>
              <Slider
                value={formData.currentPain}
                onChange={(_, value) => handleInputChange("currentPain", value)}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="on"
                sx={{
                  color: "#3b9e9f",
                  "& .MuiSlider-thumb": { backgroundColor: "#3b9e9f" },
                }}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>No Pain</span>
                <span>Severe Pain</span>
              </div>
            </div>

            {/* Numeric Inputs */}
            <div className="grid grid-cols-3 gap-4">
              <TextField
                label="Current Pain"
                value={formData.currentPain}
                onChange={(e) => handleInputChange("currentPain", e.target.value)}
              />
              <TextField
                label="Worst Pain"
                value={formData.worstPain}
                onChange={(e) => handleInputChange("worstPain", e.target.value)}
              />
              <TextField
                label="Best Pain"
                value={formData.bestPain}
                onChange={(e) => handleInputChange("bestPain", e.target.value)}
              />
            </div>

            <TextField
              label="Description of Pain"
              select
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              fullWidth
            >
              <MenuItem value="">-- Select an Option --</MenuItem>
              <MenuItem value="sharp">Sharp</MenuItem>
              <MenuItem value="dull">Dull</MenuItem>
              <MenuItem value="throbbing">Throbbing</MenuItem>
              <MenuItem value="burning">Burning</MenuItem>
              <MenuItem value="stabbing">Stabbing</MenuItem>
            </TextField>

            <TextField
              label="Treatment"
              variant="outlined"
              value={formData.treatment}
              onChange={(e) => handleInputChange("treatment", e.target.value)}
              fullWidth
              multiline
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3b9e9f",
                "&:hover": { backgroundColor: "#2c7f80" },
                textTransform: "none",
                fontWeight: 600,
                alignSelf: "start",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BodyAssessment;
