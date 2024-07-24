import { useQuery } from "@tanstack/react-query";
import { approvedEvents } from "@/api/utils";
export default function UpcomingEvents() {
    const { data, isLoading } = useQuery({
        queryKey: ["upcomingEvents"],
        queryFn: approvedEvents,
    });

    console.log(data);
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
            <body className="grid grid-cols-1 gap-4">
                <div className="flex flex-col col-span-1 gap-4"></div>
            </body>
        </div>
    );
}
