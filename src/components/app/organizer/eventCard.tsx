import DeleteEvent from "@/components/app/organizer/deleteEvent";
import EventImage from "@/assets/event.jpg";
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Button,
    Chip,
} from "@nextui-org/react";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Event } from "@/types";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import EditEvent from "@/components/app/organizer/EditEvent";
export default function EventCard({ event }: { event: Event }) {
    const imagePath: string = "http://localhost:8080" + event.imagePath;

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "MMM dd yyyy hh:mm a");
    };
    const startDate = formatDate(event.startTime);
    const endDate = formatDate(event.endTime);

    return (
        <Card className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            <Image
                isBlurred
                isZoomed
                alt="Card background"
                className="object-cover rounded-xl"
                src={imagePath}
                fallbackSrc={EventImage}
                heigth={600}
                width={600}
            />
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center gap-4">
                <div className="flex flex-row gap-2">
                    <h4 className="font-bold text-large">{event.name}</h4>
                    <Chip color="secondary" size="sm">
                        {event.status}
                    </Chip>
                </div>
                <p className="text-tiny uppercase font-bold">
                    {event.venueName}
                </p>
                <small className="text-default-500">
                    Start on: {startDate} <br />
                    until {endDate}
                </small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 items-start justify-center">
                <p className="text-default-500">{event.description}</p>
            </CardBody>
            <CardBody className="pb-0 pt-2 px-4 flex-col items-end justify-center gap-4">
                <Button
                    color="secondary"
                    variant="flat"
                    as={Link}
                    to={`/event/${event.id}`}
                    endContent={<IconEye />}
                >
                    View
                </Button>
                <EditEvent props={event} />
                <DeleteEvent props={event} />
            </CardBody>
        </Card>
    );
}
