import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Event as TypeEvent, TypeUser } from "@/types";
import {
    getEventRegistrationByEventandUser,
    getEventById,
    userRegisterEvent,
    getUserByUsername,
    cancelRegistration,
} from "@/api/utils";
import {
    Skeleton,
    Card,
    CardBody,
    Button,
    Image,
    CardHeader,
    User,
} from "@nextui-org/react";
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
    IconUser,
    IconMail,
    IconCalendar,
    IconUserPin,
} from "@tabler/icons-react";
import useAuthStore from "@/provider/auth";
import { format, parseISO } from "date-fns";
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

    const {
        data: registration,
        isSuccess: isSuccessRegistration,
        refetch,
    } = useQuery<TypeEvent>({
        queryKey: ["eventRegistrationByEventandUser", params.id],
        queryFn: () =>
            getEventRegistrationByEventandUser({
                eventId: Number(params.id),
                userId: user?.userID,
            }),
        enabled: !!user,
        retry: 0,
    });

    const { mutate: registerMutate } = useMutation({
        mutationFn: () =>
            userRegisterEvent({
                eventId: Number(params.id),
                userId: user?.userID,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["approvedEvents"] });
            queryClient.invalidateQueries({ queryKey: ["scheduledEvents"] });
            refetch();
            toast.success("Registration successful!");
        },
    });

    const { mutate: cancelMutate } = useMutation({
        mutationFn: () => cancelRegistration(Number(registration?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["approvedEvents"] });
            queryClient.invalidateQueries({ queryKey: ["scheduledEvents"] });
            refetch();
            toast.success("Registration cancelled!");
        },
    });

    const registerEvent = async () => {
        registerMutate();
    };

    const onPressCancel = async () => {
        cancelMutate();
    };

    const onPressAccepted = async () => {
        toast.success("Registration already accepted!");
    };

    const { data: userByUsername } = useQuery<TypeUser>({
        queryKey: ["userByUsername", event?.organizer],
        queryFn: () => getUserByUsername(event?.organizer),
    });

    const userFullName: string =
        userByUsername?.firstName + " " + userByUsername?.lastName;
    const userImagePath: string =
        "http://localhost:8080" + userByUsername?.imagePath;
    const imagePath: string = "http://localhost:8080" + event?.imagePath;

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "MMM dd yyyy hh:mm a");
    };

    if (!event) return <></>;
    const startDate = formatDate(event?.startTime);
    const endDate = formatDate(event?.endTime);
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
                {isSuccessRegistration && registration?.status === "Pending" ? (
                    <Button
                        variant="solid"
                        color="danger"
                        startContent={<IconUserShare />}
                        onPress={onPressCancel}
                    >
                        Cancel
                    </Button>
                ) : (
                    user?.username !== event?.organizer &&
                    user?.role !== "ADMIN" &&
                    (registration?.status === "Accepted" ? (
                        <Button
                            variant="solid"
                            color="success"
                            onPress={onPressAccepted}
                        >
                            Accepted
                        </Button>
                    ) : (
                        <Button
                            variant="solid"
                            color="warning"
                            startContent={<IconUserShare />}
                            onPress={registerEvent}
                            className="text-white"
                        >
                            Register
                        </Button>
                    ))
                )}
            </header>
            <Card className="min-h-[1000px] gap-4">
                <Skeleton className="rounded-lg" isLoaded={isSuccess}>
                    <Image
                        className="object-cover h-[400px]"
                        radius="lg"
                        width="100%"
                        isZoomed
                        src={imagePath}
                        alt={event?.name}
                    />
                    <body className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card
                            radius="lg"
                            shadow="none"
                            className="gap-4 p-4 min-h-[200px]"
                        >
                            <CardHeader className="text-2xl flex flex-row gap-2 items-center">
                                <IconUserPin className="text-primary-500" />
                                Event Organizer
                            </CardHeader>
                            <CardBody className="flex flex-col gap-2">
                                <User
                                    className="self-start"
                                    avatarProps={{
                                        src: userImagePath,
                                        fallback: <IconUserPin />,
                                    }}
                                    name={userFullName}
                                    description={userByUsername?.username}
                                />
                                <div className="flex flex-row gap-2 mt-4">
                                    <IconMail className="text-primary-500" />
                                    <a
                                        href={`mailto:${userByUsername?.email}`}
                                        className="text-warning-500 text-sm"
                                    >
                                        {userByUsername?.email}
                                    </a>
                                </div>
                            </CardBody>
                        </Card>
                        <Card
                            radius="lg"
                            shadow="none"
                            className="gap-4 p-4 min-h-[200px]"
                        >
                            <CardHeader className="text-2xl flex flex-row gap-2 items-center">
                                <IconCalendar className="text-primary-500" />
                                {event?.name}
                            </CardHeader>
                            <CardBody className="text-default-500 flex flex-row gap-2">
                                <IconMapPin className="text-primary-500" />
                                {event?.location}
                            </CardBody>
                            <CardBody className="text-default-500 flex flex-row gap-2">
                                <IconClockHour3 className="text-primary-500" />
                                {startDate} - {endDate}
                            </CardBody>
                        </Card>
                        <Card
                            radius="lg"
                            shadow="none"
                            className="gap-4 p-4 min-h-[200px]"
                        >
                            <CardHeader className="text-xl flex flex-row gap-2">
                                <IconPilcrow className="text-primary-500" />
                                Description
                            </CardHeader>
                            <CardBody className="text-default-500 flex flex-row gap-2">
                                {event?.description}
                            </CardBody>
                        </Card>
                        <Card
                            radius="lg"
                            shadow="none"
                            className="gap-4 p-4 min-h-[200px]"
                        >
                            <CardHeader className="text-xl flex flex-row gap-2">
                                <IconTargetArrow className="text-primary-500" />
                                Objectives
                            </CardHeader>
                            <CardBody className="text-default-500 flex flex-row gap-2">
                                {event?.description}
                            </CardBody>
                        </Card>
                        <Card
                            radius="lg"
                            shadow="md"
                            className="gap-4 p-4 m-4 col-span-4 min-h-[400px] overflow-y-auto"
                        >
                            <CardHeader className="text-xl flex flex-row gap-2">
                                <IconMessages className="text-primary-500" />
                                Feedback Overview
                            </CardHeader>
                            <CardBody className="flex flex-row gap-2">
                                Nothing to see here
                            </CardBody>
                        </Card>
                    </body>
                </Skeleton>
            </Card>
        </div>
    );
}
