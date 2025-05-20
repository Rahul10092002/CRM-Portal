import { useState } from "react";
import {
  Plus,
  Filter,
  Search,
  RefreshCw,
  Calendar,
  MapPin,
  Clock,
  User,
  Check,
  X,
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
import ResponsiveTable from "../../components/ui/ResponsiveTable";

const SiteVisits = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Mock site visits data
  const visits = [
    {
      id: 1,
      leadName: "John Smith",
      project: "Parkview Residences",
      date: "2023-05-22",
      time: "11:00 AM",
      status: "Scheduled",
      executive: "Alex Johnson",
      notes: "Client interested in 3 BHK units with park view",
      contactNumber: "+1 (555) 123-4567",
    },
    {
      id: 2,
      leadName: "Sarah Johnson",
      project: "Riverside Apartments",
      date: "2023-05-20",
      time: "3:30 PM",
      status: "Completed",
      executive: "Michael Chen",
      notes: "Liked the 2 BHK model. Will follow up on pricing.",
      contactNumber: "+1 (555) 987-6543",
    },
    {
      id: 3,
      leadName: "Michael Brown",
      project: "Parkview Residences",
      date: "2023-05-25",
      time: "10:00 AM",
      status: "Scheduled",
      executive: "Alex Johnson",
      notes: "Looking for premium amenities. Show rooftop garden.",
      contactNumber: "+1 (555) 456-7890",
    },
    {
      id: 4,
      leadName: "Emily Davis",
      project: "Skyline Towers",
      date: "2023-05-18",
      time: "2:00 PM",
      status: "Cancelled",
      executive: "Jessica Lee",
      notes: "Rescheduling needed due to personal emergency.",
      contactNumber: "+1 (555) 789-0123",
    },
    {
      id: 5,
      leadName: "Robert Wilson",
      project: "Riverside Apartments",
      date: "2023-05-21",
      time: "11:30 AM",
      status: "Completed",
      executive: "Michael Chen",
      notes: "Very interested in corner units. Provided brochure.",
      contactNumber: "+1 (555) 234-5678",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Scheduled: "primary",
      Completed: "success",
      Cancelled: "danger",
      Rescheduled: "warning",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Site Visit Management
        </h1>
        <div className="mt-3 sm:mt-0">
          <Button icon={Plus} onClick={() => setIsScheduleModalOpen(true)}>
            Schedule Visit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Site Visits</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search visits..."
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
            <Button variant="outline" icon={RefreshCw} size="md">
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            columns={[
              { header: "Lead" },
              { header: "Project" },
              { header: "Date & Time" },
              { header: "Executive" },
              { header: "Status" },
              { header: "Notes" },
              { header: "Actions" },
            ]}
            data={visits}
            renderRow={(visit, index) => (
              <tr key={visit.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-normal">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {visit.leadName.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {visit.leadName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {visit.contactNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{visit.project}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar size={14} className="mr-1" />
                      <span>{new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1" />
                      <span>{visit.time}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{visit.executive}</div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  {getStatusBadge(visit.status)}
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div
                    className="text-sm text-gray-900 max-w-[200px] truncate"
                    title={visit.notes}
                  >
                    {visit.notes}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm font-medium">
                  <div className="flex space-x-2">
                    {visit.status === "Scheduled" && (
                      <>
                        <button className="text-green-600 hover:text-green-800">
                          <Check size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <X size={16} />
                        </button>
                      </>
                    )}
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            renderMobileCard={(visit, index) => (
              <div
                key={visit.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {visit.leadName.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {visit.leadName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {visit.contactNumber}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(visit.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Project:</span>
                    <span className="ml-1 text-gray-900">{visit.project}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Executive:</span>
                    <span className="ml-1 text-gray-900">
                      {visit.executive}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-1 text-gray-900">
                      {new Date(visit.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Time:</span>
                    <span className="ml-1 text-gray-900">{visit.time}</span>
                  </div>
                </div>

                <div className="text-xs mb-3">
                  <span className="text-gray-500">Notes:</span>
                  <p className="mt-1 text-gray-900">{visit.notes}</p>
                </div>

                <div className="flex justify-end space-x-2">
                  {visit.status === "Scheduled" && (
                    <>
                      <button className="text-green-600 hover:text-green-800">
                        <Check size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <X size={16} />
                      </button>
                    </>
                  )}
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
              <span className="font-medium">{visits.length}</span> of{" "}
              <span className="font-medium">{visits.length}</span> visits
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
            <CardTitle>Upcoming Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visits
                .filter((visit) => visit.status === "Scheduled")
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((visit) => (
                  <div
                    key={visit.id}
                    className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">
                        {visit.leadName}
                      </div>
                      {getStatusBadge(visit.status)}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{visit.project}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{new Date(visit.date).toLocaleDateString()}</span>
                      <Clock size={14} className="ml-3 mr-1" />
                      <span>{visit.time}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <User size={14} className="mr-1" />
                      <span>{visit.executive}</span>
                    </div>
                  </div>
                ))}

              {visits.filter((visit) => visit.status === "Scheduled").length ===
                0 && (
                <div className="text-center py-8">
                  <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">
                    No upcoming visits scheduled
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visit Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-md">
                <div className="text-xl font-semibold text-blue-700">
                  {
                    visits.filter((visit) => visit.status === "Scheduled")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-500">Scheduled</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-md">
                <div className="text-xl font-semibold text-green-700">
                  {
                    visits.filter((visit) => visit.status === "Completed")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-md">
                <div className="text-xl font-semibold text-yellow-700">
                  {
                    visits.filter((visit) => visit.status === "Rescheduled")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-500">Rescheduled</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-md">
                <div className="text-xl font-semibold text-red-700">
                  {
                    visits.filter((visit) => visit.status === "Cancelled")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-500">Cancelled</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-medium text-gray-500 mb-2">
                Completion Rate
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (visits.filter((visit) => visit.status === "Completed")
                        .length /
                        visits.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-right text-gray-500">
                {Math.round(
                  (visits.filter((visit) => visit.status === "Completed")
                    .length /
                    visits.length) *
                    100
                )}
                % Complete
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visits by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(visits.map((visit) => visit.project))).map(
                (project) => {
                  const count = visits.filter(
                    (visit) => visit.project === project
                  ).length;
                  return (
                    <div key={project} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">{project}</div>
                        <div className="text-sm">{count} visits</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(count / visits.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Visit Modal would go here */}
    </div>
  );
};

export default SiteVisits;
