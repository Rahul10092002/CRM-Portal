import { useState } from "react";
import { Link2, ExternalLink, Plus, RefreshCw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const Integrations = () => {
  // Mock integrations data
  const integrations = [
    {
      id: 1,
      name: "Google Calendar",
      description:
        "Sync your appointments and site visits with Google Calendar",
      icon: "/placeholder.svg?height=40&width=40&text=GC",
      status: "Connected",
      category: "Calendar",
    },
    {
      id: 2,
      name: "Gmail",
      description: "Send and track emails directly from the CRM",
      icon: "/placeholder.svg?height=40&width=40&text=GM",
      status: "Connected",
      category: "Email",
    },
    {
      id: 3,
      name: "WhatsApp Business",
      description: "Send WhatsApp messages to leads and clients",
      icon: "/placeholder.svg?height=40&width=40&text=WA",
      status: "Not Connected",
      category: "Communication",
    },
    {
      id: 4,
      name: "Mailchimp",
      description: "Create and send marketing campaigns to leads",
      icon: "/placeholder.svg?height=40&width=40&text=MC",
      status: "Not Connected",
      category: "Marketing",
    },
    {
      id: 5,
      name: "Zapier",
      description: "Connect with thousands of apps through Zapier",
      icon: "/placeholder.svg?height=40&width=40&text=ZP",
      status: "Connected",
      category: "Automation",
    },
    {
      id: 6,
      name: "Google Drive",
      description: "Store and manage documents in Google Drive",
      icon: "/placeholder.svg?height=40&width=40&text=GD",
      status: "Not Connected",
      category: "Storage",
    },
    {
      id: 7,
      name: "Twilio",
      description: "Send SMS notifications and alerts",
      icon: "/placeholder.svg?height=40&width=40&text=TW",
      status: "Connected",
      category: "Communication",
    },
    {
      id: 8,
      name: "QuickBooks",
      description: "Sync financial data with QuickBooks",
      icon: "/placeholder.svg?height=40&width=40&text=QB",
      status: "Not Connected",
      category: "Finance",
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      Connected: "success",
      "Not Connected": "default",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(integrations.map((integration) => integration.category))
    ),
  ];

  const filteredIntegrations =
    activeCategory === "All"
      ? integrations
      : integrations.filter(
          (integration) => integration.category === activeCategory
        );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Link2 size={24} className="text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <Button icon={Plus}>Add Integration</Button>
          <Button variant="outline" icon={RefreshCw}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap mr-2 ${
              activeCategory === category
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="p-6">
              <div className="flex items-start">
                <img
                  src={integration.icon || "/placeholder.svg"}
                  alt={integration.name}
                  className="w-10 h-10 rounded-md mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
                      {integration.name}
                    </h3>
                    {getStatusBadge(integration.status)}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {integration.description}
                  </p>
                  <div className="mt-4">
                    {integration.status === "Connected" ? (
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm">Connect</Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Marketplace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Discover more integrations to enhance your PropertyCRM experience.
              Connect with popular services for marketing, communication,
              finance, and more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Marketing", "Communication", "Finance"].map((category) => (
                <Card key={category} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {category} Integrations
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {category === "Marketing" &&
                        "Boost your marketing efforts with email campaigns, social media, and more."}
                      {category === "Communication" &&
                        "Connect with clients through various communication channels."}
                      {category === "Finance" &&
                        "Streamline your financial processes with accounting integrations."}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 p-0"
                      icon={ExternalLink}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline">View All Integrations</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Use our API to build custom integrations with your existing
              systems and applications.
            </p>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">API Key</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Use this key to authenticate API requests
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-200 px-4 py-2 rounded-md text-sm font-mono">
                    ••••••••••••••••
                  </div>
                  <Button variant="outline" size="sm">
                    Show
                  </Button>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  API Documentation
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Learn how to use our API with detailed documentation and
                  examples
                </p>
              </div>
              <Button variant="outline" size="sm" icon={ExternalLink}>
                View Documentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;
