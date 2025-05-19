import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  MapPin,
  Clock,
  ArrowLeft,
  Plus,
  Paperclip,
  Send,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const LeadDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock lead data - in a real app, this would come from Redux or an API call
  const lead = {
    id: parseInt(id),
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    source: "Website",
    status: "New",
    date: "2023-05-18",
    project: "Parkview Residences",
    executive: "Alex Johnson",
    address: "123 Main St, Metro City",
    budget: "$500,000 - $750,000",
    requirements: "3 BHK apartment with parking and gym access",
    notes:
      "Interested in Parkview Residences. Looking for a unit with a good view.",
    activities: [
      {
        id: 1,
        type: "Call",
        date: "2023-05-18",
        time: "10:30 AM",
        notes: "Initial contact. Discussed requirements and budget.",
        user: "Alex Johnson",
      },
      {
        id: 2,
        type: "Email",
        date: "2023-05-19",
        time: "2:15 PM",
        notes: "Sent brochure and pricing details for Parkview Residences.",
        user: "Alex Johnson",
      },
      {
        id: 3,
        type: "Site Visit",
        date: "2023-05-22",
        time: "11:00 AM",
        notes:
          "Showed 2 units at Parkview. Client liked the corner unit on 5th floor.",
        user: "Michael Chen",
      },
    ],
    documents: [
      {
        id: 1,
        name: "ID Proof.pdf",
        type: "Identity",
        date: "2023-05-19",
        status: "Verified",
      },
      {
        id: 2,
        name: "Income Statement.pdf",
        type: "Financial",
        date: "2023-05-20",
        status: "Pending",
      },
    ],
  };

  const getStatusBadge = (status) => {
    const variants = {
      New: "primary",
      Contacted: "info",
      "Site Visit": "warning",
      Negotiation: "warning",
      Won: "success",
      Lost: "danger",
      Verified: "success",
      Pending: "warning",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Link to="/leads" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <Button variant="outline" size="sm" icon={Calendar}>
            Schedule Follow-up
          </Button>
          <Button variant="outline" size="sm" icon={MapPin}>
            Schedule Site Visit
          </Button>
          <Button size="sm" icon={Phone}>
            Call Lead
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-semibold mr-4">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {lead.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    {getStatusBadge(lead.status)}
                    <span className="ml-2 text-sm text-gray-500">
                      Added on {new Date(lead.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{lead.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{lead.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-900">{lead.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Executive
                    </p>
                    <p className="text-sm text-gray-900">{lead.executive}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Lead Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Source</span>
                    <span className="text-sm text-gray-900">{lead.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Project</span>
                    <span className="text-sm text-gray-900">
                      {lead.project}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Budget</span>
                    <span className="text-sm text-gray-900">{lead.budget}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Requirements
                </h3>
                <p className="text-sm text-gray-700">{lead.requirements}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b border-gray-200">
              <div className="flex space-x-6">
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === "overview"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === "activity"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                </button>
                <button
                  className={`pb-4 text-sm font-medium ${
                    activeTab === "documents"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("documents")}
                >
                  Documents
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {activeTab === "overview" && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Notes
                    </h3>
                    <p className="text-gray-700">{lead.notes}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Recent Activity
                      </h3>
                      <Button variant="outline" size="sm" icon={Plus}>
                        Add Activity
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {lead.activities.slice(0, 2).map((activity) => (
                        <div
                          key={activity.id}
                          className="p-4 border border-gray-200 rounded-md"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge variant="primary" className="mr-2">
                                {activity.type}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                by {activity.user}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              <span>
                                {new Date(activity.date).toLocaleDateString()}
                              </span>
                              <Clock size={14} className="ml-3 mr-1" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-700">
                            {activity.notes}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Documents
                      </h3>
                      <Button variant="outline" size="sm" icon={Plus}>
                        Add Document
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {lead.documents.map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <div className="flex items-center">
                            <FileText
                              size={18}
                              className="text-gray-400 mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {document.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {document.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-3">
                              {new Date(document.date).toLocaleDateString()}
                            </span>
                            {getStatusBadge(document.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Activity Timeline
                    </h3>
                    <Button icon={Plus}>Add Activity</Button>
                  </div>

                  <div className="space-y-6">
                    {lead.activities.map((activity, index) => (
                      <div key={activity.id} className="relative">
                        {index < lead.activities.length - 1 && (
                          <div className="absolute top-6 left-3 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            {activity.type === "Call" && <Phone size={12} />}
                            {activity.type === "Email" && <Mail size={12} />}
                            {activity.type === "Site Visit" && (
                              <MapPin size={12} />
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="p-4 border border-gray-200 rounded-md">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Badge variant="primary" className="mr-2">
                                    {activity.type}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    by {activity.user}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar size={14} className="mr-1" />
                                  <span>
                                    {new Date(
                                      activity.date
                                    ).toLocaleDateString()}
                                  </span>
                                  <Clock size={14} className="ml-3 mr-1" />
                                  <span>{activity.time}</span>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-gray-700">
                                {activity.notes}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Add Follow-up
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="followup-type"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Type
                          </label>
                          <select
                            id="followup-type"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="Call">Call</option>
                            <option value="Email">Email</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Site Visit">Site Visit</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="followup-date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Date & Time
                          </label>
                          <input
                            type="datetime-local"
                            id="followup-date"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="followup-notes"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Notes
                        </label>
                        <textarea
                          id="followup-notes"
                          rows="3"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter notes for this follow-up..."
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <Button icon={Send}>Add Follow-up</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      Documents
                    </h3>
                    <Button icon={Plus}>Upload Document</Button>
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-md p-6 mb-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Paperclip size={36} className="text-gray-400 mb-2" />
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Drop files to upload
                      </h4>
                      <p className="text-xs text-gray-500 mb-3">
                        or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Uploaded Documents
                    </h4>
                    {lead.documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center">
                          <FileText size={20} className="text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {document.name}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500">
                                {document.type} • Uploaded on{" "}
                                {new Date(document.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(document.status)}
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
