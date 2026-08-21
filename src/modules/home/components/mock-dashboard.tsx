"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  BarChart3,
  Mail,
  Clock,
  Zap,
  Search,
  FileText,
} from "./icons";
import { USERS_MOCK, DashboardUser } from "@/dummy/data";

export default function MockDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "emails", label: "Email Templates", icon: Mail },
    { id: "sessions", label: "Sessions", icon: Clock },
    { id: "settings", label: "Settings", icon: Zap },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-obsidian-950 flex flex-col md:flex-row h-150 font-sans">

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-obsidian-900 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-2 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-white text-lg">
            SaaS Boilerplate
          </span>
        </div>

        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="text-xs font-semibold text-gray-500 mb-2 px-3 uppercase tracking-wider">
            Menu
          </div>
          {sidebarLinks.map((link) => {
            const isActive = activeTab === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary to-brand-primary p-px">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-full h-full rounded-full object-cover border border-obsidian-950"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-200">
                Admin User
              </span>
              <span className="text-xs text-gray-500">Pro Plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-obsidian-950">
        {/* Top Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-obsidian-900/50">
          <h2 className="font-display font-semibold text-lg text-white capitalize">
            {activeTab} Management
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-obsidian-800 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-primary/50 w-64 transition-colors"
                readOnly
              />
            </div>
            <button className="bg-primary hover:bg-primary text-obsidian-950 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
              Add New
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "users" ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="users-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Total Users", value: "2,543", trend: "+12.5%" },
                    { label: "Active Sessions", value: "842", trend: "+5.2%" },
                    { label: "MRR", value: "$12,450", trend: "+18.1%" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-obsidian-900 border border-white/5 rounded-xl p-4 flex flex-col gap-2"
                    >
                      <span className="text-sm font-medium text-gray-400">
                        {stat.label}
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-white">
                          {stat.value}
                        </span>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Users Table */}
                <div className="bg-obsidian-900 border border-white/5 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/5">
                    <h3 className="font-semibold text-white">Recent Users</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-obsidian-800/50 text-gray-400">
                        <tr>
                          <th className="px-5 py-3 font-medium">User</th>
                          <th className="px-5 py-3 font-medium">Plan</th>
                          <th className="px-5 py-3 font-medium">Status</th>
                          <th className="px-5 py-3 font-medium">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300">
                        {USERS_MOCK.map((user: DashboardUser) => (
                          <tr key={user.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs">
                                  {user.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-200">
                                    {user.name}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 rounded-md text-xs font-medium text-gray-300">
                                {user.plan === "Enterprise" && <Zap className="w-3 h-3 text-amber-400" />}
                                {user.plan}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${user.status === "Active"
                                    ? "bg-primary shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                                    : "bg-gray-500"
                                    }`}
                                />
                                <span>{user.status}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-400">
                              {user.joinedAt}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-obsidian-800 border border-white/10 flex items-center justify-center text-gray-400">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module
                </h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">
                  This section is fully functional in the boilerplate codebase. Switch back to Users to see the data table in action.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("users")}
                className="mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Return to Users
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
