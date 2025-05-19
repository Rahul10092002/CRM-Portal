"use client";

import { useState } from "react";
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

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("month");

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value="1,284"
          change="+12.5%"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Conversion Rate"
          value="24.8%"
          change="+3.2%"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Active Projects"
          value="8"
          change="0%"
          trend="neutral"
          icon={Building}
          color="purple"
        />
        <StatCard
          title="Revenue"
          value="$1.2M"
          change="+18.3%"
          trend="up"
          icon={DollarSign}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart timeframe={timeframe} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <Activity size={20} className="text-gray-400 mb-4" />
            <div className="h-64">
              {/* Placeholder for lead conversion funnel chart */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className="bg-blue-600 h-5 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">New (100%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className="bg-blue-600 h-5 rounded-full"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    Contacted (68%)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className="bg-blue-600 h-5 rounded-full"
                      style={{ width: "42%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    Site Visit (42%)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className="bg-blue-600 h-5 rounded-full"
                      style={{ width: "28%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    Negotiation (28%)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className="bg-blue-600 h-5 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">Won (15%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <RecentLeadsTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Follow-ups</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <UpcomingFollowUps />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsBySourceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsByStatusChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
