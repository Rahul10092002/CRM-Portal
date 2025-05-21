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
import { getProjects } from "../../services/projectService";
import { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal";

const Projects = () => {
 const [projects, setProjects] = useState([]);
 const[isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  useEffect(() => {
    // Fetch projects from API or perform any other side effects here
    getProjects().then((response) => {
      setProjects(response.data);
    
    }
    ).catch((error) => {
      console.error("Error fetching projects:", error);
    });
  }, []);


  useEffect(() => {
    if (searchTerm) {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
    }, [searchTerm, projects]);
  
  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Completed: "primary",
      "On Hold": "warning",
      Cancelled: "danger",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Location",
      "Type",
      "Available",
      "Booked",
      "Sold",
      "Units",
      "RERA",
    ];
    const rows = projects.map((p) => [
      p.name,
      p.location,
      p.type,
      p.available,
      p.booked,
      p.sold,
      p.unit,
      p.reraId,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.csv";
    a.click();
  };

  const refresh = () => {
    getProjects().then((response) => {
      setProjects(response.data);
    }).catch((error) => {
      console.error("Error fetching projects:", error);
    });
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <div className="mt-3 sm:mt-0">
          <Button
            onClick={() => {
              setIsAddProjectModalOpen(true);
            }}
            icon={Plus}
          >
            Add New Project
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Projects</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
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
            <Button
              variant="outline"
              icon={Download}
              size="md"
              onClick={exportToCSV}
            >
              Export
            </Button>
            <Button
              onClick={refresh}
              variant="outline"
              icon={RefreshCw}
              size="md"
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src={project.image}
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
                          <span>{project.unit} Units</span>
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
      {isAddProjectModalOpen && (
        <AddProjectModal
          isOpen={isAddProjectModalOpen}
          onClose={() => setIsAddProjectModalOpen(false)}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default Projects;
