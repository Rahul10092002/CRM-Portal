import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Card, CardContent } from "../../components/ui/Card"

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  }

  const trendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
          <div className={`flex items-center ${trendColor}`}>
            <trendIcon size={16} />
            <span className="ml-1 text-sm font-medium">{change}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
