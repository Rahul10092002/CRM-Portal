import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example async thunk for fetching site visits
export const fetchSiteVisits = createAsyncThunk(
  "siteVisits/fetchSiteVisits",
  async (_, { rejectWithValue }) => {
    try {
      // This would be a real API call in a production app
      // const response = await axios.get('/api/site-visits');
      // return response.data;

      // For demo purposes, we'll return mock data
      return mockSiteVisits;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Mock data
const mockSiteVisits = [
  {
    id: 1,
    leadName: "John Smith",
    leadId: 1,
    project: "Parkview Residences",
    projectId: 1,
    date: "2023-05-22",
    time: "11:00 AM",
    status: "Scheduled",
    executive: "Alex Johnson",
    executiveId: 1,
    notes: "Client interested in 3 BHK units with park view",
    contactNumber: "+1 (555) 123-4567",
  },
  {
    id: 2,
    leadName: "Sarah Johnson",
    leadId: 2,
    project: "Riverside Apartments",
    projectId: 2,
    date: "2023-05-20",
    time: "3:30 PM",
    status: "Completed",
    executive: "Michael Chen",
    executiveId: 2,
    notes: "Liked the 2 BHK model. Will follow up on pricing.",
    contactNumber: "+1 (555) 987-6543",
  },
  {
    id: 3,
    leadName: "Michael Brown",
    leadId: 3,
    project: "Parkview Residences",
    projectId: 1,
    date: "2023-05-25",
    time: "10:00 AM",
    status: "Scheduled",
    executive: "Alex Johnson",
    executiveId: 1,
    notes: "Looking for premium amenities. Show rooftop garden.",
    contactNumber: "+1 (555) 456-7890",
  },
  {
    id: 4,
    leadName: "Emily Davis",
    leadId: 4,
    project: "Skyline Towers",
    projectId: 3,
    date: "2023-05-18",
    time: "2:00 PM",
    status: "Cancelled",
    executive: "Jessica Lee",
    executiveId: 3,
    notes: "Rescheduling needed due to personal emergency.",
    contactNumber: "+1 (555) 789-0123",
  },
  {
    id: 5,
    leadName: "Robert Wilson",
    leadId: 5,
    project: "Riverside Apartments",
    projectId: 2,
    date: "2023-05-21",
    time: "11:30 AM",
    status: "Completed",
    executive: "Michael Chen",
    executiveId: 2,
    notes: "Very interested in corner units. Provided brochure.",
    contactNumber: "+1 (555) 234-5678",
  },
];

const initialState = {
  siteVisits: [],
  loading: false,
  error: null,
  selectedSiteVisit: null,
};

const siteVisitsSlice = createSlice({
  name: "siteVisits",
  initialState,
  reducers: {
    selectSiteVisit: (state, action) => {
      state.selectedSiteVisit = action.payload;
    },
    clearSelectedSiteVisit: (state) => {
      state.selectedSiteVisit = null;
    },
    addSiteVisit: (state, action) => {
      state.siteVisits.push(action.payload);
    },
    updateSiteVisit: (state, action) => {
      const index = state.siteVisits.findIndex(
        (visit) => visit.id === action.payload.id
      );
      if (index !== -1) {
        state.siteVisits[index] = action.payload;
      }
    },
    deleteSiteVisit: (state, action) => {
      state.siteVisits = state.siteVisits.filter(
        (visit) => visit.id !== action.payload
      );
    },
    completeSiteVisit: (state, action) => {
      const index = state.siteVisits.findIndex(
        (visit) => visit.id === action.payload
      );
      if (index !== -1) {
        state.siteVisits[index].status = "Completed";
      }
    },
    cancelSiteVisit: (state, action) => {
      const index = state.siteVisits.findIndex(
        (visit) => visit.id === action.payload
      );
      if (index !== -1) {
        state.siteVisits[index].status = "Cancelled";
      }
    },
    rescheduleSiteVisit: (state, action) => {
      const { id, date, time } = action.payload;
      const index = state.siteVisits.findIndex((visit) => visit.id === id);
      if (index !== -1) {
        state.siteVisits[index].date = date;
        state.siteVisits[index].time = time;
        state.siteVisits[index].status = "Rescheduled";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteVisits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteVisits.fulfilled, (state, action) => {
        state.loading = false;
        state.siteVisits = action.payload;
      })
      .addCase(fetchSiteVisits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectSiteVisit,
  clearSelectedSiteVisit,
  addSiteVisit,
  updateSiteVisit,
  deleteSiteVisit,
  completeSiteVisit,
  cancelSiteVisit,
  rescheduleSiteVisit,
} = siteVisitsSlice.actions;

export default siteVisitsSlice.reducer;
