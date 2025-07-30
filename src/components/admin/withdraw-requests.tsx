"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X, Eye, AlertTriangle } from "lucide-react"

const mockWithdraws = [
  {
    id: "WTH001",
    userId: "user123",
    amount: 150.0,
    method: "Bank Transfer",
    accountDetails: "Bank: Chase, Account: ****1234",
    status: "pending",
    requestDate: "2024-01-15",
    processedDate: null,
    adminNotes: "",
  },
  {
    id: "WTH002",
    userId: "user456",
    amount: 300.0,
    method: "PayPal",
    accountDetails: "user456@email.com",
    status: "pending",
    requestDate: "2024-01-15",
    processedDate: null,
    adminNotes: "",
  },
  {
    id: "WTH003",
    userId: "user789",
    amount: 75.0,
    method: "Crypto",
    accountDetails: "BTC: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    status: "approved",
    requestDate: "2024-01-14",
    processedDate: "2024-01-15",
    adminNotes: "Verified and processed",
  },
  {
    id: "WTH004",
    userId: "user321",
    amount: 500.0,
    method: "Bank Transfer",
    accountDetails: "Bank: Wells Fargo, Account: ****5678",
    status: "rejected",
    requestDate: "2024-01-13",
    processedDate: "2024-01-14",
    adminNotes: "Insufficient verification documents",
  },
  {
    id: "WTH005",
    userId: "user654",
    amount: 1000.0,
    method: "Bank Transfer",
    accountDetails: "Bank: Bank of America, Account: ****9999",
    status: "flagged",
    requestDate: "2024-01-15",
    processedDate: null,
    adminNotes: "Large amount - requires additional verification",
  },
]

export default function WithdrawRequests() {
  const [withdraws, setWithdraws] = useState(mockWithdraws)
  const [statusFilter, setStatusFilter] = useState("all")

  const handleApprove = (id: string) => {
    setWithdraws(
      withdraws.map((withdraw) =>
        withdraw.id === id
          ? {
              ...withdraw,
              status: "approved",
              processedDate: new Date().toISOString().split("T")[0],
              adminNotes: "Approved by admin",
            }
          : withdraw,
      ),
    )
  }

  const handleReject = (id: string) => {
    setWithdraws(
      withdraws.map((withdraw) =>
        withdraw.id === id
          ? {
              ...withdraw,
              status: "rejected",
              processedDate: new Date().toISOString().split("T")[0],
              adminNotes: "Rejected by admin",
            }
          : withdraw,
      ),
    )
  }

  const handleFlag = (id: string) => {
    setWithdraws(
      withdraws.map((withdraw) =>
        withdraw.id === id
          ? {
              ...withdraw,
              status: "flagged",
              adminNotes: "Flagged for review",
            }
          : withdraw,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "flagged":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Flagged
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredWithdraws =
    statusFilter === "all" ? withdraws : withdraws.filter((withdraw) => withdraw.status === statusFilter)

  const stats = {
    pending: withdraws.filter((w) => w.status === "pending").length,
    flagged: withdraws.filter((w) => w.status === "flagged").length,
    totalAmount: withdraws
      .filter((w) => w.status === "pending" || w.status === "flagged")
      .reduce((sum, w) => sum + w.amount, 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Withdraw Requests</h1>
        <p className="mt-2 text-gray-600">Review and process user withdrawal requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <div className="h-4 w-4 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.flagged}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending Amount</CardTitle>
            <div className="h-4 w-4 bg-blue-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Requires processing</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Withdrawal Requests</CardTitle>
              <CardDescription>Manage all user withdrawal requests</CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Account Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWithdraws.map((withdraw) => (
                  <TableRow key={withdraw.id}>
                    <TableCell className="font-medium">{withdraw.id}</TableCell>
                    <TableCell>{withdraw.userId}</TableCell>
                    <TableCell className="font-medium">${withdraw.amount.toFixed(2)}</TableCell>
                    <TableCell>{withdraw.method}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={withdraw.accountDetails}>
                      {withdraw.accountDetails}
                    </TableCell>
                    <TableCell>{getStatusBadge(withdraw.status)}</TableCell>
                    <TableCell>{withdraw.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(withdraw.status === "pending" || withdraw.status === "flagged") && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 bg-transparent"
                              onClick={() => handleApprove(withdraw.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                              onClick={() => handleReject(withdraw.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {withdraw.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 bg-transparent"
                            onClick={() => handleFlag(withdraw.id)}
                          >
                            <AlertTriangle className="h-4 w-4" />
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
