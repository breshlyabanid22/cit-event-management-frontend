import EventRegistrationCard from "@/components/app/organizer/eventRegistrationCard";
import ManageWaitlist from "@/components/app/organizer/ManageWaitlist";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/api/utils";
import { Event } from "@/types";
import { Skeleton } from "@nextui-org/react";
export default function EventRegistration() {
    const { isPending, isError, data, error } = useQuery<Event[], Error>({
        queryKey: ["events"],
        queryFn: getAllEvents,
    });

    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Event Registration</p>
                    <p className="text-md font-light">
                        Manage your participants
                    </p>
                </div>
                <ManageWaitlist />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isPending ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-center text-default-400">
                            <Skeleton className="w-full h-full" />
                        </p>
                    </div>
                ) : data?.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-center text-default-400">
                            No events found
                        </p>
                    </div>
                ) : (
                    data?.map((event: Event) => (
                        <EventRegistrationCard event={event} key={event.id} />
                    ))
                )}
            </div>
        </div>
    );
}
