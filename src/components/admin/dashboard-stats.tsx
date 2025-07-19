import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, XCircle } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Pending Requests",
    value: "23",
    change: "-8%",
    changeType: "negative" as const,
    icon: FileText,
  },
  {
    title: "Approved Today",
    value: "156",
    change: "+24%",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Denied Today",
    value: "12",
    change: "-15%",
    changeType: "negative" as const,
    icon: XCircle,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive" 
                  ? "text-success" 
                  : "text-destructive"
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}