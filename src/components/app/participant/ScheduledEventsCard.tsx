import {
    Card,
    CardHeader,
    CardBody,
    Link,
    Divider,
    Skeleton,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getScheduledEvents, getEventById } from "@/api/utils";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { ScheduledListCardList } from "@/components/app/participant/ScheduledListCardList";

type ScheduledListCardProps = {
    id: any;
    eventName: any;
    eventId: any;
    username: any;
    fullName: any;
    userId: any;
    status: any;
    registeredAt: any;
};

export default function ScheduledEventsCard() {
    const url = useLocation().pathname;

    const { data: scheduledEvents, isSuccess: isSuccessEvent } = useQuery({
        queryKey: ["scheduledEvents"],
        queryFn: getScheduledEvents,
    });
    console.log(scheduledEvents);

    return (
        <Skeleton className="rounded-lg" isLoaded={isSuccessEvent}>
            <Card className="min-h-[300px]">
                <CardHeader className="flex gap-3 justify-between">
                    <div className="flex flex-row gap-1">
                        <IconCalendarEvent />
                        <Link href={`${url}/scheduled-list`} color="primary">
                            <p className="text-lg">Scheduled Events</p>
                        </Link>
                    </div>
                    <p className="text-default-500">
                        {scheduledEvents?.length} Events
                    </p>
                </CardHeader>
                <Divider />
                <CardBody>
                    {scheduledEvents?.map((event) => (
                        <ScheduledListCardList key={event.id} event={event} />
                    ))}
                </CardBody>
            </Card>
        </Skeleton>
    );
}
