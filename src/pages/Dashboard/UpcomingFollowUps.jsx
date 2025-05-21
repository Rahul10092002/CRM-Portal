import { Calendar, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getUpcomingFollowUps } from "../../services/dashboardService";

const UpcomingFollowUps = () => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    getUpcomingFollowUps().then((res) => {
      setFollowUps(res.data);
    });
  }, []);
  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {followUps.length ? (
        followUps.map((followUp) => (
          <div
            key={followUp.id}
            className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User size={16} className="text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {followUp.leadName}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-500">
                {followUp.type}
              </span>
            </div>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>{new Date(followUp.date).toLocaleDateString()}</span>
              <Clock size={14} className="ml-3 mr-1" />
              <span>{followUp.time}</span>
            </div>
            <p className="mt-2 text-xs text-gray-600">{followUp.notes}</p>
          </div>
        ))
      ) : (
        <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User size={16} className="text-gray-400" />
              <span className="ml-2 text-sm font-medium text-gray-900">
                No Upcoming Follow Ups
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span></span>
            <Clock size={14} className="ml-3 mr-1" />
            <span></span>
          </div>
          <p className="mt-2 text-xs text-gray-600"></p>
        </div>
      )}
    </div>
  );
};

export default UpcomingFollowUps;
