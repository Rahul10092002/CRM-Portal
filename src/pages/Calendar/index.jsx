import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  CalendarIcon,
  Clock,
  Phone,
  MapPin,
  Users,
  Mail,
  User,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // "day", "week", "month"

  // Generate days for the month view
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, date: null });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        date: new Date(year, month, day),
        events: getEventsForDay(new Date(year, month, day)),
      });
    }

    return days;
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Follow-up Call: John Smith",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        10,
        10,
        30
      ),
      type: "call",
      leadName: "John Smith",
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Site Visit: Parkview Residences",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        15,
        11,
        0
      ),
      type: "visit",
      leadName: "Sarah Johnson",
      status: "Confirmed",
    },
    {
      id: 3,
      title: "Contract Signing: Michael Brown",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        20,
        14,
        0
      ),
      type: "meeting",
      leadName: "Michael Brown",
      status: "Scheduled",
    },
    {
      id: 4,
      title: "Email Follow-up: Emily Davis",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        9,
        0
      ),
      type: "email",
      leadName: "Emily Davis",
      status: "Pending",
    },
    {
      id: 5,
      title: "Presentation: Skyline Towers",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
        13,
        30
      ),
      type: "meeting",
      leadName: "Robert Wilson",
      status: "Scheduled",
    },
  ];

  const getEventsForDay = (date) => {
    return mockEvents.filter(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
  };

  const getEventsForToday = () => {
    const today = new Date();
    return getEventsForDay(today);
  };

  const getEventsForWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const events = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      events.push({
        date,
        events: getEventsForDay(date),
      });
    }
    return events;
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getEventTypeBadge = (type) => {
    const variants = {
      call: "primary",
      email: "info",
      visit: "warning",
      meeting: "success",
    };

    return <Badge variant={variants[type] || "default"}>{type}</Badge>;
  };

  const getEventStatusBadge = (status) => {
    const variants = {
      Scheduled: "primary",
      Confirmed: "success",
      Pending: "warning",
      Completed: "info",
      Cancelled: "danger",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <Button icon={Plus}>Add Event</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              onClick={goToPreviousMonth}
              className="mr-2"
            />
            <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>
            <Button
              variant="outline"
              size="sm"
              icon={ChevronRight}
              onClick={goToNextMonth}
              className="ml-2"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <div className="flex border rounded-md">
              <button
                className={`px-3 py-1 text-sm ${
                  viewMode === "day"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setViewMode("day")}
              >
                Day
              </button>
              <button
                className={`px-3 py-1 text-sm ${
                  viewMode === "week"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setViewMode("week")}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 text-sm ${
                  viewMode === "month"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() => setViewMode("month")}
              >
                Month
              </button>
            </div>
            <Button variant="outline" icon={Filter} size="sm">
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "month" && (
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center py-2 text-sm font-medium text-gray-700"
                >
                  {day}
                </div>
              ))}

              {generateCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] border p-1 ${
                    day.date && isToday(day.date)
                      ? "bg-blue-50 border-blue-300"
                      : "border-gray-200"
                  } ${!day.day ? "bg-gray-50" : ""}`}
                >
                  {day.day && (
                    <>
                      <div className="text-right text-sm text-gray-500">
                        {day.day}
                      </div>
                      <div className="space-y-1 mt-1">
                        {day.events &&
                          day.events.map((event) => (
                            <div
                              key={event.id}
                              className="px-1 py-0.5 text-xs bg-blue-100 text-blue-700 rounded truncate cursor-pointer"
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {viewMode === "week" && (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day, index) => {
                  const weekEvents = getEventsForWeek();
                  const dateObj = weekEvents[index].date;
                  return (
                    <div key={day} className="text-center">
                      <div className="py-2 text-sm font-medium text-gray-700">
                        {day}
                      </div>
                      <div
                        className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto ${
                          isToday(dateObj) ? "bg-blue-500 text-white" : ""
                        }`}
                      >
                        {dateObj.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border rounded-md divide-y">
                {Array.from({ length: 12 }).map((_, hourIndex) => {
                  const hour = 8 + hourIndex; // Start at 8 AM
                  return (
                    <div
                      key={hourIndex}
                      className="grid grid-cols-7 min-h-[80px]"
                    >
                      <div className="col-span-7 relative border-b">
                        <div className="absolute -top-3 -left-10 text-xs text-gray-500">
                          {hour % 12 === 0 ? 12 : hour % 12}
                          {hour < 12 ? " AM" : " PM"}
                        </div>
                        {mockEvents
                          .filter((event) => event.date.getHours() === hour)
                          .map((event) => {
                            const dayOffset = event.date.getDay();
                            return (
                              <div
                                key={event.id}
                                className="absolute top-0 h-full bg-blue-100 border border-blue-300 rounded text-xs p-1 overflow-hidden"
                                style={{
                                  left: `${(dayOffset / 7) * 100}%`,
                                  width: `${100 / 7}%`,
                                }}
                              >
                                <div className="font-medium text-blue-700">
                                  {event.title}
                                </div>
                                <div className="text-gray-500">
                                  {event.date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === "day" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="py-2 text-lg font-medium">
                  {new Date().toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="border rounded-md divide-y">
                {Array.from({ length: 12 }).map((_, hourIndex) => {
                  const hour = 8 + hourIndex; // Start at 8 AM
                  const hourEvents = mockEvents.filter(
                    (event) => event.date.getHours() === hour
                  );

                  return (
                    <div
                      key={hourIndex}
                      className="flex py-4 px-2 relative min-h-[80px]"
                    >
                      <div className="absolute -top-3 left-2 text-xs text-gray-500">
                        {hour % 12 === 0 ? 12 : hour % 12}
                        {hour < 12 ? " AM" : " PM"}
                      </div>
                      <div className="w-full pl-10">
                        {hourEvents.map((event) => (
                          <div
                            key={event.id}
                            className="mb-2 bg-blue-100 border border-blue-300 rounded p-2"
                          >
                            <div className="flex justify-between items-start">
                              <div className="font-medium text-blue-700">
                                {event.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {event.date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-600">
                              <span className="mr-2">{event.leadName}</span>
                              {getEventTypeBadge(event.type)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div
                    className={`p-2 rounded-full mr-4 ${
                      event.type === "call"
                        ? "bg-blue-100 text-blue-600"
                        : event.type === "visit"
                        ? "bg-yellow-100 text-yellow-600"
                        : event.type === "meeting"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {event.type === "call" && <Phone size={20} />}
                    {event.type === "visit" && <MapPin size={20} />}
                    {event.type === "meeting" && <Users size={20} />}
                    {event.type === "email" && <Mail size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">
                        {event.title}
                      </h3>
                      <div className="flex space-x-2">
                        {getEventStatusBadge(event.status)}
                        {getEventTypeBadge(event.type)}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>{event.date.toLocaleDateString()}</span>
                      <Clock size={14} className="ml-3 mr-1" />
                      <span>
                        {event.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <User size={14} className="inline mr-1" />
                      <span>{event.leadName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getEventsForToday().length > 0 ? (
                getEventsForToday().map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-2 border-l-4 border-blue-500 bg-blue-50 rounded-md"
                  >
                    <div className="ml-2">
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock size={12} className="mr-1" />
                        {event.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon
                    size={48}
                    className="text-gray-300 mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-500">
                    No events scheduled for today
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Button icon={Plus} className="w-full">
                Add Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
