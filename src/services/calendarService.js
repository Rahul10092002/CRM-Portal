import { mockSiteVisits } from "./mockData";
import { simulateDelay, createResponse } from "./api";

// Get all calendar events
export const getCalendarEvents = async (startDate, endDate) => {
  await simulateDelay();

  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date(start);
  end.setMonth(end.getMonth() + 1); // Default to 1 month range if no end date

  // Convert site visits to calendar events
  const siteVisitEvents = mockSiteVisits
    .filter((visit) => {
      const visitDate = new Date(visit.scheduledAt);
      return visitDate >= start && visitDate <= end;
    })
    .map((visit) => ({
      id: visit.id,
      title: `Site Visit: ${visit.leadName}`,
      start: visit.scheduledAt,
      end: new Date(
        new Date(visit.scheduledAt).getTime() + 60 * 60 * 1000
      ).toISOString(), // 1 hour duration
      type: "site-visit",
      color: "#4CAF50",
      relatedId: visit.leadId,
    }));

  // Add follow-up events from leads
  const followUpEvents = [];

  // Return combined events
  return createResponse([...siteVisitEvents, ...followUpEvents]);
};

// Create a calendar event
export const createCalendarEvent = async (eventData) => {
  await simulateDelay();

  // This is a mock function - in a real app, this would create an event
  // in the appropriate service (e.g., site visit, follow-up, etc.)

  return createResponse({
    id: Math.random().toString(36).substr(2, 9),
    ...eventData,
    created: true,
  });
};

// Update a calendar event
export const updateCalendarEvent = async (id, eventData) => {
  await simulateDelay();

  // This is a mock function - in a real app, this would update the event
  // in the appropriate service based on the event type

  return createResponse({
    id,
    ...eventData,
    updated: true,
  });
};

// Delete a calendar event
export const deleteCalendarEvent = async (id, type) => {
  await simulateDelay();

  // This is a mock function - in a real app, this would delete the event
  // from the appropriate service based on the event type

  return createResponse({
    id,
    deleted: true,
  });
};
