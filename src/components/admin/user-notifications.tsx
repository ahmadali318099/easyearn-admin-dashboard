"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Send, Bell } from "lucide-react"

const mockNotifications = [
  {
    id: "NOT001",
    recipient: "user123",
    title: "Welcome Bonus Available",
    message: "Your welcome bonus is ready to claim!",
    type: "promotion",
    status: "sent",
    date: "2024-01-15",
  },
  {
    id: "NOT002",
    recipient: "all_users",
    title: "System Maintenance",
    message: "Scheduled maintenance on Jan 20th from 2-4 AM",
    type: "system",
    status: "scheduled",
    date: "2024-01-20",
  },
]

export default function UserNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [formData, setFormData] = useState({
    recipient: "",
    title: "",
    message: "",
    type: "general",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newNotification = {
      id: `NOT${String(notifications.length + 1).padStart(3, "0")}`,
      ...formData,
      status: "sent",
      date: new Date().toISOString().split("T")[0],
    }
    setNotifications([newNotification, ...notifications])
    setFormData({ recipient: "", title: "", message: "", type: "general" })
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      general: "bg-blue-50 text-blue-700 border-blue-200",
      promotion: "bg-green-50 text-green-700 border-green-200",
      system: "bg-orange-50 text-orange-700 border-orange-200",
      warning: "bg-red-50 text-red-700 border-red-200",
    }
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors] || colors.general}>
        {type}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Sent
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Scheduled
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Draft
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Notifications</h1>
        <p className="mt-2 text-gray-600">Send custom notifications to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              Send Notification
            </CardTitle>
            <CardDescription>Send a custom notification to specific users or all users</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="recipient">Recipient</Label>
                <Select
                  value={formData.recipient}
                  onValueChange={(value) => setFormData({ ...formData, recipient: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_users">All Users</SelectItem>
                    <SelectItem value="active_users">Active Users</SelectItem>
                    <SelectItem value="new_users">New Users</SelectItem>
                    <SelectItem value="custom">Custom User ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.recipient === "custom" && (
                <div>
                  <Label htmlFor="customRecipient">User ID</Label>
                  <Input
                    id="customRecipient"
                    placeholder="Enter user ID"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="type">Notification Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Notification title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Notification message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Recent Notifications
            </CardTitle>
            <CardDescription>Recently sent notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getTypeBadge(notification.type)}
                        {getStatusBadge(notification.status)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    To: {notification.recipient} • {notification.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>Complete history of sent notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">{notification.id}</TableCell>
                  <TableCell>{notification.recipient}</TableCell>
                  <TableCell>{notification.title}</TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>{notification.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
