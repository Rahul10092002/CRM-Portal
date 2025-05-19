import { ExternalLink } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { Link } from "react-router-dom";
import ResponsiveTable from "../../components/ui/ResponsiveTable";

const RecentLeadsTable = () => {
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

    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <ResponsiveTable
      columns={[
        { header: "Name" },
        { header: "Source" },
        { header: "Project" },
        { header: "Status" },
        { header: "Date" },
        { header: "Actions" },
      ]}
      data={leads}
      renderRow={(lead) => (
        <tr key={lead.id} className="hover:bg-gray-50">
          <td className="px-4 py-3 whitespace-normal">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
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
          </td>
          <td className="px-4 py-3 whitespace-normal">
            <div className="text-sm text-gray-900">{lead.source}</div>
          </td>
          <td className="px-4 py-3 whitespace-normal">
            <div className="text-sm text-gray-900">{lead.project}</div>
          </td>
          <td className="px-4 py-3 whitespace-normal">
            {getStatusBadge(lead.status)}
          </td>
          <td className="px-4 py-3 whitespace-normal text-sm text-gray-500">
            {new Date(lead.date).toLocaleDateString()}
          </td>
          <td className="px-4 py-3 whitespace-normal text-right text-sm font-medium">
            <Link
              to={`/leads/${lead.id}`}
              className="text-blue-600 hover:text-blue-900"
            >
              <ExternalLink size={16} />
            </Link>
          </td>
        </tr>
      )}
      renderMobileCard={(lead) => (
        <div
          key={lead.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-2"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {lead.name.charAt(0)}
                </span>
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-900">
                  {lead.name}
                </div>
              </div>
            </div>
            {getStatusBadge(lead.status)}
          </div>

          <div className="grid grid-cols-2 gap-1 text-xs mb-2">
            <div>
              <span className="text-gray-500">Source:</span>
              <span className="ml-1 text-gray-900">{lead.source}</span>
            </div>
            <div>
              <span className="text-gray-500">Project:</span>
              <span className="ml-1 text-gray-900">{lead.project}</span>
            </div>
            <div>
              <span className="text-gray-500">Date:</span>
              <span className="ml-1 text-gray-900">
                {new Date(lead.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to={`/leads/${lead.id}`}
              className="text-blue-600 hover:text-blue-900"
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      )}
    />
  );
};

export default RecentLeadsTable;
