"use client"

import { useState } from "react"
import { Sidebar } from "../../../components/sidebar"
import { TopNavbar } from "../../../components/top-navbar"
import { Dashboard } from "../../../components/dashboard"
import { UserManagement } from "../../../components/user-management"
import { MenuManagement } from "../../../components/menu-management"
import { Settings } from "../../../components/settings"

type View = "dashboard" | "users" | "menu" | "settings"

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UserManagement />
      case "menu":
        return <MenuManagement />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
