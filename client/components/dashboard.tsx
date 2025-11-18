import { Card } from "./ui/card"
import { Users, UtensilsCrossed, DollarSign, TrendingUp } from "lucide-react"

export function Dashboard() {
  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { label: "Menu Items", value: "48", icon: UtensilsCrossed, change: "+3" },
    { label: "Revenue", value: "$24,500", icon: DollarSign, change: "+18%" },
    { label: "Growth", value: "23%", icon: TrendingUp, change: "+5%" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-foreground">Dashboard Overview</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back! Here's what's happening with your restaurant today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-sm font-medium text-accent">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h4 className="mt-1 text-2xl font-bold text-foreground">{stat.value}</h4>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 shadow-md">
        <h4 className="text-lg font-semibold text-foreground">Recent Activity</h4>
        <div className="mt-4 space-y-4">
          {[
            { action: "New user registration", time: "2 minutes ago" },
            { action: "Menu item updated: Truffle Risotto", time: "15 minutes ago" },
            { action: "Order completed: Table 12", time: "1 hour ago" },
            { action: "New reservation for 6 people", time: "2 hours ago" },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <p className="text-sm text-foreground">{activity.action}</p>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
