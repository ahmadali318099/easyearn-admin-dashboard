import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, X, FileText } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import userAvatar1 from "@/assets/user-avatar-1.jpg"
import userAvatar2 from "@/assets/user-avatar-2.jpg"
import documentPreview1 from "@/assets/document-preview-1.jpg"
import documentPreview2 from "@/assets/document-preview-2.jpg"

interface PendingRequest {
  id: string
  userEmail: string
  userAvatar: string
  documentTitle: string
  documentPreview: string
  submittedAt: string
  status: "pending" | "approved" | "denied"
}

const mockRequests: PendingRequest[] = [
  {
    id: "1",
    userEmail: "sarah.johnson@example.com",
    userAvatar: userAvatar1,
    documentTitle: "Business Registration Document",
    documentPreview: documentPreview1,
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending"
  },
  {
    id: "2", 
    userEmail: "michael.chen@example.com",
    userAvatar: userAvatar2,
    documentTitle: "Financial Report Q4 2023",
    documentPreview: documentPreview2,
    submittedAt: "2024-01-15T09:15:00Z",
    status: "pending"
  },
]

export function PendingRequests() {
  const [requests, setRequests] = useState<PendingRequest[]>(mockRequests)
  const { toast } = useToast()

  const handleApprove = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "approved" } : req
      )
    )
    toast({
      title: "Request Approved",
      description: "The user submission has been approved successfully.",
    })
  }

  const handleDeny = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: "denied" } : req
      )
    )
    toast({
      title: "Request Denied",
      description: "The user submission has been denied.",
      variant: "destructive",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <Card className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Pending Requests
        </CardTitle>
        <CardDescription>
          Review and approve user submitted documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center gap-4 p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={request.userAvatar} alt={request.userEmail} />
                <AvatarFallback>
                  {request.userEmail.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium truncate">{request.userEmail}</p>
                  <Badge 
                    variant={
                      request.status === "pending" ? "secondary" :
                      request.status === "approved" ? "default" : "destructive"
                    }
                    className="text-xs"
                  >
                    {request.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {request.documentTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted {formatDate(request.submittedAt)}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <img
                  src={request.documentPreview}
                  alt="Document preview"
                  className="w-16 h-12 object-cover rounded border border-border"
                />
              </div>
              
              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                    className="h-8 px-3"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeny(request.id)}
                    className="h-8 px-3"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Deny
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {requests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pending requests at the moment</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}