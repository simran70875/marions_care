import { useState } from "react";
import Button from "../../../../components/ui/button/Button";
import { Card, CardContent } from "@mui/material";

const bodyParts = [
    { id: "front-back", label: "Front / Back" },
    { id: "feet", label: "Feet" },
    { id: "head", label: "Head" },
    { id: "side", label: "Side" },
];

export default function SkinAssessment() {
    const [selectedBodyPart, setSelectedBodyPart] = useState("feet");
    const [step, setStep] = useState(1);

    const handleSelectPart = (part:any) => {
        setSelectedBodyPart(part);
        setStep(2);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="text-xl font-semibold text-gray-800">
                    🩹 New Wound / Skin Assessment
                </h1>
                <Button className="bg-sky-600 hover:bg-sky-700">History</Button>
            </div>

            {/* Step 1: Choose a Body Part */}
            <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                    <h2 className="font-semibold text-gray-700 mb-4">
                        1️⃣ Choose a body part:
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {bodyParts.map((part) => (
                            <Button
                                key={part.id}
                                className={`${selectedBodyPart === part.id
                                        ? "bg-sky-700 text-white"
                                        : "bg-sky-700 text-sky-700 hover:bg-sky-800"
                                    }`}
                                onClick={() => handleSelectPart(part.id)}
                            >
                                {part.label}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Step 2: Mark location */}
            <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                    <h2 className="font-semibold text-gray-700 mb-3">
                        2️⃣ Mark the location of the wound on the image:
                    </h2>
                    <div className="flex justify-center">
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 w-[400px] h-[400px] flex items-center justify-center">
                            <img
                                src={
                                    selectedBodyPart === "feet"
                                        ? "https://media.istockphoto.com/id/163918431/vector/seven-man-feet-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=QCjZjy1f7rH4KOYxi0vb5HIIHVhSyNarq2yE1OCWa6Y="
                                        : "https://care2.onetouchhealth.net/cm/in/images/bodyFrontBack.jpg"
                                }
                                alt="Body Part"
                                className="object-contain w-full h-full opacity-90"
                            />
                            <Button
                                onClick={() => setStep(3)}
                                className="absolute bottom-3 right-3 bg-sky-600 hover:bg-sky-700"
                            >
                                Continue ➜
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Step 3: Fill in Details */}
            {step >= 3 && (
                <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="font-semibold text-gray-700 mb-3">
                            3️⃣ Fill in the details:
                        </h2>

                        {/* Wound / Skin Assessment Overview */}
                        <div className="bg-[#e5f6ff] rounded-md p-4 border border-sky-200">
                            <h3 className="font-medium text-sky-800 mb-3">
                                Wound / Skin Assessment Overview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name of Assessment *"
                                    className="border rounded-md p-2"
                                />
                                <select className="border rounded-md p-2">
                                    <option>Wound Classification *</option>
                                    <option>Pressure Injury</option>
                                    <option>Diabetic Ulcer</option>
                                </select>
                                <input type="date" className="border rounded-md p-2" />
                                <input
                                    type="date"
                                    className="border rounded-md p-2"
                                    placeholder="Date Wound First Identified"
                                />
                                <input
                                    type="text"
                                    className="border rounded-md p-2"
                                    placeholder="Location of Wound"
                                />
                                <input
                                    type="text"
                                    className="border rounded-md p-2"
                                    placeholder="Cause"
                                />
                            </div>
                        </div>

                        {/* Wound / Skin Description */}
                        <div className="bg-[#e8f7ff] rounded-md p-4 border border-sky-100">
                            <h3 className="font-medium text-sky-800 mb-3">
                                Wound / Skin Description
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                <input placeholder="Appearance" className="border p-2 rounded-md" />
                                <input placeholder="Exudate" className="border p-2 rounded-md" />
                                <input placeholder="Discharge" className="border p-2 rounded-md" />
                                <input placeholder="Odour" className="border p-2 rounded-md" />
                                <input placeholder="Grade" className="border p-2 rounded-md" />
                                <textarea
                                    placeholder="Wound Description"
                                    className="col-span-6 border p-2 rounded-md"
                                ></textarea>
                            </div>
                        </div>

                        {/* Infection Status / Pain Score */}
                        <div className="bg-[#e5f6ff] rounded-md p-4 border border-sky-200">
                            <h3 className="font-medium text-sky-800 mb-3">
                                Infection Status / Pain Score / Wound Measurements
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                                <select className="border rounded-md p-2">
                                    <option>Infection Status</option>
                                    <option>Infected</option>
                                    <option>Clean</option>
                                </select>
                                <select className="border rounded-md p-2">
                                    <option>Pain Score</option>
                                    <option>1 - Mild</option>
                                    <option>5 - Moderate</option>
                                    <option>10 - Severe</option>
                                </select>
                                <input placeholder="Wound Length (cm)" className="border p-2 rounded-md" />
                                <input placeholder="Wound Width (cm)" className="border p-2 rounded-md" />
                                <input placeholder="Wound Depth (cm)" className="border p-2 rounded-md" />
                                <input
                                    placeholder="Wound Surface Area (cm²)"
                                    className="border p-2 rounded-md"
                                />
                            </div>
                        </div>

                        {/* Dressing, Cleaning and Treatment */}
                        <div className="bg-[#e8f7ff] rounded-md p-4 border border-sky-100">
                            <h3 className="font-medium text-sky-800 mb-3">
                                Dressing, Cleaning and Treatment
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    placeholder="Type of Dressing Applied"
                                    className="border p-2 rounded-md"
                                />
                                <input
                                    placeholder="Cleaning Solution"
                                    className="border p-2 rounded-md"
                                />
                                <input
                                    placeholder="Management Plan / Treatment"
                                    className="border p-2 rounded-md"
                                />
                            </div>
                        </div>

                        {/* Photographs / Files */}
                        <div className="bg-[#e5f6ff] rounded-md p-4 border border-sky-200">
                            <h3 className="font-medium text-sky-800 mb-3">Photographs / Files</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="file" className="border p-2 rounded-md" />
                                <input type="date" className="border p-2 rounded-md" placeholder="Review Date" />
                            </div>
                        </div>

                        {/* Additional Comments */}
                        <div className="bg-[#e8f7ff] rounded-md p-4 border border-sky-100">
                            <h3 className="font-medium text-sky-800 mb-3">Additional Comments</h3>
                            <textarea
                                placeholder="Enter any comments..."
                                className="w-full border rounded-md p-2 h-24"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-gray-700">
                                <input type="checkbox" />
                                Mark Wound as Healed
                            </label>
                            <Button className="bg-green-600 hover:bg-green-700">
                                Save Skin Assessment
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
