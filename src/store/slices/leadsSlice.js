import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Example async thunk for fetching leads
export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (_, { rejectWithValue }) => {
  try {
    // This would be a real API call in a production app
    // const response = await axios.get('/api/leads');
    // return response.data;

    // For demo purposes, we'll return mock data
    return mockLeads
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// Mock data
const mockLeads = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    source: "Website",
    status: "New",
    date: "2023-05-18",
    project: "Parkview Residences",
    executive: "Alex Johnson",
  },
  // More mock data would be here
]

const initialState = {
  leads: [],
  loading: false,
  error: null,
  selectedLead: null,
}

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    selectLead: (state, action) => {
      state.selectedLead = action.payload
    },
    clearSelectedLead: (state) => {
      state.selectedLead = null
    },
    addLead: (state, action) => {
      state.leads.push(action.payload)
    },
    updateLead: (state, action) => {
      const index = state.leads.findIndex((lead) => lead.id === action.payload.id)
      if (index !== -1) {
        state.leads[index] = action.payload
      }
    },
    deleteLead: (state, action) => {
      state.leads = state.leads.filter((lead) => lead.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false
        state.leads = action.payload
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { selectLead, clearSelectedLead, addLead, updateLead, deleteLead } = leadsSlice.actions

export default leadsSlice.reducer
