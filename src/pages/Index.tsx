import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { PendingRequests } from "@/components/admin/pending-requests"
import { NotificationSender } from "@/components/admin/notification-sender"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { ThemeProvider } from "@/components/theme-provider"

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardStats />
            <div className="grid gap-6 lg:grid-cols-2">
              <PendingRequests />
              <NotificationSender />
            </div>
          </div>
        )
      case "users":
        return (
          <div className="space-y-6">
            <PendingRequests />
          </div>
        )
      case "notifications":
        return (
          <div className="space-y-6">
            <NotificationSender />
          </div>
        )
      case "settings":
        return (
          <div className="p-6 bg-card rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="easylarn-theme">
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
