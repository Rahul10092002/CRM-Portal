import { TrendingUp } from "lucide-react"

const RevenueChart = ({ timeframe }) => {
  // This would normally use a charting library like Chart.js or Recharts
  // For this example, we'll create a simple visual representation

  // Generate mock data based on timeframe
  const generateData = () => {
    let labels = []
    let data = []

    if (timeframe === "week") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      data = [12, 19, 15, 22, 30, 25, 18]
    } else if (timeframe === "month") {
      labels = Array.from({ length: 30 }, (_, i) => i + 1)
      data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 10)
    } else if (timeframe === "quarter") {
      labels = ["Jan", "Feb", "Mar"]
      data = [120, 150, 180]
    } else if (timeframe === "year") {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      data = [120, 150, 180, 210, 190, 240, 230, 250, 270, 285, 300, 320]
    }

    return { labels, data }
  }

  const { labels, data } = generateData()
  const maxValue = Math.max(...data)

  return (
    <div className="flex flex-col">
      <TrendingUp size={24} className="text-gray-400 mb-4" />
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t-sm mx-0.5"
                style={{ height: `${(value / maxValue) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RevenueChart
