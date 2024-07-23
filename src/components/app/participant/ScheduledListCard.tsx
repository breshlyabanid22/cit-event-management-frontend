import { Card, CardBody, CardHeader, Button, Image } from "@nextui-org/react";
export default function ScheduledListCard() {
    return (
        <Card radius="lg" shadow="sm" className="gap-4 p-4 min-h-[200px]">
            <CardHeader>
                <h4 className="text-3xl">Event Name</h4>
            </CardHeader>
            <CardBody className="flex flex-row gap-2">
                Nothing to see here
            </CardBody>
        </Card>
    );
}
