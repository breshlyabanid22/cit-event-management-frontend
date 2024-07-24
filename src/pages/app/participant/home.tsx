import { useQuery } from "@tanstack/react-query";
import { approvedEvents, getScheduledEvents } from "@/api/utils";
import UpcomingEvents from "@/components/app/participant/UpcomingEvents";
import CalendarComponent from "@/components/app/participant/Calendar";
import ScheduledEventsCard from "@/components/app/participant/ScheduledEventsCard";
export default function ParticipantHome() {
    useQuery({
        queryKey: ["approvedEvents"],
        queryFn: approvedEvents,
        notifyOnChangeProps: [],
    });

    return (
        <div>
            <header className="flex items-center justify-between w-full mb-6">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Dashboard</p>
                    <p className="font-light text-md">
                        Take a look at the events
                    </p>
                </div>
            </header>
            <body className="grid grid-cols-3 gap-4">
                <UpcomingEvents />
                <CalendarComponent />
                <ScheduledEventsCard />
            </body>
        </div>
    );
}
