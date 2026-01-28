import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

const CustomerTravelDistanceSearch = () => {
  const [customer, setCustomer] = React.useState("");
  const customers = [
    "A Walker Thomas",
    "Abiodun Favour",
    "Abrahams Thomas",
    "Acton Eric",
    "Adams Susan",
  ];

  const handleChange = (event: any) => {
    setCustomer(event.target.value);
  };

  // Dummy data for table
  const rows = [
    {
      start: "London",
      finish: "Manchester",
      distanceKM: "335",
      distanceMiles: "208",
      manual: "No",
      view: "View Details",
    },
    {
      start: "Birmingham",
      finish: "Liverpool",
      distanceKM: "161",
      distanceMiles: "100",
      manual: "Yes",
      view: "View Details",
    },
    {
      start: "Leeds",
      finish: "Newcastle",
      distanceKM: "153",
      distanceMiles: "95",
      manual: "No",
      view: "View Details",
    },
    {
      start: "Cardiff",
      finish: "Bristol",
      distanceKM: "69",
      distanceMiles: "43",
      manual: "Yes",
      view: "View Details",
    },
  ];

  return (
    <Box className="p-6 bg-white shadow rounded-lg">
      {/* Header */}
      <Typography variant="h6" className="pb-5 font-semibold text-gray-700">
        Customer Travel Distance Search
      </Typography>

      {/* Search Section */}
      <Box className="flex flex-wrap items-center gap-4 mb-6">
        <FormControl size="small" className="w-[400px]">
          <InputLabel>Customer Search</InputLabel>
          <Select
            value={customer}
            label="Customer Search"
            onChange={handleChange}
          >
            {customers.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          className="normal-case px-5 bg-purple-700 hover:bg-purple-800"
        >
          Generate Report
        </Button>
      </Box>

      {/* Toolbar Buttons */}
      <Box className="flex flex-wrap gap-2 mb-5 text-sm">
        {[
          "Rows",
          "Copy",
          "Excel",
          "CSV",
          "PDF",
          "Print",
          "Area Search",
          "Column visibility",
          "Clear Search",
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

      {/* Table */}
      <Box className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Start",
                "Finish",
                "Distance (KM)",
                "Distance (Miles)",
                "Manual",
                "View",
              ].map((col) => (
                <th
                  key={col}
                  className="border border-gray-300 px-3 py-2 text-left text-gray-700 font-medium"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Search Inputs Row */}
            <tr>
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <td key={i} className="border border-gray-300 p-2">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Search"
                      sx={{ width: "140px" }}
                    />
                  </td>
                ))}
            </tr>

            {/* Dummy Data Rows */}
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">
                  {row.start}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {row.finish}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {row.distanceKM}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {row.distanceMiles}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {row.manual}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-purple-700 cursor-pointer hover:underline">
                  {row.view}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Pagination Footer */}
      <Box className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <Typography>
          Showing 1 to {rows.length} of {rows.length} entries
        </Typography>
        <Box className="flex gap-3">
          <Button variant="text" size="small" className="text-gray-600">
            Previous
          </Button>
          <Button variant="text" size="small" className="text-gray-600">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerTravelDistanceSearch;
