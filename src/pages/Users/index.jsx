import { useEffect, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  User,
  Mail,
  Phone,
  Shield,
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
import AddUserModal from "./AddUserModal";
import { deleteUser, getUsers } from "../../services/userService";
import { toast } from "react-toastify";
import DeleteUserModal from "./DeleteUserModal";

const Users = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  useEffect(() => {
    getUsers({
      search: searchTerm,
    }).then((res) => {
      setUsers(res.data);
    });
  }, [searchTerm]);

  const refreshUser = () => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Inactive: "danger",
      Pending: "warning",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getRoleBadge = (role) => {
    const variants = {
      Admin: "primary",
      Manager: "info",
      "Sales Executive": "warning",
    };

    return <Badge variant={variants[role] || "default"}>{role}</Badge>;
  };
  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Role", "Status"].join(","),
      ...users.map((user) =>
        [user.name, user.email, user.phone, user.role, user.status].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const handleDeleteUser = () => {
    // Call the delete user API here
    // Assuming deleteUser is a function that takes userId and deletes the user
    deleteUser(selectedUser.id).then((res) => {
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setIsDeleteUserModalOpen(false);
      refreshUser();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="mt-3 sm:mt-0">
          <Button icon={Plus} onClick={() => setIsAddUserModalOpen(true)}>
            Add New User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
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
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              variant="outline"
              onClick={refreshUser}
              icon={RefreshCw}
              size="md"
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveTable
            columns={[
              { header: "User" },
              { header: "Contact" },
              { header: "Role" },
              { header: "Status" },
              { header: "Projects" },
              { header: "Leads" },
              { header: "Last Active" },
              { header: "Actions" },
            ]}
            data={users}
            renderRow={(user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-normal">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User size={18} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail size={14} className="mr-1" />
                      <span className="truncate max-w-[150px]">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Phone size={14} className="mr-1" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-4 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">
                    {user.projects.length > 1
                      ? `${user.projects[0]} +${user.projects.length - 1}`
                      : user.projects[0]}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm text-gray-900">
                  {user.assignedLeads}
                </td>
                <td className="px-4 py-4 whitespace-normal text-sm text-gray-500">
                  {new Date(user.lastActive).toLocaleString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsAddUserModalOpen(true);
                    }}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteUserModalOpen(true);
                    }}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            )}
            renderMobileCard={(user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User size={18} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Mail size={12} className="mr-1" />
                        <span className="truncate max-w-[150px]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(user.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <span className="ml-1">{getRoleBadge(user.role)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Leads:</span>
                    <span className="ml-1 text-gray-900">
                      {user.assignedLeads}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Projects:</span>
                    <span className="ml-1 text-gray-900">
                      {user.projects.length > 1
                        ? `${user.projects[0]} +${user.projects.length - 1}`
                        : user.projects[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Active:</span>
                    <span className="ml-1 text-gray-900">
                      {new Date(user.lastActive).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsAddUserModalOpen(true);
                    }}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteUserModalOpen(true);
                    }}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            )}
          />

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{users.length}</span> of{" "}
              <span className="font-medium">{users.length}</span> users
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
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm font-medium">Admin</span>
                </div>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield size={16} className="text-indigo-600 mr-2" />
                  <span className="text-sm font-medium">Manager</span>
                </div>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield size={16} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium">Sales Executive</span>
                </div>
                <span className="text-sm font-medium">3</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Admin (20%)</span>
                <span>Manager (20%)</span>
                <span>Sales (60%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active vs. Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full bg-blue-500"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full bg-green-500"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{users.length}</div>
                    <div className="text-xs text-gray-500">Total Users</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Active</div>
                  <div className="text-gray-500">4 users</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <div className="text-sm">
                  <div className="font-medium">Inactive</div>
                  <div className="text-gray-500">1 user</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users
                .filter(
                  (user) =>
                    user.status === "Active" && user.role === "Sales Executive"
                )
                .sort((a, b) => b.assignedLeads - a.assignedLeads)
                .map((user) => (
                  <div key={user.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-sm">{user.assignedLeads} leads</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(user.assignedLeads / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full">
                Rebalance Lead Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add User Modal would go here */}
      {isAddUserModalOpen && (
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => {
            setIsAddUserModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          refresh={refreshUser}
        />
      )}
      {isDeleteUserModalOpen && (
        <DeleteUserModal
          onClose={() => setIsDeleteUserModalOpen(false)}
          confirmDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default Users;
