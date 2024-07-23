import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event as TypeEvent } from "@/types";
import {
    getEventRegistrationByEventandUser,
    getEventById,
    userRegisterEvent,
} from "@/api/utils";
import { Skeleton, Card, CardBody, Button, Image } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    IconMapPin,
    IconClockHour3,
    IconPilcrow,
    IconTargetArrow,
    IconMessages,
    IconArrowLeft,
    IconUserShare,
} from "@tabler/icons-react";
import useAuthStore from "@/provider/auth";
export default function Event() {
    const { user } = useAuthStore();
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

    const { data: registration, isSuccess: isSuccessRegistration } =
        useQuery<TypeEvent>({
            queryKey: ["eventRegistrationByEventandUser", params.id],
            queryFn: () =>
                getEventRegistrationByEventandUser({
                    eventId: Number(params.id),
                    userId: user?.userID,
                }),
        });

    const registerEvent = async () => {
        await userRegisterEvent({
            eventId: Number(params.id),
            userId: user?.userID,
        });
        toast.success("Registration successful!");
    };

    const onPressPending = async () => {
        toast.error("Please wait for the event organizer to approve.");
    };

    const imagePath: string = "http://localhost:8080" + event?.imagePath;
    return (
        <div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: "",
                    duration: 5000,
                    style: {
                        background: "#800000",
                        color: "#fff",
                    },
                }}
            />
            <header className="mb-2 flex flex-row items-center justify-between">
                <Button
                    variant="flat"
                    color="primary"
                    onPress={goBack}
                    startContent={<IconArrowLeft />}
                >
                    Go Back{" "}
                </Button>
                {registration?.status !== "Pending" &&
                    user?.username !== event?.organizer &&
                    user?.role !== "admin" && (
                        <Button
                            variant="solid"
                            color="primary"
                            startContent={<IconUserShare />}
                            onPress={registerEvent}
                        >
                            Register
                        </Button>
                    )}

                {registration?.status === "Pending" && (
                    <Button
                        variant="solid"
                        color="primary"
                        startContent={<IconUserShare />}
                        onPress={onPressPending}
                    >
                        Pending
                    </Button>
                )}
            </header>
            <Card className="min-h-[800px] gap-4">
                <Skeleton className="rounded-lg" isLoaded={isSuccess}>
                    <body className="grid grid-cols-1 gap-4">
                        <Image
                            className="object-cover h-[400px]"
                            radius="none"
                            width="100%"
                            isBlurred
                            isZoomed
                            src={imagePath}
                            alt={event?.name}
                        />
                        <div className="col-span-1 grid grid-cols-4 gap-4 p-4">
                            <Card
                                radius="lg"
                                shadow="sm"
                                className="gap-4 p-4 min-h-[200px]"
                            >
                                <h4 className="text-3xl">{event?.name}</h4>
                                <p className="text-default-500 flex flex-row gap-2">
                                    <IconMapPin className="text-primary-500" />
                                    {event?.location}
                                </p>
                                <p className="text-default-500 flex flex-row gap-2">
                                    <IconClockHour3 className="text-primary-500" />
                                    {event?.startTime}
                                </p>
                            </Card>
                            <Card
                                radius="lg"
                                shadow="sm"
                                className="gap-4 p-4 min-h-[200px]"
                            >
                                <h4 className="text-xl flex flex-row gap-2">
                                    <IconPilcrow className="text-primary-500" />
                                    Description
                                </h4>
                                <p className="text-default-500 flex flex-row gap-2">
                                    {event?.description}
                                </p>
                            </Card>
                            <Card
                                radius="lg"
                                shadow="sm"
                                className="gap-4 p-4 min-h-[200px]"
                            >
                                <h4 className="text-xl flex flex-row gap-2">
                                    <IconTargetArrow className="text-primary-500" />
                                    Objectives
                                </h4>
                                <p className="text-default-500 flex flex-row gap-2">
                                    {event?.description}
                                </p>
                            </Card>
                            <Card
                                radius="lg"
                                shadow="sm"
                                className="gap-4 p-4 col-span-2 min-h-[200px]"
                            >
                                <h4 className="text-xl flex flex-row gap-2">
                                    <IconMessages className="text-primary-500" />
                                    Feedback Overview
                                </h4>
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
