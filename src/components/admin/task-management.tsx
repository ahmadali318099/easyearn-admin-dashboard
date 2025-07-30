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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Lock, Unlock } from "lucide-react"

const mockTasks = [
  {
    id: "TASK001",
    title: "Daily Login",
    description: "Login to the app daily",
    reward: 10,
    status: "approved",
    type: "daily",
    createdDate: "2024-01-10",
  },
  {
    id: "TASK002",
    title: "Complete Profile",
    description: "Fill out your complete profile information",
    reward: 50,
    status: "locked",
    type: "onetime",
    createdDate: "2024-01-12",
  },
  {
    id: "TASK003",
    title: "Refer 3 Friends",
    description: "Invite 3 friends to join the platform",
    reward: 100,
    status: "approved",
    type: "referral",
    createdDate: "2024-01-14",
  },
]

export default function TaskManagement() {
  const [tasks, setTasks] = useState(mockTasks)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    type: "daily",
    status: "approved",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData, reward: Number(formData.reward) } : task,
        ),
      )
      setEditingTask(null)
    } else {
      const newTask = {
        id: `TASK${String(tasks.length + 1).padStart(3, "0")}`,
        ...formData,
        reward: Number(formData.reward),
        createdDate: new Date().toISOString().split("T")[0],
      }
      setTasks([...tasks, newTask])
    }
    setFormData({ title: "", description: "", reward: "", type: "daily", status: "approved" })
    setIsAddDialogOpen(false)
  }

  const handleEdit = (task: any) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description,
      reward: task.reward.toString(),
      type: task.type,
      status: task.status,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "locked" ? "approved" : "locked" } : task,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "locked":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Locked
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      daily: "bg-blue-50 text-blue-700 border-blue-200",
      weekly: "bg-purple-50 text-purple-700 border-purple-200",
      onetime: "bg-orange-50 text-orange-700 border-orange-200",
      referral: "bg-green-50 text-green-700 border-green-200",
    }
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors] || colors.daily}>
        {type}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="mt-2 text-gray-600">Create and manage user tasks</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingTask(null)
                setFormData({ title: "", description: "", reward: "", type: "daily", status: "approved" })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
              <DialogDescription>
                {editingTask ? "Update task details" : "Create a new task for users to complete"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reward">Reward Points</Label>
                  <Input
                    id="reward"
                    type="number"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Task Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="onetime">One Time</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingTask ? "Update Task" : "Create Task"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
          <CardDescription>Manage all user tasks and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(task.type)}</TableCell>
                  <TableCell>{task.reward} pts</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{task.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(task.id)}
                        className={
                          task.status === "locked"
                            ? "text-green-600 hover:text-green-700"
                            : "text-red-600 hover:text-red-700"
                        }
                      >
                        {task.status === "locked" ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
