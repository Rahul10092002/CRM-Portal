import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example async thunk for fetching documents
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (_, { rejectWithValue }) => {
    try {
      // This would be a real API call in a production app
      // const response = await axios.get('/api/documents');
      // return response.data;

      // For demo purposes, we'll return mock data
      return mockDocuments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Mock data
const mockDocuments = [
  {
    id: 1,
    name: "Parkview Floor Plan.pdf",
    type: "Floor Plan",
    project: "Parkview Residences",
    size: "2.4 MB",
    uploadedBy: "Alex Johnson",
    uploadedOn: "2023-05-15",
    status: "Verified",
    lead: null,
  },
  {
    id: 2,
    name: "Riverside Brochure.pdf",
    type: "Brochure",
    project: "Riverside Apartments",
    size: "4.7 MB",
    uploadedBy: "Michael Chen",
    uploadedOn: "2023-05-14",
    status: "Verified",
    lead: null,
  },
  {
    id: 3,
    name: "John Smith ID.jpg",
    type: "Identity Document",
    project: null,
    size: "1.2 MB",
    uploadedBy: "Alex Johnson",
    uploadedOn: "2023-05-12",
    status: "Verified",
    lead: "John Smith",
  },
  {
    id: 4,
    name: "Sarah Johnson Bank Statement.pdf",
    type: "Financial",
    project: null,
    size: "3.5 MB",
    uploadedBy: "Jessica Lee",
    uploadedOn: "2023-05-10",
    status: "Pending",
    lead: "Sarah Johnson",
  },
  {
    id: 5,
    name: "Skyline Towers Construction Update.docx",
    type: "Report",
    project: "Skyline Towers",
    size: "1.8 MB",
    uploadedBy: "David Martinez",
    uploadedOn: "2023-05-08",
    status: "Verified",
    lead: null,
  },
  {
    id: 6,
    name: "Michael Brown Contract.pdf",
    type: "Legal",
    project: "Parkview Residences",
    size: "2.2 MB",
    uploadedBy: "Alex Johnson",
    uploadedOn: "2023-05-05",
    status: "Pending",
    lead: "Michael Brown",
  },
];

const initialState = {
  documents: [],
  loading: false,
  error: null,
  selectedDocument: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    selectDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    clearSelectedDocument: (state) => {
      state.selectedDocument = null;
    },
    addDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    updateDocument: (state, action) => {
      const index = state.documents.findIndex(
        (document) => document.id === action.payload.id
      );
      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(
        (document) => document.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectDocument,
  clearSelectedDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} = documentsSlice.actions;

export default documentsSlice.reducer;
