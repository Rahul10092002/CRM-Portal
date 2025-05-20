import React, { useState } from "react";
import { createProject } from "../../services/projectService";
import { toast } from "react-toastify";

export default function AddProjectModal({ onClose,refresh }) {
  const [project, setProject] = useState({
    name: "",
    image: "",
    description: "",
    location: "",
    type: "",
    unit: 0,
    available: 0,
    booked: 0,
    sold: 0,
    reraId: "",
    completionDate: "",
    launchDate: "",
    status: "Active",
    amenities: [],
    floorPlans: [],
    units: [],
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, key, value) => {
    const newArr = [...project[field]];
    newArr[index][key] = value;
    setProject((prev) => ({ ...prev, [field]: newArr }));
  };

  const addFloorPlan = () => {
    setProject((prev) => ({
      ...prev,
      floorPlans: [
        ...prev.floorPlans,
        { type: "", size: "", startingPrice: "", available: 0 },
      ],
    }));
  };

  const addUnit = () => {
    setProject((prev) => ({
      ...prev,
      units: [
        ...prev.units,
        {
          unitNo: "",
          type: "",
          floor: "",
          block: "",
          size: "",
          price: "",
          status: "",
          facing: "",
        },
      ],
    }));
  };

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    setProject((prev) => ({
      ...prev,
      amenities: value.split(",").map((a) => a.trim()),
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const docs = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      uploadedOn: new Date().toISOString().split("T")[0],
      uploadedBy: "Admin",
    }));
    setProject((prev) => ({
      ...prev,
      documents: [...prev.documents, ...docs],
    }));
  };

  const handleSubmit = () => {
    createProject(project)
      .then(() => {
          toast.success("Project created successfully!");
          onClose();
            refresh();
      })
      .catch((error) => {
        console.error("Error creating project:", error);
        toast.error("Failed to create project. Please try again.");
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 backdrop-blur-sm p-6 transition-all">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-300/30 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl transition"
          >
            ✖
          </button>
        </div>

        {/* General Info */}
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          General Information
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {["name", "image", "location", "type", "reraId"].map((field) =>
            field === "type" ? (
              <select
                key={field}
                name={field}
                value={project[field]}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Mixed Use">Mixed Use</option>
                {/* Add more options as needed */}
              </select>
            ) : (
              <input
                key={field}
                name={field}
                value={project[field]}
                onChange={handleChange}
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")
                }
                className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )
          )}

          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="col-span-2 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Dates */}
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Project Dates
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="date"
            name="launchDate"
            value={project.launchDate}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="date"
            name="completionDate"
            value={project.completionDate}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Unit Counts */}
        <h3 className="text-lg font-medium text-gray-700 mb-2">Unit Summary</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {["unit", "available", "booked", "sold"].map((field) => (
            <input
              key={field}
              name={field}
              type="number"
              value={project[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Amenities */}
        <h3 className="text-lg font-medium text-gray-700 mb-2">Amenities</h3>
        <input
          value={project.amenities.join(", ")}
          onChange={handleAmenityChange}
          placeholder="Amenities (comma-separated)"
          className="w-full mb-6 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Floor Plans */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-700">Floor Plans</h3>
            <button
              onClick={addFloorPlan}
              className="text-blue-600 hover:underline text-sm"
            >
              + Add Floor Plan
            </button>
          </div>
          {project.floorPlans.map((fp, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 mb-2">
              {["type", "size", "startingPrice"].map((key) => (
                <input
                  key={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  value={fp[key]}
                  onChange={(e) =>
                    handleArrayChange("floorPlans", i, key, e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ))}
              <input
                type="number"
                placeholder="Available"
                value={fp.available}
                onChange={(e) =>
                  handleArrayChange(
                    "floorPlans",
                    i,
                    "available",
                    e.target.value
                  )
                }
                className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Units */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-700">Units</h3>
            <button
              onClick={addUnit}
              className="text-blue-600 hover:underline text-sm"
            >
              + Add Unit
            </button>
          </div>
          {project.units.map((unit, i) => (
            <div key={i} className="grid grid-cols-7 gap-2 mb-2">
              {[
                "unitNo",
                "type",
                "floor",
                "block",
                "size",
                "price",
                "facing",
              ].map((key) => (
                <input
                  key={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  value={unit[key]}
                  onChange={(e) =>
                    handleArrayChange("units", i, key, e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ))}
            </div>
          ))}
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Upload Documents
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
