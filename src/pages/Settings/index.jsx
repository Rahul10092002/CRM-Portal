"use client";

import { useState } from "react";
import {
  Save,
  User,
  LockKeyhole,
  Bell,
  Mail,
  Globe,
  Palette,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <button
                className={`flex items-center text-left px-4 py-3 border-l-4 ${
                  activeTab === "profile"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} className="mr-3" />
                <span>Profile</span>
              </button>
              <button
                className={`flex items-center text-left px-4 py-3 border-l-4 ${
                  activeTab === "account"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
                onClick={() => setActiveTab("account")}
              >
                <LockKeyhole size={18} className="mr-3" />
                <span>Account</span>
              </button>
              <button
                className={`flex items-center text-left px-4 py-3 border-l-4 ${
                  activeTab === "notifications"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
              </button>
              <button
                className={`flex items-center text-left px-4 py-3 border-l-4 ${
                  activeTab === "emails"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
                onClick={() => setActiveTab("emails")}
              >
                <Mail size={18} className="mr-3" />
                <span>Email Templates</span>
              </button>
              <button
                className={`flex items-center text-left px-4 py-3 border-l-4 ${
                  activeTab === "company"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
                onClick={() => setActiveTab("company")}
              >
                <Globe size={18} className="mr-3" />
                <span>Company</span>
              </button>
              <button
                className={`flex items-center text-left px-4 py-3 border-l-4 ${
                  activeTab === "appearance"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-transparent hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
                onClick={() => setActiveTab("appearance")}
              >
                <Palette size={18} className="mr-3" />
                <span>Appearance</span>
              </button>
            </nav>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          {activeTab === "profile" && (
            <>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-6">
                      <User size={32} />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue="John"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue="Doe"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="john.doe@example.com"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="+1 (555) 123-4567"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      defaultValue="Sales executive with 5+ years of experience in real estate."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button icon={Save}>Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {activeTab === "account" && (
            <>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Enable two-factor authentication
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="toggle"
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="toggle"
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Sessions
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Current Session
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Chrome on Windows • IP 192.168.1.1 • Last active 2
                            minutes ago
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Mobile App
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            iPhone 13 • IP 192.168.1.2 • Last active 3 hours ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button icon={Save}>Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newLead"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="newLead"
                            className="font-medium text-gray-700"
                          >
                            New Lead Assigned
                          </label>
                          <p className="text-gray-500">
                            Get notified when a new lead is assigned to you
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="followUp"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="followUp"
                            className="font-medium text-gray-700"
                          >
                            Follow-up Reminders
                          </label>
                          <p className="text-gray-500">
                            Get reminders for scheduled follow-ups
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="siteVisit"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="siteVisit"
                            className="font-medium text-gray-700"
                          >
                            Site Visit Scheduled
                          </label>
                          <p className="text-gray-500">
                            Get notified when a site visit is scheduled
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="documentUploaded"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="documentUploaded"
                            className="font-medium text-gray-700"
                          >
                            Document Uploaded
                          </label>
                          <p className="text-gray-500">
                            Get notified when a document is uploaded
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      System Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="systemUpdates"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="systemUpdates"
                            className="font-medium text-gray-700"
                          >
                            System Updates
                          </label>
                          <p className="text-gray-500">
                            Get notified about system updates and maintenance
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newFeatures"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="newFeatures"
                            className="font-medium text-gray-700"
                          >
                            New Features
                          </label>
                          <p className="text-gray-500">
                            Get notified about new features and improvements
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button icon={Save}>Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {activeTab === "emails" && (
            <>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">
                      Available Templates
                    </h3>
                    <Button variant="outline" size="sm">
                      Create New Template
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Welcome Email",
                      "Follow-up Reminder",
                      "Site Visit Confirmation",
                      "Document Request",
                      "Thank You Note",
                    ].map((template, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {template}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Last edited: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Email Signature
                    </h3>
                    <div className="border border-gray-200 rounded-md p-4">
                      <textarea
                        rows={4}
                        defaultValue={`John Doe\nSales Executive\nPropertyCRM\nPhone: +1 (555) 123-4567\nEmail: john.doe@example.com`}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button icon={Save}>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {activeTab === "company" && (
            <>
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 mr-6">
                      <Globe size={32} />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Logo
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        defaultValue="PropertyCRM"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        defaultValue="https://www.propertycrm.com"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactEmail"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        defaultValue="info@propertycrm.com"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactPhone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="contactPhone"
                        defaultValue="+1 (555) 987-6543"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      defaultValue="123 Business Street, Suite 100, Metro City, State 12345"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button icon={Save}>Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {activeTab === "appearance" && (
            <>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-blue-500 rounded-md p-4 bg-white cursor-pointer">
                        <div className="h-20 bg-white border border-gray-200 rounded-md mb-2"></div>
                        <p className="text-sm font-medium text-center">Light</p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-4 bg-white cursor-pointer">
                        <div className="h-20 bg-gray-900 border border-gray-700 rounded-md mb-2"></div>
                        <p className="text-sm font-medium text-center">Dark</p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-4 bg-white cursor-pointer">
                        <div className="h-20 bg-gradient-to-b from-white to-gray-900 border border-gray-200 rounded-md mb-2"></div>
                        <p className="text-sm font-medium text-center">
                          System
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Primary Color
                    </h3>
                    <div className="grid grid-cols-6 gap-4">
                      {[
                        "#3B82F6",
                        "#10B981",
                        "#F59E0B",
                        "#EF4444",
                        "#8B5CF6",
                        "#EC4899",
                      ].map((color, index) => (
                        <div
                          key={index}
                          className={`h-10 rounded-md cursor-pointer ${
                            index === 0
                              ? "ring-2 ring-offset-2 ring-blue-500"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Font Size
                    </h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        defaultValue="2"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex space-x-4 text-gray-700">
                        <span className="text-xs">A</span>
                        <span className="text-base">A</span>
                        <span className="text-lg">A</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Sidebar Position
                    </h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="left"
                          name="sidebarPosition"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="left"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Left
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="right"
                          name="sidebarPosition"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="right"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Right
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button icon={Save}>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Settings;
