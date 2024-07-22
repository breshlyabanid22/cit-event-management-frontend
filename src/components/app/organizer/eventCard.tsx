import DeleteEvent from "@/components/app/organizer/deleteEvent";
import EventImage from "@/assets/event.jpg";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Event } from "@/types";
export default function EventCard({ event }: { event: Event }) {
    return (
        <Card className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            <Image
                isBlurred
                isZoomed
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fallbackSrc={EventImage}
                width={600}
            />
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center gap-4">
                <h4 className="font-bold text-large">{event.name}</h4>
                <p className="text-tiny uppercase font-bold">
                    {event.location}
                </p>
                <small className="text-default-500">
                    {event.startTime} - {event.endTime}
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
