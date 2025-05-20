import { mockSiteVisits } from "./mockData";
import { simulateDelay, generateId, createResponse } from "./api";

// In-memory store
let siteVisits = [...mockSiteVisits];

// Get all site visits
export const getAllSiteVisits = async () => {
  await simulateDelay();
  return createResponse(siteVisits);
};

// Get site visits by lead ID
export const getSiteVisitsByLeadId = async (leadId) => {
  await simulateDelay();
  const filteredVisits = siteVisits.filter((visit) => visit.leadId === leadId);
  return createResponse(filteredVisits);
};

// Get site visit by ID
export const getSiteVisitById = async (id) => {
  await simulateDelay();
  const siteVisit = siteVisits.find((visit) => visit.id === id);

  if (!siteVisit) {
    return createResponse(null, false, "Site visit not found");
  }

  return createResponse(siteVisit);
};

// Create a new site visit
export const createSiteVisit = async (siteVisitData) => {
  await simulateDelay();

  const newSiteVisit = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: "scheduled",
    ...siteVisitData,
  };

  siteVisits.push(newSiteVisit);
  return createResponse(newSiteVisit);
};

// Update a site visit
export const updateSiteVisit = async (id, siteVisitData) => {
  await simulateDelay();

  const index = siteVisits.findIndex((visit) => visit.id === id);

  if (index === -1) {
    return createResponse(null, false, "Site visit not found");
  }

  const updatedSiteVisit = {
    ...siteVisits[index],
    ...siteVisitData,
    updatedAt: new Date().toISOString(),
  };

  siteVisits[index] = updatedSiteVisit;
  return createResponse(updatedSiteVisit);
};

// Delete a site visit
export const deleteSiteVisit = async (id) => {
  await simulateDelay();

  const initialLength = siteVisits.length;
  siteVisits = siteVisits.filter((visit) => visit.id !== id);

  if (siteVisits.length === initialLength) {
    return createResponse(null, false, "Site visit not found");
  }

  return createResponse({ id }, true, "Site visit deleted successfully");
};

// Update site visit status
export const updateSiteVisitStatus = async (id, status) => {
  await simulateDelay();

  const index = siteVisits.findIndex((visit) => visit.id === id);

  if (index === -1) {
    return createResponse(null, false, "Site visit not found");
  }

  siteVisits[index].status = status;
  siteVisits[index].updatedAt = new Date().toISOString();

  return createResponse(siteVisits[index]);
};

// Get upcoming site visits (for calendar)
export const getUpcomingSiteVisits = async (startDate, endDate) => {
  await simulateDelay();

  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date(start);
  end.setMonth(end.getMonth() + 1); // Default to 1 month range if no end date

  const upcomingVisits = siteVisits.filter((visit) => {
    const visitDate = new Date(visit.scheduledAt);
    return visitDate >= start && visitDate <= end;
  });

  return createResponse(upcomingVisits);
};
