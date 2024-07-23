import AddEvent from "@/components/app/organizer/addEvent";
import EventCard from "@/components/app/organizer/eventCard";
import { useQuery } from "@tanstack/react-query";
import { getEventsByOrganizer } from "@/api/utils";
import { Event } from "@/types";
import useAuthStore from "@/provider/auth";
export default function EventRegistration() {
    const { user } = useAuthStore();
    const {
        isPending,
        isError,
        data: events,
        error,
    } = useQuery<Event[], Error>({
        queryKey: ["events", user?.userID],
        queryFn: () => getEventsByOrganizer(Number(user?.userID)),
    });
    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Dashboard</p>
                    <p className="text-md font-light">Manage your Events</p>
                </div>
                <AddEvent />
            </header>
            <body className="grid grid-cols-1 gap-4">
                <div className="col-span-1 flex flex-col gap-4">
                    {isPending && <p>Loading...</p>}
                    {isError && <p>Error: {error?.message}</p>}
                    {events?.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </body>
        </div>
    );
}
