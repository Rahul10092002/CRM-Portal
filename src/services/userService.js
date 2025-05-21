import { simulateLatency } from "./api";
import { mockUsers } from "./mockData";

// In-memory store for mock data
let users = mockUsers;
let nextUserId = users.length + 1;

// Helper function to find user by ID
const findUserById = (id) => {
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }
  return user;
};

// Get all users with optional filtering
export const getUsers = async (filters = {}) => {
  await simulateLatency();

  let filteredUsers = [...users];

  // Apply filters if provided
  if (filters.status) {
    filteredUsers = filteredUsers.filter(
      (user) => user.status === filters.status
    );
  }

  if (filters.role) {
    filteredUsers = filteredUsers.filter((user) => user.role === filters.role);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm)
    );
  }

  // Sort users if needed
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortOrder = filters.sortOrder === "desc" ? -1 : 1;

    filteredUsers.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }

  // Remove password field from response
  const sanitizedUsers = filteredUsers.map(({ password, ...user }) => user);

  return {
    success: true,
    data: sanitizedUsers,
  };
};

// Get user by ID
export const getUserById = async (id) => {
  await simulateLatency();

  try {
    const user = findUserById(id);
    // Remove password field from response
    const { password, ...sanitizedUser } = user;

    return {
      success: true,
      data: sanitizedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Create new user
export const createUser = async (userData) => {
  await simulateLatency();

  // Check if email already exists
  const existingUser = users.find((user) => user.email === userData.email);
  if (existingUser) {
    return {
      success: false,
      message: "Email already in use",
    };
  }

  const newUser = {
    id: nextUserId++,
    status: "Active",
    assignedLeads: 0,
    lastActive: new Date().toISOString(),
    ...userData,
  };

  users.push(newUser);

  // Remove password field from response
  const { password, ...sanitizedUser } = newUser;

  return {
    success: true,
    data: sanitizedUser,
    message: "User created successfully",
  };
};

// Update user
export const updateUser = async (id, userData) => {
  await simulateLatency();

  try {
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Check if email is being changed and already exists
    if (userData.email && userData.email !== users[userIndex].email) {
      const existingUser = users.find((user) => user.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: "Email already in use",
        };
      }
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
    };

    // Remove password field from response
    const { password, ...sanitizedUser } = users[userIndex];

    return {
      success: true,
      data: sanitizedUser,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Delete user
export const deleteUser = async (id) => {
  await simulateLatency();

  try {
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Remove user
    users.splice(userIndex, 1);

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Update user status
export const updateUserStatus = async (id, status) => {
  await simulateLatency();

  try {
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Update user status
    users[userIndex] = {
      ...users[userIndex],
      status,
    };

    // Remove password field from response
    const { password, ...sanitizedUser } = users[userIndex];

    return {
      success: true,
      data: sanitizedUser,
      message: "User status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Assign role to user
export const assignRole = async (id, role) => {
  await simulateLatency();

  try {
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Update user role
    users[userIndex] = {
      ...users[userIndex],
      role,
    };

    // Remove password field from response
    const { password, ...sanitizedUser } = users[userIndex];

    return {
      success: true,
      data: sanitizedUser,
      message: "User role updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Assign projects to user
export const assignProjects = async (id, projects) => {
  await simulateLatency();

  try {
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Update user projects
    users[userIndex] = {
      ...users[userIndex],
      projects,
    };

    // Remove password field from response
    const { password, ...sanitizedUser } = users[userIndex];

    return {
      success: true,
      data: sanitizedUser,
      message: "User projects updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Login user
export const loginUser = async (email, password) => {
  await simulateLatency();

  const user = users.find((user) => user.email === email);

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // In a real app, you would hash and compare passwords
  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  // Update last active
  const userIndex = users.findIndex((u) => u.id === user.id);
  users[userIndex].lastActive = new Date().toISOString();

  // Remove password field from response
  const { password: _, ...sanitizedUser } = user;

  return {
    success: true,
    data: {
      user: sanitizedUser,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
    },
    message: "Login successful",
  };
};
