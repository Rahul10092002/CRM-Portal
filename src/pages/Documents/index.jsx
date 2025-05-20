import { useState } from "react";
import {
  Filter,
  Search,
  Download,
  RefreshCw,
  FileText,
  File,
  Upload,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import ResponsiveTable from "../../components/ui/ResponsiveTable";

const Documents = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: "Parkview Floor Plan.pdf",
      type: "Floor Plan",
      project: "Parkview Residences",
      size: "2.4 MB",
      uploadedBy: "Alex Johnson",
      uploadedOn: "2023-05-15",
      status: "Verified",
      lead: null,
    },
    {
      id: 2,
      name: "Riverside Brochure.pdf",
      type: "Brochure",
      project: "Riverside Apartments",
      size: "4.7 MB",
      uploadedBy: "Michael Chen",
      uploadedOn: "2023-05-14",
      status: "Verified",
      lead: null,
    },
    {
      id: 3,
      name: "John Smith ID.jpg",
      type: "Identity Document",
      project: null,
      size: "1.2 MB",
      uploadedBy: "Alex Johnson",
      uploadedOn: "2023-05-12",
      status: "Verified",
      lead: "John Smith",
    },
    {
      id: 4,
      name: "Sarah Johnson Bank Statement.pdf",
      type: "Financial",
      project: null,
      size: "3.5 MB",
      uploadedBy: "Jessica Lee",
      uploadedOn: "2023-05-10",
      status: "Pending",
      lead: "Sarah Johnson",
    },
    {
      id: 5,
      name: "Skyline Towers Construction Update.docx",
      type: "Report",
      project: "Skyline Towers",
      size: "1.8 MB",
      uploadedBy: "David Martinez",
      uploadedOn: "2023-05-08",
      status: "Verified",
      lead: null,
    },
    {
      id: 6,
      name: "Michael Brown Contract.pdf",
      type: "Legal",
      project: "Parkview Residences",
      size: "2.2 MB",
      uploadedBy: "Alex Johnson",
      uploadedOn: "2023-05-05",
      status: "Pending",
      lead: "Michael Brown",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Verified: "success",
      Pending: "warning",
      Rejected: "danger",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getDocumentTypeIcon = (type) => {
    switch (type) {
      case "Floor Plan":
      case "Brochure":
      case "Report":
      case "Legal":
      case "Financial":
        return <FileText size={20} className="text-blue-500" />;
      case "Identity Document":
        return <File size={20} className="text-green-500" />;
      default:
        return <File size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Document Management
        </h1>
        <div className="mt-3 sm:mt-0">
          <Button icon={Upload} onClick={() => setIsUploadModalOpen(true)}>
            Upload Document
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Documents</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
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
              { header: "Document" },
              { header: "Type" },
              { header: "Associated With" },
              { header: "Size" },
              { header: "Uploaded By" },
              { header: "Uploaded On" },
              { header: "Status" },
              { header: "Actions" },
            ]}
            data={documents}
            renderRow={(document, index) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-normal">
                  <div className="flex items-center">
                    {getDocumentTypeIcon(document.type)}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                        {document.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{document.type}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">
                    {document.project
                      ? `Project: ${document.project}`
                      : document.lead
                      ? `Lead: ${document.lead}`
                      : "-"}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{document.size}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">
                    {document.uploadedBy}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm text-gray-500">
                  {document.uploadedOn}
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  {getStatusBadge(document.status)}
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={16} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            renderMobileCard={(document, index) => (
              <div
                key={document.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {getDocumentTypeIcon(document.type)}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {document.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {document.type}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(document.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Associated:</span>
                    <span className="ml-1 text-gray-900">
                      {document.project
                        ? `Project: ${document.project}`
                        : document.lead
                        ? `Lead: ${document.lead}`
                        : "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="ml-1 text-gray-900">{document.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Uploaded By:</span>
                    <span className="ml-1 text-gray-900">
                      {document.uploadedBy}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Uploaded On:</span>
                    <span className="ml-1 text-gray-900">
                      {document.uploadedOn}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={16} />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            )}
          />

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{documents.length}</span> of{" "}
              <span className="font-medium">{documents.length}</span> documents
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
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Documents by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Floor Plan",
                "Brochure",
                "Identity Document",
                "Financial",
                "Legal",
                "Report",
              ].map((type) => {
                const count = documents.filter(
                  (doc) => doc.type === type
                ).length;
                return (
                  <div key={type} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">{type}</span>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents
                .sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn))
                .slice(0, 5)
                .map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                  >
                    {getDocumentTypeIcon(document.type)}
                    <div className="ml-3">
                      <div className="text-sm font-medium truncate max-w-[150px]">
                        {document.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {document.uploadedOn}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full bg-green-500"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 40}% 0%, ${
                      50 + 50
                    }% ${50 - 50 * Math.sin(Math.PI * 0.66)}%, ${50 + 30}% ${
                      50 + 30
                    }%)`,
                  }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-yellow-500"
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 30}% ${
                      50 + 30
                    }%, 0% 100%, 0% ${50 + 40}%)`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{documents.length}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Verified</div>
                  <div className="text-gray-500">
                    {
                      documents.filter((doc) => doc.status === "Verified")
                        .length
                    }{" "}
                    docs
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Pending</div>
                  <div className="text-gray-500">
                    {documents.filter((doc) => doc.status === "Pending").length}{" "}
                    docs
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Document Modal would go here */}
    </div>
  );
};

export default Documents;
