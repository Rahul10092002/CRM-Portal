import { PieChart } from "lucide-react"

const LeadsBySourceChart = () => {
  // This would normally use a charting library like Chart.js or Recharts
  // For this example, we'll create a simple visual representation

  const sources = [
    { name: "Website", value: 35, color: "bg-blue-500" },
    { name: "Facebook", value: 25, color: "bg-indigo-500" },
    { name: "Referral", value: 20, color: "bg-green-500" },
    { name: "Google", value: 15, color: "bg-yellow-500" },
    { name: "Other", value: 5, color: "bg-gray-500" },
  ]

  return (
    <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <PieChart size={24} className="text-gray-400 mb-4" />
      <div className="w-full flex justify-center">
        <div className="w-40 h-40 relative rounded-full overflow-hidden">
          {sources.map((source, index) => {
            const rotation =
              index > 0
                ? sources
                    .slice(0, index)
                    .reduce((acc, curr) => acc + curr.value, 0) * 3.6
                : 0;

            return (
              <div
                key={source.name}
                className={`absolute top-0 left-0 w-full h-full ${source.color}`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${
                    50 +
                    50 *
                      Math.cos(
                        ((rotation + source.value * 3.6) * Math.PI) / 180
                      )
                  }% ${
                    50 -
                    50 *
                      Math.sin(
                        ((rotation + source.value * 3.6) * Math.PI) / 180
                      )
                  }%, ${50 + 50 * Math.cos((rotation * Math.PI) / 180)}% ${
                    50 - 50 * Math.sin((rotation * Math.PI) / 180)
                  }%)`,
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
            <span className="ml-2 text-sm text-gray-600">
              {source.name}: {source.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadsBySourceChart
