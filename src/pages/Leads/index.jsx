import { useEffect, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import AddLeadModal from "./AddLeadModal";
import ResponsiveTable from "../../components/ui/ResponsiveTable";
import { getLeads, deleteLead } from "../../services/leadService";
import EditLeadModal from "./EditLeadModal";
import { toast } from "react-toastify";

const Leads = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const openAddLeadModal = () => {
    setSelectedLead(null);
    setIsAddModalOpen(true);
  };

  const openEditLeadModal = (lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedLead(null);
    getLeads()
      .then((response) => {
        setLeads(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLead(null);
    getLeads()
      .then((response) => {
        setLeads(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  };

  const fetchLeads = () => {
    getLeads()
      .then((response) => {
        setLeads(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  };

  const handleDeleteLead = (id) => {
    setLeadToDelete(id);
    setIsConfirmModalOpen(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteLead(leadToDelete);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    } finally {
      setIsConfirmModalOpen(false);
      setLeadToDelete(null);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredLeads(leads);
    } else {
      const filtered = leads.filter((lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLeads(filtered);
    }
  }, [searchTerm, leads]);

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

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Phone,Email,Source,Project,Executive,Status,Date"]
        .concat(
          leads.map((l) =>
            [
              l.name,
              l.phone,
              l.email,
              l.source,
              l.project,
              l.executive,
              l.status,
              new Date(l.date).toLocaleDateString(),
            ].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>
            <Button
              variant="outline"
              icon={Filter}
              size="md"
              onClick={() => toast("Filter functionality coming soon")}
            >
              Filter
            </Button>
            <Button
              variant="outline"
              icon={Download}
              size="md"
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              variant="outline"
              icon={RefreshCw}
              size="md"
              onClick={fetchLeads}
            >
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
            data={filteredLeads}
            renderRow={(lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">{lead.name}</td>
                <td className="px-4 py-4">
                  <div>{lead.phone}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                <td className="px-4 py-4">{lead.source}</td>
                <td className="px-4 py-4">{lead.project}</td>
                <td className="px-4 py-4">{lead.executive}</td>
                <td className="px-4 py-4">{getStatusBadge(lead.status)}</td>
                <td className="px-4 py-4">
                  {new Date(lead.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditLeadModal(lead)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            renderMobileCard={(lead) => (
              <div
                key={lead.id}
                className="bg-white border p-4 rounded-md shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {lead.name}
                    </div>
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </div>
                  {getStatusBadge(lead.status)}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <div>Project: {lead.project}</div>
                  <div>Source: {lead.source}</div>
                  <div>Executive: {lead.executive}</div>
                  <div>Date: {new Date(lead.date).toLocaleDateString()}</div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditLeadModal(lead)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Pencil size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteLead(lead.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            )}
          />

          {/* Pagination Placeholder */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {filteredLeads.length} result(s)
            </div>
            {/* Future pagination controls can go here */}
          </div>
        </CardContent>
      </Card>

      {isAddModalOpen && (
        <AddLeadModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          lead={selectedLead}
        />
      )}
      {isEditModalOpen && (
        <EditLeadModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          lead={selectedLead}
        />
      )}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this lead?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
