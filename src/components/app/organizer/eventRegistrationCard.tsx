import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Chip,
  Button,
} from "@nextui-org/react";
export default function EventRegistrationCard() {
  return (
    <Card className="">
      <CardBody className="overflow-visible py-2 justify-end items-end">
        <Chip size="sm" color="warning" variant="light" className="mb-2">
          # of registered participants
        </Chip>
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
        <h4 className="font-bold text-large">Event Name</h4>
        <small className="text-default-500">Location</small>
      </CardFooter>
      <Button size="sm" color="primary" radius="lg">
        View Registration
      </Button>
    </Card>
  );
}
