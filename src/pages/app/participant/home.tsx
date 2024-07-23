import { useQuery } from "@tanstack/react-query";
import { approvedEvents } from "@/api/utils";
import { Event } from "@/types";
import UpcomingEvents from "@/components/app/participant/UpcomingEvents";
import CalendarComponent from "@/components/app/participant/Calendar";
export default function ParticipantHome() {
    useQuery({
        queryKey: ["events"],
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
            </body>
        </div>
    );
}
