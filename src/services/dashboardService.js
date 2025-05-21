import { simulateLatency } from "./api";
import { mockLeads, mockProjects, mockSiteVisits, mockUsers } from "./mockData";

// Get dashboard summary stats
const createResponse = (data) => ({
  status: 200,
  data,
  message: "Success",
});
export const getDashboardStats = async () => {
  await simulateLatency();
  const totalLeads = mockLeads.length;
  const newLeadsThisMonth = mockLeads.filter((lead) => {
    const createdDate = new Date(lead.createdAt);
    const now = new Date();
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(
    (project) => project.status === "Active"
  ).length;

  const pendingSiteVisits = mockSiteVisits.filter(
    (visit) => visit.status === "scheduled"
  ).length;

  const totalRevenue = mockProjects.reduce((sum, project) => {
    const projectRevenue = project.units.reduce((unitSum, unit) => {
      if (unit.status === "Sold" || unit.status === "Booked") {
        const numericPrice = Number(unit.price.replace(/[^0-9.-]+/g, ""));
        return unitSum + numericPrice;
      }
      return unitSum;
    }, 0);
    return sum + projectRevenue;
  }, 0);
  
  

  const stats = {
    totalLeads,
    newLeadsThisMonth,
    totalProjects,
    activeProjects,
    pendingSiteVisits,
    totalRevenue,
    totalUsers: mockUsers.length,
  };

  return createResponse(stats);
};

// Get leads by source data for chart
export const getLeadsBySource = async () => {
  await simulateLatency();

  // Count leads by source
  const sourceCount = {};
  mockLeads.forEach((lead) => {
    sourceCount[lead.source] = (sourceCount[lead.source] || 0) + 1;
  });

  // Format for chart
  const chartData = Object.keys(sourceCount).map((source) => ({
    source,
    count: sourceCount[source],
  }));

  return createResponse(chartData);
};

// Get leads by status data for chart
export const getLeadsByStatus = async () => {
  await simulateLatency();

  // Count leads by status
  const statusCount = {};
  mockLeads.forEach((lead) => {
    statusCount[lead.status] = (statusCount[lead.status] || 0) + 1;
  });

  // Format for chart
  const chartData = Object.keys(statusCount).map((status) => ({
    status,
    count: statusCount[status],
  }));

  return createResponse(chartData);
};

// Get revenue data for chart
export const getRevenueData = async () => {
  await simulateLatency();

  // Generate monthly revenue data for the past 12 months
  const months = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: month.toLocaleString("default", { month: "short" }),
      year: month.getFullYear(),
      revenue: Math.floor(Math.random() * 500000) + 100000, // Random revenue between 100k and 600k
    });
  }

  return createResponse(months);
};

// Get recent leads
export const getRecentLeads = async (limit = 5) => {
  await simulateLatency();

  // Sort leads by creation date (newest first) and take the specified limit
  const recentLeads = [...mockLeads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

  return createResponse(recentLeads);
};

// Get upcoming follow-ups
export const getUpcomingFollowUps = async (limit = 5) => {
  await simulateLatency();

  const now = new Date();

  // Filter leads with follow-up dates in the future
  const upcomingFollowUps = mockLeads
    .filter((lead) => lead.nextFollowUp && new Date(lead.nextFollowUp) > now)
    .sort((a, b) => new Date(a.nextFollowUp) - new Date(b.nextFollowUp))
    .slice(0, limit)
    .map((lead) => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      followUpDate: lead.nextFollowUp,
      assignedTo: lead.assignedTo,
    }));

  return createResponse(upcomingFollowUps);
};
