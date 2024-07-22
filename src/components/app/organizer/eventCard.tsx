import DeleteEvent from "@/components/app/organizer/deleteEvent";
import EventImage from "@/assets/event.jpg";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Event } from "@/types";
import { format, parseISO } from 'date-fns';
export default function EventCard({ event }: { event: Event }) {    
    const imagePath: string = "http://localhost:8080";

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'MMM dd yyyy hh:mm a');
      };
      const startDate = formatDate(event.startTime);
      const endDate = formatDate(event.endTime);
      console.log("Formatted: ", startDate);
    return (
        <Card className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            <Image
                isBlurred
                isZoomed
                alt="Card background"
                className="object-cover rounded-xl"
                src={imagePath + event.imagePath}
                fallbackSrc={EventImage}
                width={600}
            />
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center gap-4">
                <h4 className="font-bold text-large">{event.name}</h4>
                <p className="text-tiny uppercase font-bold">
                    {event.venueName}
                </p>
                <small className="text-default-500">
                    Start on: {startDate} <br/>
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
                    endContent={<IconEye />}
                >
                    View
                </Button>
                <Button
                    color="warning"
                    variant="flat"
                    endContent={<IconEdit />}
                >
                    Edit
                </Button>
                <DeleteEvent />
            </CardBody>
        </Card>
    );
}
