import { documents } from "./mockData";
import { simulateDelay, USE_MOCK_API } from "./api";
import api from "./api";

// Helper function to generate a new ID
const generateId = () => {
  return Math.max(...documents.map((document) => document.id), 0) + 1;
};

// Mock implementation of document service
const mockDocumentService = {
  // Get all documents with optional filtering
  getDocuments: async (filters = {}) => {
    await simulateDelay();

    let filteredDocuments = [...documents];

    // Apply filters if provided
    if (filters.type) {
      filteredDocuments = filteredDocuments.filter(
        (document) => document.type === filters.type
      );
    }

    if (filters.projectId) {
      filteredDocuments = filteredDocuments.filter(
        (document) => document.projectId === Number.parseInt(filters.projectId)
      );
    }

    if (filters.uploadedBy) {
      filteredDocuments = filteredDocuments.filter(
        (document) =>
          document.uploadedBy === Number.parseInt(filters.uploadedBy)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredDocuments = filteredDocuments.filter((document) =>
        filters.tags.some((tag) => document.tags.includes(tag))
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredDocuments = filteredDocuments.filter((document) =>
        document.name.toLowerCase().includes(searchTerm)
      );
    }

    return {
      success: true,
      data: filteredDocuments,
      message: "Documents retrieved successfully",
    };
  },

  // Get a document by ID
  getDocumentById: async (id) => {
    await simulateDelay();

    const document = documents.find(
      (document) => document.id === Number.parseInt(id)
    );

    if (!document) {
      return {
        success: false,
        data: null,
        message: "Document not found",
      };
    }

    return {
      success: true,
      data: document,
      message: "Document retrieved successfully",
    };
  },

  // Create a new document (upload)
  uploadDocument: async (documentData) => {
    await simulateDelay(1500); // Longer delay to simulate file upload

    const newDocument = {
      id: generateId(),
      ...documentData,
      uploadedAt: new Date().toISOString(),
    };

    documents.push(newDocument);

    return {
      success: true,
      data: newDocument,
      message: "Document uploaded successfully",
    };
  },

  // Update document metadata
  updateDocument: async (id, documentData) => {
    await simulateDelay();

    const index = documents.findIndex(
      (document) => document.id === Number.parseInt(id)
    );

    if (index === -1) {
      return {
        success: false,
        data: null,
        message: "Document not found",
      };
    }

    const updatedDocument = {
      ...documents[index],
      ...documentData,
      id: Number.parseInt(id), // Ensure ID doesn't change
    };

    documents[index] = updatedDocument;

    return {
      success: true,
      data: updatedDocument,
      message: "Document updated successfully",
    };
  },

  // Delete a document
  deleteDocument: async (id) => {
    await simulateDelay();

    const index = documents.findIndex(
      (document) => document.id === Number.parseInt(id)
    );

    if (index === -1) {
      return {
        success: false,
        data: null,
        message: "Document not found",
      };
    }

    const deletedDocument = documents[index];
    documents.splice(index, 1);

    return {
      success: true,
      data: deletedDocument,
      message: "Document deleted successfully",
    };
  },

  // Get documents for a specific project
  getProjectDocuments: async (projectId) => {
    await simulateDelay();

    const projectDocuments = documents.filter(
      (document) => document.projectId === Number.parseInt(projectId)
    );

    return {
      success: true,
      data: projectDocuments,
      message: "Project documents retrieved successfully",
    };
  },

  // Add tags to a document
  addDocumentTags: async (id, tags) => {
    await simulateDelay();

    const index = documents.findIndex(
      (document) => document.id === Number.parseInt(id)
    );

    if (index === -1) {
      return {
        success: false,
        data: null,
        message: "Document not found",
      };
    }

    // Add new tags without duplicates
    const currentTags = documents[index].tags || [];
    const newTags = [...new Set([...currentTags, ...tags])];

    documents[index].tags = newTags;

    return {
      success: true,
      data: documents[index],
      message: "Document tags updated successfully",
    };
  },

  // Remove tags from a document
  removeDocumentTags: async (id, tags) => {
    await simulateDelay();

    const index = documents.findIndex(
      (document) => document.id === Number.parseInt(id)
    );

    if (index === -1) {
      return {
        success: false,
        data: null,
        message: "Document not found",
      };
    }

    // Remove specified tags
    const currentTags = documents[index].tags || [];
    const newTags = currentTags.filter((tag) => !tags.includes(tag));

    documents[index].tags = newTags;

    return {
      success: true,
      data: documents[index],
      message: "Document tags updated successfully",
    };
  },
};

// Real API implementation
const realDocumentService = {
  getDocuments: async (filters = {}) => {
    const response = await api.get("/documents", { params: filters });
    return response.data;
  },

  getDocumentById: async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  uploadDocument: async (documentData) => {
    // For file uploads, we need to use FormData
    const formData = new FormData();

    // Add file to form data
    if (documentData.file) {
      formData.append("file", documentData.file);
    }

    // Add other metadata
    Object.keys(documentData).forEach((key) => {
      if (key !== "file") {
        formData.append(key, documentData[key]);
      }
    });

    const response = await api.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateDocument: async (id, documentData) => {
    const response = await api.put(`/documents/${id}`, documentData);
    return response.data;
  },

  deleteDocument: async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },

  getProjectDocuments: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/documents`);
    return response.data;
  },

  addDocumentTags: async (id, tags) => {
    const response = await api.post(`/documents/${id}/tags`, { tags });
    return response.data;
  },

  removeDocumentTags: async (id, tags) => {
    const response = await api.delete(`/documents/${id}/tags`, {
      data: { tags },
    });
    return response.data;
  },
};

// Export the appropriate implementation based on the flag
const documentService = USE_MOCK_API
  ? mockDocumentService
  : realDocumentService;

export default documentService;
