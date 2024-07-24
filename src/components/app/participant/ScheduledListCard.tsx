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

export default function ScheduledListCard({
    event,
}: { event: ScheduledListCardProps }) {
    const { data: eventData, isSuccess } = useQuery({
        queryKey: ["eventById", event.eventId],
        queryFn: () => getEventById(event.eventId),
    });
    console.log(eventData);
    if (!eventData)
        return (
            <Skeleton isLoaded={isSuccess} className="rounded-lg h-[200px]" />
        );
    const imagePath: string = "http://localhost:8080" + eventData?.imagePath;
    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "MMM dd yyyy hh:mm a");
    };
    const startDate = formatDate(eventData?.startTime);
    const endDate = formatDate(eventData?.endTime);
    return (
        <Skeleton isLoaded={isSuccess} className="rounded-lg">
            <Card className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={imagePath}
                    fallbackSrc={imagePath}
                    width={600}
                />
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center gap-4">
                    <div className="flex flex-row gap-2">
                        <h4 className="font-bold text-large">
                            {eventData?.name}
                        </h4>
                    </div>
                    <p className="text-tiny uppercase font-bold">
                        {eventData?.venueName}
                    </p>
                    <small className="text-default-500">
                        Start on: {startDate} <br />
                        until {endDate}
                    </small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 items-start justify-center">
                    <p className="text-default-500">{eventData?.description}</p>
                </CardBody>
                <CardBody className="pb-0 pt-2 px-4 flex-col items-end justify-center gap-4">
                    <Button
                        color="secondary"
                        variant="flat"
                        as={Link}
                        href={`/event/${eventData?.id}`}
                        endContent={<IconEye />}
                    >
                        View
                    </Button>
                </CardBody>
            </Card>
        </Skeleton>
    );
}
