import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event as TypeEvent } from "@/types";
import { getEventById } from "@/api/utils";
import { Skeleton, Card, CardBody, Button, Image } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { IconMapPin, IconClockHour3, IconPilcrow, IconTargetArrow, IconMessages } from "@tabler/icons-react";
export default function Event() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const params = useParams();

    const goBack = () => {
        navigate(-1);
    };

    const { data: event, isSuccess } = useQuery<TypeEvent>({
        queryKey: ["eventById", params.id],
        queryFn: () => getEventById(Number(params.id)),
    });

    const imagePath: string = "http://localhost:8080" + event?.imagePath;
    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-row gap-4">
                    <Button variant="bordered" color="primary" onPress={goBack}> Go Back </Button>
                </div>
            </header>
            <Card className="min-h-[800px] gap-4">
                <Skeleton className="rounded-lg" isLoaded={isSuccess}>
                    <body className="grid grid-cols-1 gap-4">
                        <Image src={imagePath} alt={event?.name} width={300} height={300} />
                        <div className="col-span-1 grid grid-cols-3 gap-4 p-4">
                            <Card radius="lg" shadow="sm" className="gap-4 p-4 min-h-[200px]">
                                <h4 className="text-3xl">{event?.name}</h4>
                                <p className="text-default-500 flex flex-row gap-2"><IconMapPin className="text-primary-500" />{event?.location}</p>
                                <p className="text-default-500 flex flex-row gap-2"><IconClockHour3 className="text-primary-500" />{event?.startTime}</p>
                            </Card>
                            <Card radius="lg" shadow="sm" className="gap-4 p-4 min-h-[200px]">
                                <h4 className="text-xl flex flex-row gap-2"><IconPilcrow className="text-primary-500" />Description</h4>
                                <p className="text-default-500 flex flex-row gap-2">{event?.description}</p>
                            </Card>
                            <Card radius="lg" shadow="sm" className="gap-4 p-4 min-h-[200px]">
                                <h4 className="text-xl flex flex-row gap-2"><IconTargetArrow className="text-primary-500" />Objectives</h4>
                                <p className="text-default-500 flex flex-row gap-2">{event?.description}</p>
                            </Card>
                            <Card radius="lg" shadow="sm" className="gap-4 p-4 col-span-2 min-h-[200px]">
                                <h4 className="text-xl flex flex-row gap-2"><IconMessages className="text-primary-500" />Feedback Overview</h4>
                                <CardBody className="flex flex-row gap-2">
                                    Nothing to see here
                                </CardBody>
                            </Card>
                        </div>
                    </body>
                </Skeleton>
            </Card>
        </div>
    );
}
