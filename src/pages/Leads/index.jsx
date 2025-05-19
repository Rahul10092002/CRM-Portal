"use client";

import { useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import LeadModal from "./LeadModal";
import ResponsiveTable from "../../components/ui/ResponsiveTable";

const Leads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const openAddLeadModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const openEditLeadModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const leads = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      source: "Website",
      status: "New",
      date: "2023-05-18",
      project: "Parkview Residences",
      executive: "Alex Johnson",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      source: "Facebook",
      status: "Contacted",
      date: "2023-05-17",
      project: "Riverside Apartments",
      executive: "Michael Chen",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 456-7890",
      source: "Referral",
      status: "Site Visit",
      date: "2023-05-16",
      project: "Parkview Residences",
      executive: "Alex Johnson",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 789-0123",
      source: "Instagram",
      status: "Negotiation",
      date: "2023-05-15",
      project: "Skyline Towers",
      executive: "Jessica Lee",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.w@example.com",
      phone: "+1 (555) 234-5678",
      source: "Google",
      status: "Won",
      date: "2023-05-14",
      project: "Riverside Apartments",
      executive: "Michael Chen",
    },
    {
      id: 6,
      name: "Jennifer Taylor",
      email: "jennifer.t@example.com",
      phone: "+1 (555) 345-6789",
      source: "Website",
      status: "New",
      date: "2023-05-13",
      project: "Skyline Towers",
      executive: "Jessica Lee",
    },
    {
      id: 7,
      name: "David Martinez",
      email: "david.m@example.com",
      phone: "+1 (555) 456-7890",
      source: "Referral",
      status: "Contacted",
      date: "2023-05-12",
      project: "Parkview Residences",
      executive: "Alex Johnson",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      phone: "+1 (555) 567-8901",
      source: "Facebook",
      status: "Lost",
      date: "2023-05-11",
      project: "Riverside Apartments",
      executive: "Michael Chen",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      New: "primary",
      Contacted: "info",
      "Site Visit": "warning",
      Negotiation: "warning",
      Won: "success",
      Lost: "danger",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
        <div className="mt-3 sm:mt-0">
          <Button icon={Plus} onClick={openAddLeadModal}>
            Add New Lead
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Leads</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>
            <Button variant="outline" icon={Filter} size="md">
              Filter
            </Button>
            <Button variant="outline" icon={Download} size="md">
              Export
            </Button>
            <Button variant="outline" icon={RefreshCw} size="md">
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            columns={[
              { header: "Name" },
              { header: "Contact" },
              { header: "Source" },
              { header: "Project" },
              { header: "Executive" },
              { header: "Status" },
              { header: "Date" },
              { header: "Actions" },
            ]}
            data={leads}
            renderRow={(lead, index) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-normal">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {lead.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{lead.phone}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{lead.source}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{lead.project}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{lead.executive}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  {getStatusBadge(lead.status)}
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm text-gray-500">
                  {new Date(lead.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-normal text-right text-sm font-medium">
                  <div className="relative inline-block text-left">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            renderMobileCard={(lead, index) => (
              <div
                key={lead.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {lead.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name}
                      </div>
                      <div className="text-xs text-gray-500">{lead.phone}</div>
                    </div>
                  </div>
                  {getStatusBadge(lead.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Source:</span>
                    <span className="ml-1 text-gray-900">{lead.source}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Project:</span>
                    <span className="ml-1 text-gray-900">{lead.project}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Executive:</span>
                    <span className="ml-1 text-gray-900">{lead.executive}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-1 text-gray-900">
                      {new Date(lead.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreHorizontal size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          />

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">8</span> of{" "}
              <span className="font-medium">24</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-50 text-blue-600 border-blue-200"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <LeadModal
          isOpen={isModalOpen}
          onClose={closeModal}
          lead={selectedLead}
        />
      )}
    </div>
  );
};

export default Leads;
