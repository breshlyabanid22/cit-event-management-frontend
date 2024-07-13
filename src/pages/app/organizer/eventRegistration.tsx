import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Chip,
  Button,
} from "@nextui-org/react";

export default function EventRegistration() {
  return (
    <div>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Event Registration</p>
          <p className="text-md font-light">Manage your participants</p>
        </div>
        <Button size="md" color="primary" radius="lg">
          Manage Waitlist
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="">
          <CardBody className="overflow-visible py-2 justify-end items-end">
            <Chip size="sm" color="warning" variant="light" className="mb-2">
              # of registered participants
            </Chip>
            <Image
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
      </div>
    </div>
  );
}
