import { useQuery } from "@tanstack/react-query";
import { approvedEvents } from "@/api/utils";
import UpcomingEventsCard from "@/components/app/participant/UpcomingEventsCard";
import { Skeleton } from "@nextui-org/react";
export default function UpcomingEvents() {
    const { data, isSuccess } = useQuery({
        queryKey: ["approvedEvents"],
        queryFn: approvedEvents,
    });

    return (
        <div>
            <header className="flex items-center justify-between w-full mb-6">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Upcoming Event</p>
                    <p className="font-light text-md">
                        Check out upcoming events
                    </p>
                </div>
            </header>
            <body className="grid grid-cols-3 gap-4">
                {isSuccess ? (
                    data?.map((event) => (
                        <UpcomingEventsCard event={event} key={event.id} />
                    ))
                ) : (
                    <Skeleton className="rounded-lg h-[300px]" />
                )}
            </body>
        </div>
    );
}
