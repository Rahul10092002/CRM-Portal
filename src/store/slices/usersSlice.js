import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // This would be a real API call in a production app
      // const response = await axios.get('/api/users');
      // return response.data;

      // For demo purposes, we'll return mock data
      return mockUsers;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    status: "Active",
    projects: ["Parkview Residences", "Riverside Apartments"],
    assignedLeads: 24,
    lastActive: "2023-05-18T10:30:00",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 987-6543",
    role: "Sales Executive",
    status: "Active",
    projects: ["Riverside Apartments", "Skyline Towers"],
    assignedLeads: 18,
    lastActive: "2023-05-18T09:15:00",
  },
  {
    id: 3,
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    phone: "+1 (555) 456-7890",
    role: "Sales Executive",
    status: "Active",
    projects: ["Parkview Residences", "Skyline Towers"],
    assignedLeads: 15,
    lastActive: "2023-05-17T16:45:00",
  },
  {
    id: 4,
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "+1 (555) 234-5678",
    role: "Manager",
    status: "Active",
    projects: ["All Projects"],
    assignedLeads: 8,
    lastActive: "2023-05-18T11:20:00",
  },
  {
    id: 5,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 876-5432",
    role: "Sales Executive",
    status: "Inactive",
    projects: ["Parkview Residences"],
    assignedLeads: 0,
    lastActive: "2023-04-30T15:10:00",
  },
];

const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectUser,
  clearSelectedUser,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;
