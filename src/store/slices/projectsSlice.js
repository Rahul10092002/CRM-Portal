import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Example async thunk for fetching projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    // This would be a real API call in a production app
    // const response = await axios.get('/api/projects');
    // return response.data;

    // For demo purposes, we'll return mock data
    return mockProjects
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// Mock data
const mockProjects = [
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
  // More mock data would be here
]

const initialState = {
  projects: [],
  loading: false,
  error: null,
  selectedProject: null,
}

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null
    },
    addProject: (state, action) => {
      state.projects.push(action.payload)
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((project) => project.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = action.payload
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { selectProject, clearSelectedProject, addProject, updateProject, deleteProject } = projectsSlice.actions

export default projectsSlice.reducer
