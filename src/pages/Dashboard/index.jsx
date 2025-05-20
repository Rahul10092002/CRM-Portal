import { useEffect, useState } from "react";
import {
  Users,
  Building,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatCard from "./StatCard";
import LeadsBySourceChart from "./LeadsBySourceChart";
import LeadsByStatusChart from "./LeadsByStatusChart";
import RevenueChart from "./RevenueChart";
import RecentLeadsTable from "./RecentLeadsTable";
import UpcomingFollowUps from "./UpcomingFollowUps";
import {
  getDashboardStats,
  getLeadsBySource,
  getLeadsByStatus,
  getRecentLeads,
  getRevenueData,
  getUpcomingFollowUps,
} from "../../services/dashboardService";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("month");

  const [stats, setStats] = useState(null);
  const [leadsBySource, setLeadsBySource] = useState([]);
  const [leadsByStatus, setLeadsByStatus] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        statsRes,
        sourceRes,
        statusRes,
        revenueRes,
        leadsRes,
        followUpRes,
      ] = await Promise.all([
        getDashboardStats(),
        getLeadsBySource(),
        getLeadsByStatus(),
        getRevenueData(),
        getRecentLeads(),
        getUpcomingFollowUps(),
      ]);

      setStats(statsRes.data);
      setLeadsBySource(sourceRes.data);
      setLeadsByStatus(statusRes.data);
      setRevenueData(revenueRes.data);
      setRecentLeads(leadsRes.data);
      setFollowUps(followUpRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <Button
            variant={timeframe === "week" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeframe("week")}
          >
            Week
          </Button>
          <Button
            variant={timeframe === "month" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeframe("month")}
          >
            Month
          </Button>
          <Button
            variant={timeframe === "quarter" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeframe("quarter")}
          >
            Quarter
          </Button>
          <Button
            variant={timeframe === "year" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTimeframe("year")}
          >
            Year
          </Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Leads"
            value={stats.totalLeads}
            change="+12.5%"
            trend="up"
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            change="0%"
            trend="neutral"
            icon={Building}
            color="purple"
          />
          <StatCard
            title="Revenue"
            value={`$${(stats.totalRevenue / 1_000_000).toFixed(1)}M`}
            change="+18.3%"
            trend="up"
            icon={DollarSign}
            color="yellow"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            change="+5.1%"
            trend="up"
            icon={TrendingUp}
            color="green"
          />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueData} timeframe={timeframe} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <Activity size={20} className="text-gray-400 mb-4" />
            {/* Conversion Funnel Placeholder (static for now) */}
            {/* You can later refactor this to use real data if needed */}
            <div className="h-64 space-y-4">
              {/* Similar static funnel code as before */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsBySourceChart data={leadsBySource} />
        <LeadsByStatusChart data={leadsByStatus} />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeadsTable leads={recentLeads} />
        <UpcomingFollowUps leads={followUps} />
      </div>
    </div>
  );
};

export default Dashboard;
