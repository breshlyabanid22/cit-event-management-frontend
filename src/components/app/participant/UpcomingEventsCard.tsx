import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Chip,
    Button,
    Link,
} from "@nextui-org/react";
import { Event } from "@/types";
import { IconEye, IconUserShare } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getEventRegistrationByEventandUser,
    userRegisterEvent,
    cancelRegistration,
} from "@/api/utils";
import useAuthStore from "@/provider/auth";
import toast, { Toaster } from "react-hot-toast";

export default function UpcomingEventsCard({ event }: { event: Event }) {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const {
        data: registration,
        isSuccess: isSuccessRegistration,
        isLoading,
        isError,
        refetch,
    } = useQuery<Event>({
        queryKey: ["eventRegistrationByEventandUser", event.id],
        queryFn: () =>
            getEventRegistrationByEventandUser({
                eventId: event.id,
                userId: user?.userID,
            }),
        enabled: !!user,
        retry: 0,
    });

    const registerEvent = async () => {
        try {
            await userRegisterEvent({
                eventId: Number(event.id),
                userId: user?.userID,
            });
            toast.success("Registration successful!");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Error registering for event!");
        }
    };

    const onPressCancel = async () => {
        try {
            await cancelRegistration(Number(registration?.id));
            toast.success("Registration cancelled!");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Error canceling registration!");
        }
    };

    const onPressAccepted = async () => {
        toast.success("Registration already accepted!");
    };

    const imagePath: string = "http://localhost:8080" + event.imagePath;
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
                    <h4 className="font-bold text-large">{event.name}</h4>
                    <small className="text-default-500">
                        {event.description}
                    </small>
                    <div className="flex flex-row gap-4 justify-center self-center items-center">
                        <Button
                            color="secondary"
                            variant="flat"
                            radius="full"
                            size="md"
                            as={Link}
                            href={`/event/${event.id}`}
                        >
                            View
                        </Button>
                        {isSuccessRegistration &&
                            registration?.status === "Pending" ? (
                            <Button
                                variant="flat"
                                color="danger"
                                radius="full"
                                startContent={<IconUserShare />}
                                onPress={onPressCancel}
                            >
                                Cancel
                            </Button>
                        ) : (
                            user?.username !== event?.organizer &&
                            user?.role !== "admin" &&
                            (registration?.status === "Accepted" ? (
                                <Button
                                    variant="flat"
                                    radius="full"
                                    color="success"
                                    startContent={<IconUserShare />}
                                    onPress={onPressAccepted}
                                >
                                    Accepted
                                </Button>
                            ) : (
                                <Button
                                    variant="flat"
                                    radius="full"
                                    color="warning"
                                    startContent={<IconUserShare />}
                                    onPress={registerEvent}
                                    className="text-white"
                                >
                                    Register
                                </Button>
                            ))
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
