"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash,
  MapPin,
  Calendar,
  Home,
  Clock,
  User,
  Download,
  Upload,
  Plus,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock project data - in a real app, would come from Redux store
  const project = {
    id: Number.parseInt(id),
    name: "Parkview Residences",
    description:
      "Luxury residential apartments in Downtown with stunning park views. Features include premium finishes, rooftop garden, fitness center, and 24/7 security.",
    location: "Downtown, Metro City",
    type: "Residential",
    units: 120,
    available: 45,
    booked: 35,
    sold: 40,
    reraId: "RERA12345",
    completionDate: "2024-06-30",
    launchDate: "2022-04-15",
    status: "Active",
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Clubhouse",
      "Rooftop Garden",
      "Children's Play Area",
      "24/7 Security",
      "Covered Parking",
      "Visitor Parking",
    ],
    floorPlans: [
      {
        type: "1 BHK",
        size: "650-750 sq ft",
        startingPrice: "$250,000",
        available: 15,
      },
      {
        type: "2 BHK",
        size: "950-1100 sq ft",
        startingPrice: "$380,000",
        available: 20,
      },
      {
        type: "3 BHK",
        size: "1350-1500 sq ft",
        startingPrice: "$520,000",
        available: 10,
      },
    ],
  };

  // Mock units data
  const units = [
    {
      id: 1,
      unitNo: "A-101",
      type: "1 BHK",
      floor: 1,
      block: "A",
      size: "680 sq ft",
      price: "$255,000",
      status: "Available",
      facing: "Park",
    },
    {
      id: 2,
      unitNo: "A-102",
      type: "2 BHK",
      floor: 1,
      block: "A",
      size: "980 sq ft",
      price: "$385,000",
      status: "Booked",
      facing: "Street",
    },
    {
      id: 3,
      unitNo: "A-201",
      type: "2 BHK",
      floor: 2,
      block: "A",
      size: "1000 sq ft",
      price: "$390,000",
      status: "Available",
      facing: "Park",
    },
    {
      id: 4,
      unitNo: "A-202",
      type: "3 BHK",
      floor: 2,
      block: "A",
      size: "1400 sq ft",
      price: "$530,000",
      status: "Sold",
      facing: "Street",
    },
    {
      id: 5,
      unitNo: "B-101",
      type: "1 BHK",
      floor: 1,
      block: "B",
      size: "700 sq ft",
      price: "$260,000",
      status: "Available",
      facing: "Garden",
    },
  ];

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: "Floor Plan.pdf",
      type: "Floor Plan",
      size: "2.4 MB",
      uploadedOn: "2022-04-20",
      uploadedBy: "Admin",
    },
    {
      id: 2,
      name: "RERA Certificate.pdf",
      type: "Legal",
      size: "1.1 MB",
      uploadedOn: "2022-04-15",
      uploadedBy: "Admin",
    },
    {
      id: 3,
      name: "Site Photos.zip",
      type: "Photos",
      size: "15.8 MB",
      uploadedOn: "2022-05-10",
      uploadedBy: "Alex Johnson",
    },
    {
      id: 4,
      name: "Brochure.pdf",
      type: "Marketing",
      size: "4.2 MB",
      uploadedOn: "2022-05-15",
      uploadedBy: "Marketing Team",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      "Under Construction": "warning",
      Completed: "primary",
      "On Hold": "warning",
      Available: "success",
      Booked: "warning",
      Sold: "primary",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/projects" className="mr-4">
            <Button variant="outline" size="sm" icon={ArrowLeft}>
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          {getStatusBadge(project.status)}
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" icon={Trash}>
            Delete
          </Button>
          <Button size="sm" icon={Edit}>
            Edit Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="h-64 bg-gray-200 relative">
              <img
                src={`/placeholder.svg?height=256&width=800&text=${project.name}`}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-6 border-b border-gray-200">
              <div className="flex space-x-6 overflow-x-auto">
                <button
                  className={`py-3 border-b-2 font-medium text-sm ${
                    activeTab === "overview"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`py-3 border-b-2 font-medium text-sm ${
                    activeTab === "units"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("units")}
                >
                  Units
                </button>
                <button
                  className={`py-3 border-b-2 font-medium text-sm ${
                    activeTab === "documents"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("documents")}
                >
                  Documents
                </button>
                <button
                  className={`py-3 border-b-2 font-medium text-sm ${
                    activeTab === "leads"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("leads")}
                >
                  Leads
                </button>
              </div>
            </div>

            <CardContent className="pt-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-700">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">
                        Project Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <MapPin
                            size={16}
                            className="text-gray-400 mt-0.5 mr-2"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.location}
                            </div>
                            <div className="text-xs text-gray-500">
                              Location
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <Home
                            size={16}
                            className="text-gray-400 mt-0.5 mr-2"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.type}
                            </div>
                            <div className="text-xs text-gray-500">Type</div>
                          </div>
                        </div>
                        <div className="flex">
                          <FileText
                            size={16}
                            className="text-gray-400 mt-0.5 mr-2"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.reraId}
                            </div>
                            <div className="text-xs text-gray-500">RERA ID</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">
                        Timeline
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <Calendar
                            size={16}
                            className="text-gray-400 mt-0.5 mr-2"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.launchDate}
                            </div>
                            <div className="text-xs text-gray-500">
                              Launch Date
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <Clock
                            size={16}
                            className="text-gray-400 mt-0.5 mr-2"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.completionDate}
                            </div>
                            <div className="text-xs text-gray-500">
                              Expected Completion
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {project.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-50 rounded-md p-2"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-700">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      Floor Plans
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {project.floorPlans.map((plan, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <h4 className="font-medium text-gray-900">
                              {plan.type}
                            </h4>
                            <div className="mt-2 space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Size:</span>
                                <span className="text-gray-900">
                                  {plan.size}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Price:</span>
                                <span className="text-gray-900">
                                  {plan.startingPrice}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Available:
                                </span>
                                <span className="text-gray-900">
                                  {plan.available} units
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-3"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "units" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      Units Inventory
                    </h3>
                    <Button icon={Plus} size="sm">
                      Add Unit
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Unit No
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Floor/Block
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Size
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Facing
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {units.map((unit) => (
                          <tr key={unit.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {unit.unitNo}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unit.type}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                Floor {unit.floor}, Block {unit.block}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unit.size}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unit.price}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(unit.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {unit.facing}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {units.length === 0 && (
                    <div className="text-center py-12">
                      <Home size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        No units added yet
                      </h3>
                      <p className="text-sm text-gray-500">
                        Add units to manage inventory
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      Project Documents
                    </h3>
                    <Button variant="outline" size="sm" icon={Upload}>
                      Upload Document
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Document
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Size
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Uploaded On
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Uploaded By
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map((document) => (
                          <tr key={document.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FileText
                                  size={20}
                                  className="text-gray-400 mr-3"
                                />
                                <div className="text-sm font-medium text-gray-900">
                                  {document.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {document.type}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {document.size}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {document.uploadedOn}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {document.uploadedBy}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-800 flex items-center">
                                <Download size={16} className="mr-1" />
                                <span>Download</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "leads" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      Project Leads
                    </h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Contact
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Executive
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Created
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3].map((item) => (
                          <tr key={item} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-600 font-medium">
                                    J
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    John Smith
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                +1 (555) 123-4567
                              </div>
                              <div className="text-sm text-gray-500">
                                john.smith@example.com
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(
                                item === 1
                                  ? "New"
                                  : item === 2
                                  ? "Contacted"
                                  : "Site Visit"
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                Alex Johnson
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              May 18, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/leads/${item}`}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <ExternalLink size={16} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-md">
                  <div className="text-xl font-semibold text-blue-700">
                    {project.units}
                  </div>
                  <div className="text-xs text-gray-500">Total Units</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-md">
                  <div className="text-xl font-semibold text-green-700">
                    {project.available}
                  </div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-md">
                  <div className="text-xl font-semibold text-yellow-700">
                    {project.booked}
                  </div>
                  <div className="text-xs text-gray-500">Booked</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-md">
                  <div className="text-xl font-semibold text-purple-700">
                    {project.sold}
                  </div>
                  <div className="text-xs text-gray-500">Sold</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-medium text-gray-500 mb-2">
                  Sales Progress
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        ((project.sold + project.booked) / project.units) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-right text-gray-500">
                  {Math.round(
                    ((project.sold + project.booked) / project.units) * 100
                  )}
                  % Sold/Booked
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start"
                  icon={User}
                  variant="outline"
                >
                  Add New Lead
                </Button>
                <Button
                  className="w-full justify-start"
                  icon={Home}
                  variant="outline"
                >
                  Add Unit
                </Button>
                <Button
                  className="w-full justify-start"
                  icon={Upload}
                  variant="outline"
                >
                  Upload Document
                </Button>
                <Button
                  className="w-full justify-start"
                  icon={Calendar}
                  variant="outline"
                >
                  Schedule Site Visit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {item === 1
                          ? "Alex Johnson"
                          : item === 2
                          ? "Sarah Lee"
                          : "Michael Chen"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item === 1
                          ? "Project Manager"
                          : item === 2
                          ? "Sales Executive"
                          : "Marketing Lead"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
