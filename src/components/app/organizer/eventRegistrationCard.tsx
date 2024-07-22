import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Chip,
    Button,
} from "@nextui-org/react";
import { Event } from "@/types";
export default function EventRegistrationCard({ event }: { event: Event }) {
    const imagePath: string = "http://localhost:8080" + event.imagePath;
    return (
        <Card className="">
            <CardBody className="overflow-visible py-2 justify-end items-end">
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
                    className="object-cover rounded-xl"
                    src={imagePath}
                ></Image>
            </CardBody>
            <CardFooter className="px-4 py-2 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                    {event.status}
                </p>
                <h4 className="font-bold text-large">{event.name}</h4>
                <small className="text-default-500">{event.description}</small>
            </CardFooter>
            <Button size="sm" color="primary" radius="lg">
                View Registration
            </Button>
        </Card>
    );
}
