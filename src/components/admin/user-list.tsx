"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Ban, CheckCircle, UserCheck, Gift } from "lucide-react"

const mockUsers = [
  {
    id: "user001",
    username: "john_doe",
    email: "john@example.com",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-15",
    totalDeposits: 500.0,
    totalWithdraws: 150.0,
    referralCount: 3,
    luckyDrawParticipation: 5,
    accountType: "premium",
    isReferred: true,
    referredBy: "user123",
  },
  {
    id: "user002",
    username: "jane_smith",
    email: "jane@example.com",
    status: "active",
    joinDate: "2024-01-12",
    lastLogin: "2024-01-15",
    totalDeposits: 250.0,
    totalWithdraws: 0,
    referralCount: 1,
    luckyDrawParticipation: 2,
    accountType: "basic",
    isReferred: false,
    referredBy: null,
  },
  {
    id: "user003",
    username: "mike_wilson",
    email: "mike@example.com",
    status: "suspended",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-13",
    totalDeposits: 1000.0,
    totalWithdraws: 800.0,
    referralCount: 0,
    luckyDrawParticipation: 8,
    accountType: "premium",
    isReferred: true,
    referredBy: "user456",
  },
  {
    id: "user004",
    username: "sarah_jones",
    email: "sarah@example.com",
    status: "pending",
    joinDate: "2024-01-14",
    lastLogin: "2024-01-14",
    totalDeposits: 0,
    totalWithdraws: 0,
    referralCount: 0,
    luckyDrawParticipation: 0,
    accountType: "basic",
    isReferred: true,
    referredBy: "user001",
  },
]

export default function UserList() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Suspended
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "banned":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Banned
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAccountTypeBadge = (type: string) => {
    switch (type) {
      case "premium":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Premium
          </Badge>
        )
      case "basic":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Basic
          </Badge>
        )
      default:
        return <Badge variant="outline">Basic</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    premium: users.filter((u) => u.accountType === "premium").length,
    referred: users.filter((u) => u.isReferred).length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="mt-2 text-gray-600">Manage all registered users and their activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="h-4 w-4 bg-blue-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <div className="h-4 w-4 bg-purple-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.premium}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referred Users</CardTitle>
            <UserCheck className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.referred}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete list of registered users</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full sm:w-[300px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Deposits</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Lucky Draws</TableHead>
                  <TableHead>Referred</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${user.username.charAt(0).toUpperCase()}`}
                          />
                          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getAccountTypeBadge(user.accountType)}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">${user.totalDeposits.toFixed(2)}</div>
                        <div className="text-gray-500">Withdrawn: ${user.totalWithdraws.toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <UserCheck className="h-4 w-4 mr-1 text-blue-500" />
                        {user.referralCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Gift className="h-4 w-4 mr-1 text-purple-500" />
                        {user.luckyDrawParticipation}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.isReferred ? (
                        <div className="text-sm">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Yes
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">by {user.referredBy}</div>
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={() => handleStatusChange(user.id, "suspended")}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}
                        {user.status === "suspended" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 bg-transparent"
                            onClick={() => handleStatusChange(user.id, "active")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
