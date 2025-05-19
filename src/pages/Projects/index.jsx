import {
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  MapPin,
  Building,
  Home,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Parkview Residences",
      location: "Downtown, Metro City",
      type: "Residential",
      units: 120,
      available: 45,
      booked: 35,
      sold: 40,
      reraId: "RERA12345",
      completionDate: "2024-06-30",
      status: "Active",
    },
    {
      id: 2,
      name: "Riverside Apartments",
      location: "Riverside, Metro City",
      type: "Residential",
      units: 80,
      available: 20,
      booked: 25,
      sold: 35,
      reraId: "RERA67890",
      completionDate: "2023-12-15",
      status: "Active",
    },
    {
      id: 3,
      name: "Skyline Towers",
      location: "Business District, Metro City",
      type: "Commercial",
      units: 50,
      available: 15,
      booked: 10,
      sold: 25,
      reraId: "RERA54321",
      completionDate: "2024-03-20",
      status: "Active",
    },
    {
      id: 4,
      name: "Green Valley Villas",
      location: "Suburbs, Metro City",
      type: "Residential",
      units: 40,
      available: 0,
      booked: 0,
      sold: 40,
      reraId: "RERA09876",
      completionDate: "2022-08-10",
      status: "Completed",
    },
    {
      id: 5,
      name: "Metro Business Park",
      location: "Industrial Zone, Metro City",
      type: "Commercial",
      units: 30,
      available: 10,
      booked: 5,
      sold: 15,
      reraId: "RERA13579",
      completionDate: "2024-09-15",
      status: "Active",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Completed: "primary",
      "On Hold": "warning",
      Cancelled: "danger",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <div className="mt-3 sm:mt-0">
          <Button icon={Plus}>Add New Project</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Projects</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src={`/placeholder.svg?height=160&width=400&text=${project.name}`}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(project.status)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <MapPin size={16} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Building size={16} className="mr-1 flex-shrink-0" />
                        <span>{project.type}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-blue-50 rounded-md">
                          <div className="text-sm font-medium text-blue-700">
                            {project.available}
                          </div>
                          <div className="text-xs text-gray-500">Available</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded-md">
                          <div className="text-sm font-medium text-yellow-700">
                            {project.booked}
                          </div>
                          <div className="text-xs text-gray-500">Booked</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-md">
                          <div className="text-sm font-medium text-green-700">
                            {project.sold}
                          </div>
                          <div className="text-xs text-gray-500">Sold</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-gray-500 truncate max-w-[50%]">
                          RERA: {project.reraId}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Home size={14} className="mr-1 flex-shrink-0" />
                          <span>{project.units} Units</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
