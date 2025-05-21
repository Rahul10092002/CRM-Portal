import { simulateLatency } from "./api";
import { mockProjects, mockUnits } from "./mockData";

// In-memory store for mock data
let projects = mockProjects;
let units = mockUnits;
let nextProjectId = projects.length + 1;
let nextUnitId = units.length + 1;

// Helper function to find project by ID
export const findProjectById = (id) => {
  const project = projects.find((project) => project.id === Number(id));
  if (!project) {
    throw new Error(`Project with ID ${id} not found`);
  }
  return project;
};

// Get all projects with optional filtering
export const getProjects = async (filters = {}) => {
  await simulateLatency();

  let filteredProjects = [...projects];

  // Apply filters if provided
  if (filters.status) {
    filteredProjects = filteredProjects.filter(
      (project) => project.status === filters.status
    );
  }

  if (filters.type) {
    filteredProjects = filteredProjects.filter(
      (project) => project.type === filters.type
    );
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.location.toLowerCase().includes(searchTerm)
    );
  }

  // Sort projects if needed
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortOrder = filters.sortOrder === "desc" ? -1 : 1;

    filteredProjects.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }

  // Pagination
  if (filters.page && filters.limit) {
    const page = parseInt(filters.page);
    const limit = parseInt(filters.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedProjects,
      pagination: {
        total: filteredProjects.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProjects.length / limit),
      },
    };
  }

  return {
    success: true,
    data: filteredProjects,
  };
};

// Get project by ID
export const getProjectById = async (id) => {
  await simulateLatency();

  try {
    const project = findProjectById(id);
    return {
      success: true,
      data: project,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Create new project
export const createProject = async (projectData) => {
  await simulateLatency();

  const newProject = {
    id: nextProjectId++,
    launchDate: new Date().toISOString().split("T")[0],
    available: projectData.units || 0,
    booked: 0,
    sold: 0,
    floorPlans: [],
    ...projectData,
  };

  projects.push(newProject);

  return {
    success: true,
    data: newProject,
    message: "Project created successfully",
  };
};

// Update project
export const updateProject = async (id, projectData) => {
  await simulateLatency();

  try {
    const projectIndex = projects.findIndex(
      (project) => project.id === Number(id)
    );
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // Update project data
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...projectData,
    };

    return {
      success: true,
      data: projects[projectIndex],
      message: "Project updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Delete project
export const deleteProject = async (id) => {
  await simulateLatency();

  try {
    const projectIndex = projects.findIndex(
      (project) => project.id === Number(id)
    );
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // Remove project
    projects.splice(projectIndex, 1);

    // Also remove related units
    units = units.filter((unit) => unit.projectId !== Number(id));

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Update project status
export const updateProjectStatus = async (id, status) => {
  await simulateLatency();

  try {
    const projectIndex = projects.findIndex(
      (project) => project.id === Number(id)
    );
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // Update project status
    projects[projectIndex] = {
      ...projects[projectIndex],
      status,
    };

    return {
      success: true,
      data: projects[projectIndex],
      message: "Project status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Get units by project ID
export const getUnitsByProjectId = async (projectId) => {
  await simulateLatency();

  const projectUnits = units.filter(
    (unit) => unit.projectId === Number(projectId)
  );

  return {
    success: true,
    data: projectUnits,
  };
};

// Get all units with optional filtering
export const getAllUnits = async (filters = {}) => {
  await simulateLatency();

  let filteredUnits = [...units];

  // Apply filters if provided
  if (filters.projectId) {
    filteredUnits = filteredUnits.filter(
      (unit) => unit.projectId === Number(filters.projectId)
    );
  }

  if (filters.status) {
    filteredUnits = filteredUnits.filter(
      (unit) => unit.status === filters.status
    );
  }

  if (filters.type) {
    filteredUnits = filteredUnits.filter((unit) => unit.type === filters.type);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredUnits = filteredUnits.filter((unit) =>
      unit.unitNo.toLowerCase().includes(searchTerm)
    );
  }

  // Sort units if needed
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortOrder = filters.sortOrder === "desc" ? -1 : 1;

    filteredUnits.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }

  return {
    success: true,
    data: filteredUnits,
  };
};

// Get unit by ID
export const getUnitById = async (id) => {
  await simulateLatency();

  const unit = units.find((unit) => unit.id === Number(id));

  if (!unit) {
    return {
      success: false,
      message: `Unit with ID ${id} not found`,
    };
  }

  return {
    success: true,
    data: unit,
  };
};

// Create new unit
export const createUnit = async (unitData) => {
  await simulateLatency();

  const newUnit = {
    id: nextUnitId++,
    ...unitData,
  };

  units.push(newUnit);

  // Update project available units count
  const projectIndex = projects.findIndex(
    (project) => project.id === Number(unitData.projectId)
  );
  if (projectIndex !== -1) {
    projects[projectIndex].available += 1;
    projects[projectIndex].units += 1;
  }

  return {
    success: true,
    data: newUnit,
    message: "Unit created successfully",
  };
};

// Update unit
export const updateUnit = async (id, unitData) => {
  await simulateLatency();

  const unitIndex = units.findIndex((unit) => unit.id === Number(id));

  if (unitIndex === -1) {
    return {
      success: false,
      message: `Unit with ID ${id} not found`,
    };
  }

  // Check if status is changing
  const oldStatus = units[unitIndex].status;
  const newStatus = unitData.status || oldStatus;

  // Update unit data
  units[unitIndex] = {
    ...units[unitIndex],
    ...unitData,
  };

  // Update project counts if status changed
  if (oldStatus !== newStatus) {
    const projectId = units[unitIndex].projectId;
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );

    if (projectIndex !== -1) {
      const project = projects[projectIndex];

      // Decrement old status count
      if (oldStatus === "Available") project.available -= 1;
      else if (oldStatus === "Booked") project.booked -= 1;
      else if (oldStatus === "Sold") project.sold -= 1;

      // Increment new status count
      if (newStatus === "Available") project.available += 1;
      else if (newStatus === "Booked") project.booked += 1;
      else if (newStatus === "Sold") project.sold += 1;
    }
  }

  return {
    success: true,
    data: units[unitIndex],
    message: "Unit updated successfully",
  };
};

// Delete unit
export const deleteUnit = async (id) => {
  await simulateLatency();

  const unitIndex = units.findIndex((unit) => unit.id === Number(id));

  if (unitIndex === -1) {
    return {
      success: false,
      message: `Unit with ID ${id} not found`,
    };
  }

  const unit = units[unitIndex];

  // Update project counts
  const projectIndex = projects.findIndex(
    (project) => project.id === unit.projectId
  );
  if (projectIndex !== -1) {
    const project = projects[projectIndex];

    if (unit.status === "Available") project.available -= 1;
    else if (unit.status === "Booked") project.booked -= 1;
    else if (unit.status === "Sold") project.sold -= 1;

    project.units -= 1;
  }

  // Remove unit
  units.splice(unitIndex, 1);

  return {
    success: true,
    message: "Unit deleted successfully",
  };
};

// Add floor plan to project
export const addFloorPlan = async (projectId, floorPlanData) => {
  await simulateLatency();

  try {
    const projectIndex = projects.findIndex(
      (project) => project.id === Number(projectId)
    );
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    const project = projects[projectIndex];

    // Create new floor plan
    const newFloorPlan = {
      id: project.floorPlans.length + 1,
      projectId: Number(projectId),
      ...floorPlanData,
    };

    // Add to project
    project.floorPlans.push(newFloorPlan);

    return {
      success: true,
      data: newFloorPlan,
      message: "Floor plan added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
