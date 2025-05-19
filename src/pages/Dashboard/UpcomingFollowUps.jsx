import { Calendar, Clock, User } from "lucide-react"

const UpcomingFollowUps = () => {
  const followUps = [
    {
      id: 1,
      leadName: "John Smith",
      type: "Call",
      date: "2023-05-19",
      time: "10:00 AM",
      notes: "Discuss Parkview pricing options",
    },
    {
      id: 2,
      leadName: "Sarah Johnson",
      type: "Email",
      date: "2023-05-19",
      time: "2:30 PM",
      notes: "Send floor plans for Riverside",
    },
    {
      id: 3,
      leadName: "Michael Brown",
      type: "Site Visit",
      date: "2023-05-20",
      time: "11:00 AM",
      notes: "Tour of Parkview model unit",
    },
    {
      id: 4,
      leadName: "Emily Davis",
      type: "Call",
      date: "2023-05-21",
      time: "3:00 PM",
      notes: "Follow up on contract details",
    },
  ]

  return (
    <div className="space-y-4">
      {followUps.map((followUp) => (
        <div key={followUp.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User size={16} className="text-gray-400" />
              <span className="ml-2 text-sm font-medium text-gray-900">{followUp.leadName}</span>
            </div>
            <span className="text-xs font-medium text-gray-500">{followUp.type}</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(followUp.date).toLocaleDateString()}</span>
            <Clock size={14} className="ml-3 mr-1" />
            <span>{followUp.time}</span>
          </div>
          <p className="mt-2 text-xs text-gray-600">{followUp.notes}</p>
        </div>
      ))}
    </div>
  )
}

export default UpcomingFollowUps
