import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Image,
    Skeleton,
    Link,
    Chip,
} from "@nextui-org/react";
import { getEventById } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { IconEye } from "@tabler/icons-react";
type ScheduledListCardProps = {
    id: number;
    eventName: string;
    eventId: number;
    username: string;
    fullName: string;
    userId: number;
    status: string;
    registeredAt: string;
};

export const ScheduledListCardList = ({ event }) => {
    const { data: eventData, isSuccess } = useQuery({
        queryKey: ["eventById", event.eventId],
        queryFn: () => getEventById(event.eventId),
    });
    if (!eventData)
        return (
            <Skeleton isLoaded={isSuccess} className="rounded-lg h-[200px]" />
        );

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "MMM dd yyyy hh:mm a");
    };

    const startDate = formatDate(eventData?.startTime);
    const endDate = formatDate(eventData?.endTime);

    return (
        <Link
            className="flex flex-row justify-between gap-4"
            color="warning"
            href={`/event/${eventData.id}`}
        >
            <p className="text-md">{eventData.name}</p>
            <p className="text-sm text-default-500"> {startDate} </p>
        </Link>
    );
};
