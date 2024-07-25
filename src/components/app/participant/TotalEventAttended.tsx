import { IconCalendarWeek } from "@tabler/icons-react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
export default function TotalEventAttended() {
    return (
        <Card className="flex flex-col gap-4 p-10">
            <CardBody className="flex flex-row justify-between items-center self-center ">
                <div>
                    <p className="text-5xl font-bold text-warning-500">
                        0
                    </p>
                    <p className="text-2xl  text-primary-500">
                        Events Attended
                    </p>
                </div>
                <IconCalendarWeek size={50} className="text-primary-500" />
            </CardBody>
        </Card>
    );
}
