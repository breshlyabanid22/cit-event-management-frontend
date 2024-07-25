import { IconCalendarFilled } from "@tabler/icons-react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getScheduledEvents } from "@/api/utils";
export default function TotalEvents() {
    const { data, isLoading } = useQuery({
        queryKey: ["scheduledEvents"],
        queryFn: getScheduledEvents,
        notifyOnChangeProps: [],
    });

    return (
        <Card className="flex flex-col gap-4 p-10">
            <CardBody className="flex flex-row justify-between items-center self-center">
                <div>
                    <p className="text-5xl font-bold text-warning-500">
                        {isLoading ? "0" : data?.length}
                    </p>
                    <p className="text-2xl  text-primary-500">
                        Total Events Registration
                    </p>
                </div>
                <IconCalendarFilled size={50} className="text-primary-500" />
            </CardBody>
        </Card>
    );
}
