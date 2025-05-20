import { simulateLatency} from "./api";
import { mockLeads, mockLeadActivities, mockUsers } from "./mockData";

// In-memory store for mock data
let leads = [...mockLeads];
let users = [...mockUsers];
let leadActivities = [...mockLeadActivities];
let nextLeadId = leads.length + 1;
let nextActivityId = leadActivities.length + 1;

// Helper function to find lead by ID
const findLeadById = (id) => {
  const lead = leads.find((lead) => lead.id === Number(id));
  if (!lead) {
    throw new Error(`Lead with ID ${id} not found`);
  }
  return lead;
};

// Get all leads with optional filtering
export const getLeads = async (filters = {}) => {
  await simulateLatency();

  let filteredLeads = [...leads];

  // Apply filters if provided
  if (filters.status) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.status === filters.status
    );
  }

  if (filters.source) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.source === filters.source
    );
  }

  if (filters.project) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.project === filters.project
    );
  }

  if (filters.executive) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.executive === filters.executive
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredLeads = filteredLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm) ||
        lead.phone.includes(searchTerm)
    );
  }

  // Sort leads if needed
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortOrder = filters.sortOrder === "desc" ? -1 : 1;

    filteredLeads.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  } else {
    // Default sort by date (newest first)
    filteredLeads.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Pagination
  if (filters.page && filters.limit) {
    const page = parseInt(filters.page);
    const limit = parseInt(filters.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedLeads,
      pagination: {
        total: filteredLeads.length,
        page,
        limit,
        totalPages: Math.ceil(filteredLeads.length / limit),
      },
    };
  }

  return {
    success: true,
    data: filteredLeads,
  };
};

// Get lead by ID
export const getLeadById = async (id) => {
  await simulateLatency();

  try {
    const lead = findLeadById(id);
    return {
      success: true,
      data: lead,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Create new lead
export const createLead = async (leadData) => {
  await simulateLatency();

  const newLead = {
    id: nextLeadId++,
    date: new Date().toISOString().split("T")[0],
    ...leadData,
  };

  leads.push(newLead);
  if (newLead.executive) {
    // Find executive user by name
    const executiveUser = users.find((user) => user.name === newLead.executive);
    if (executiveUser) {
      // Increment assignedLeads
      executiveUser.assignedLeads = (executiveUser.assignedLeads || 0) + 1;
      // Add project if not already present
      if (
        newLead.project &&
        Array.isArray(executiveUser.projects) &&
        !executiveUser.projects.includes(newLead.project)
      ) {
        executiveUser.projects.push(newLead.project);
      }
    }
  }
  return {
    success: true,
    data: newLead,
    message: "Lead created successfully",
  };
};

// Update lead
export const updateLead = async (id, leadData) => {
  await simulateLatency();

  try {
    const leadIndex = leads.findIndex((lead) => lead.id === Number(id));
    if (leadIndex === -1) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    // Update lead data
    leads[leadIndex] = {
      ...leads[leadIndex],
      ...leadData,
    };

    return {
      success: true,
      data: leads[leadIndex],
      message: "Lead updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Delete lead
export const deleteLead = async (id) => {
  await simulateLatency();

  try {
    const leadIndex = leads.findIndex((lead) => lead.id === Number(id));
    if (leadIndex === -1) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    // Remove lead
    leads.splice(leadIndex, 1);

    // Also remove related activities
    leadActivities = leadActivities.filter(
      (activity) => activity.leadId !== Number(id)
    );

    return {
      success: true,
      message: "Lead deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Assign lead to executive
export const assignLead = async (id, executiveId, executiveName) => {
  await simulateLatency();

  try {
    const leadIndex = leads.findIndex((lead) => lead.id === Number(id));
    if (leadIndex === -1) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    // Update lead executive
    leads[leadIndex] = {
      ...leads[leadIndex],
      executive: executiveName,
    };

    return {
      success: true,
      data: leads[leadIndex],
      message: "Lead assigned successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Update lead status
export const updateLeadStatus = async (id, status) => {
  await simulateLatency();

  try {
    const leadIndex = leads.findIndex((lead) => lead.id === Number(id));
    if (leadIndex === -1) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    // Update lead status
    leads[leadIndex] = {
      ...leads[leadIndex],
      status,
    };

    return {
      success: true,
      data: leads[leadIndex],
      message: "Lead status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get lead activities
export const getLeadActivities = async (leadId) => {
  await simulateLatency();

  const activities = leadActivities.filter(
    (activity) => activity.leadId === Number(leadId)
  );

  return {
    success: true,
    data: activities,
  };
};

// Add lead activity
export const addLeadActivity = async (activityData) => {
  await simulateLatency();

  const newActivity = {
    id: nextActivityId++,
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    ...activityData,
  };

  leadActivities.push(newActivity);

  return {
    success: true,
    data: newActivity,
    message: "Activity added successfully",
  };
};
