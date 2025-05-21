import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { createLead } from "../../services/leadService";
import { getProjects } from "../../services/projectService";
import { getUsers } from "../../services/userService";

const AddLeadModal = ({ isOpen, onClose, lead = null }) => {
  const isEditing = !!lead;
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    source: lead?.source || "Website",
    project: lead?.project || "",
    status: lead?.status || "New",
    executive: lead?.executive || "",
    notes: lead?.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createLead(formData).then(() => {
    }).catch((error) => {
      console.error("Error creating lead:", error);
    });
    onClose();
  };

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Lead" : "Add New Lead"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { id: "name", label: "Name *", type: "text", required: true },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone *", type: "tel", required: true },
          ].map(({ id, label, type, required }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                name={id}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                required={required}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
              />
            </div>
          ))}

          {[
            {
              id: "source",
              label: "Source",
              options: [
                "Website",
                "Facebook",
                "Instagram",
                "Google",
                "Referral",
                "Other",
              ].map((status) => ({
                id: status,
                name: status,
              })),
            },
            {
              id: "project",
              label: "Project",
              options: projects.map((project) => ({
                id: project.id,
                name: project.name,
              })),
            },
            {
              id: "status",
              label: "Status",
              options: [
                "New",
                "Contacted",
                "Site Visit",
                "Negotiation",
                "Won",
                "Lost",
              ].map((status) => ({
                id: status,
                name: status,
              })),
            },
            {
              id: "executive",
              label: "Executive",
              options: users.map((user) => ({
                id: user.id,
                name: user.name,
              })),
            },
          ].map(({ id, label, options }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                {label}
              </label>
              <select
                name={id}
                id={id}
                value={formData[id] || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt.id} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-150"
            placeholder="Additional comments..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm shadow-sm transition"
          >
            {isEditing ? "Update Lead" : "Add Lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddLeadModal;
