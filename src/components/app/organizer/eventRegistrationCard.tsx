import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Chip,
    Button,
} from "@nextui-org/react";
import { Event } from "@/types";
import ManageWaitlist from "@/components/app/organizer/ManageWaitlist";
export default function EventRegistrationCard({ event }: { event: Event }) {
    const imagePath: string = "http://localhost:8080" + event.imagePath;
    return (
        <Card>
            <CardBody className="items-end justify-end py-2 overflow-visible">
                <Chip
                    size="sm"
                    color="warning"
                    variant="light"
                    className="mb-2"
                >
                    # of registered participants
                </Chip>
                <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="object-cover h-[300px]"
                    radius="lg"
                    width="100%"
                    src={imagePath}
                ></Image>
            </CardBody>
            <CardFooter className="flex-col items-start px-4 py-2">
                {/* <p className="font-bold uppercase text-tiny">{event.status}</p> */}
                <h4 className="font-bold text-large">{event.name}</h4>
                <small className="text-default-500">{event.description}</small>
            </CardFooter>
            <ManageWaitlist event={event} />
        </Card>
    );
}
