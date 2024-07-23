import { Card, CardHeader, CardBody, Link, Divider, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { approvedEvents } from "@/api/utils";
import { Event } from "@/types";
import { IconCalendarEvent } from "@tabler/icons-react";

export default function OngoingEvents() {
    const { data: events, isSuccess } = useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: approvedEvents,
    });

    return (
        <Skeleton className="rounded-lg" isLoaded={isSuccess}>
            <Card className="min-h-[300px]">
                <CardHeader className="flex gap-3 justify-between">
                    <div className="flex flex-row gap-1">
                        <IconCalendarEvent />
                        <p className="text-lg">Ongoing Events</p>
                    </div>
                    <p className="text-default-500"> {events?.length} Events</p>
                </CardHeader>
                <Divider />
                <CardBody>
                    {events?.map((event) => (
                        <Link key={event.id} href={`/event/${event.id}`}>
                            <p className="text-md">{event.name}</p>
                        </Link>
                    ))}
                </CardBody>
            </Card>
        </Skeleton>
    );
}
