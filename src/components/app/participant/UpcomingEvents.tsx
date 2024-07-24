import {
    Card,
    CardHeader,
    CardBody,
    Link,
    Divider,
    Skeleton,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { approvedEvents } from "@/api/utils";
import { Event } from "@/types";
import { IconCalendarEvent } from "@tabler/icons-react";
import { format, parseISO, isAfter } from "date-fns";
export default function UpcomingEvents() {
    const { data: events, isSuccess } = useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: approvedEvents,
    });

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "MMM dd yyyy hh:mm a");
    };

    const now = new Date();

    return (
        <Skeleton className="rounded-lg" isLoaded={isSuccess}>
            <Card className="min-h-[300px]">
                <CardHeader className="flex gap-3 justify-between">
                    <div className="flex flex-row gap-1">
                        <IconCalendarEvent />
                        <p className="text-lg">Upcoming Events</p>
                    </div>
                    <p className="text-default-500"> {events?.length} Events</p>
                </CardHeader>
                <Divider />
                <CardBody>
                    {events?.map((event) => {
                        const eventEndDate = parseISO(event.endTime);
                        if (isAfter(eventEndDate, now)) {
                            return (
                                <Link
                                    className="flex flex-row justify-between gap-4"
                                    key={event.id}
                                    href={`/event/${event.id}`}
                                >
                                    <p className="text-md">{event.name}</p>
                                    <p className="text-sm text-default-500">
                                        {formatDate(event.startTime)}
                                    </p>
                                </Link>
                            );
                        } else {
                            return null;
                        }
                    })}
                </CardBody>
            </Card>
        </Skeleton>
    );
}
