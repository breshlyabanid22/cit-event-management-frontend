import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Chip,
    Button,
} from "@nextui-org/react";
export default function ResourceManagementCard() {
    return (
        <Card className="">
            <CardBody className="overflow-visible py-2 justify-end items-end">
                <div className="flex gap-2">
                    <Chip
                        size="sm"
                        color="secondary"
                        variant="bordered"
                        className="mb-2"
                    >
                        Venue Name
                    </Chip>
                    <Chip
                        size="sm"
                        color="warning"
                        variant="bordered"
                        className="mb-2"
                    >
                        # of capacity
                    </Chip>
                </div>
                <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                ></Image>
            </CardBody>
            <CardFooter className="px-4 py-2 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Availability</p>
                <h4 className="font-bold text-large">Amenities</h4>
                <small className="text-default-500">Location</small>
            </CardFooter>
            <div className="flex justify-center gap-4 mb-4">
                <Button size="sm" variant="flat" color="primary" radius="full">
                    View Details
                </Button>
                <Button size="sm" variant="flat" color="warning" radius="full">
                    Delete
                </Button>
            </div>
        </Card>
    );
}
