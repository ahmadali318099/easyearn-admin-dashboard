"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Eye } from "lucide-react"

const mockDeposits = [
  {
    id: "DEP001",
    userId: "user123",
    amount: 250.0,
    method: "Bank Transfer",
    status: "pending",
    date: "2024-01-15",
    transactionId: "TXN123456789",
  },
  {
    id: "DEP002",
    userId: "user456",
    amount: 500.0,
    method: "Credit Card",
    status: "pending",
    date: "2024-01-15",
    transactionId: "TXN987654321",
  },
  {
    id: "DEP003",
    userId: "user789",
    amount: 100.0,
    method: "PayPal",
    status: "approved",
    date: "2024-01-14",
    transactionId: "TXN456789123",
  },
  {
    id: "DEP004",
    userId: "user321",
    amount: 750.0,
    method: "Bank Transfer",
    status: "rejected",
    date: "2024-01-14",
    transactionId: "TXN789123456",
  },
]

export default function DepositRequests() {
  const [deposits, setDeposits] = useState(mockDeposits)

  const handleApprove = (id: string) => {
    setDeposits(deposits.map((deposit) => (deposit.id === id ? { ...deposit, status: "approved" } : deposit)))
  }

  const handleReject = (id: string) => {
    setDeposits(deposits.map((deposit) => (deposit.id === id ? { ...deposit, status: "rejected" } : deposit)))
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
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Deposit Requests</h1>
        <p className="mt-2 text-gray-600">Manage user deposit requests and approvals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Deposit Requests</CardTitle>
          <CardDescription>Review and manage user deposit requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deposit ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-medium">{deposit.id}</TableCell>
                    <TableCell>{deposit.userId}</TableCell>
                    <TableCell>${deposit.amount.toFixed(2)}</TableCell>
                    <TableCell>{deposit.method}</TableCell>
                    <TableCell className="font-mono text-sm">{deposit.transactionId}</TableCell>
                    <TableCell>{deposit.date}</TableCell>
                    <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {deposit.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 bg-transparent"
                              onClick={() => handleApprove(deposit.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                              onClick={() => handleReject(deposit.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
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
