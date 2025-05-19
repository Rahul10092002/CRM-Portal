import { BarChart2 } from "lucide-react"

const LeadsByStatusChart = () => {
  // This would normally use a charting library like Chart.js or Recharts
  // For this example, we'll create a simple visual representation

  const statuses = [
    { name: "New", value: 45, color: "bg-blue-500" },
    { name: "Contacted", value: 30, color: "bg-indigo-500" },
    { name: "Site Visit", value: 15, color: "bg-yellow-500" },
    { name: "Negotiation", value: 7, color: "bg-orange-500" },
    { name: "Won", value: 3, color: "bg-green-500" },
  ]

  const maxValue = Math.max(...statuses.map((status) => status.value))

  return (
    <div className="flex flex-col">
      <BarChart2 size={24} className="text-gray-400 mb-4" />
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{status.name}</span>
              <span className="text-gray-500">{status.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${status.color} h-2.5 rounded-full`}
                style={{ width: `${(status.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeadsByStatusChart
