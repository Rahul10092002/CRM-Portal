import { ExternalLink } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { Link } from "react-router-dom";
import ResponsiveTable from "../../components/ui/ResponsiveTable";

const RecentLeadsTable = ({ leads }) => {
  
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
console.log("leads", leads);
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
