import ScheduledListCard from "@/components/app/participant/ScheduledListCard";
import { getScheduledEvents } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
export default function ScheduledList() {
    const { data: scheduledEvents } = useQuery({
        queryKey: ["scheduledEvents"],
        queryFn: () => getScheduledEvents(),
    });

    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Scheduled List</p>
                    <p className="text-md font-light">
                        Your list of scheduled events
                    </p>
                </div>
            </header>
            <body className="grid grid-cols-1 gap-4">
                <div className="col-span-1 flex flex-col gap-4">
                    {scheduledEvents?.map((event) => (
                        <ScheduledListCard key={event.id} event={event} />
                    ))}
                </div>
            </body>
        </div>
    );
}
