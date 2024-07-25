import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Image,
    Skeleton,
    Link,
    Chip,
} from "@nextui-org/react";
import { getEventById } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { IconEye, IconCancel } from "@tabler/icons-react";
import { cancelRegistration, getEventRegistrationByEventandUser } from "@/api/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuthStore from "@/provider/auth";
import { Toaster } from "react-hot-toast";
type ScheduledListCardProps = {
    id: number;
    eventName: string;
    eventId: number;
    username: string;
    fullName: string;
    userId: number;
    status: string;
    registeredAt: string;
};

export default function ScheduledListCard({
    event,
}: { event: ScheduledListCardProps }) {
    const { user } = useAuthStore();
    const queryClient = useQueryClient();
    const { data: eventData, isSuccess } = useQuery({
        queryKey: ["eventById", event.eventId],
        queryFn: () => getEventById(event.eventId),
    });


    const {
        data: registration,
        isSuccess: isSuccessRegistration,
        refetch,
    } = useQuery({
        queryKey: ["eventRegistrationByEventandUser", eventData?.id],
        queryFn: () =>
            getEventRegistrationByEventandUser({
                eventId: Number(eventData?.id),
                userId: user?.userID,
            }),
        enabled: !!user?.userID,
        retry: 0,
    });
    console.log(eventData);
    console.log(registration);
    const { mutate: cancelMutate } = useMutation({
        mutationFn: () => cancelRegistration(Number(registration?.id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scheduledEvents"] });
            queryClient.invalidateQueries({ queryKey: ["eventById", eventData?.id] });
            queryClient.invalidateQueries({ queryKey: ["eventRegistrationByEventandUser", eventData?.id] });
            queryClient.invalidateQueries({ queryKey: ["approvedEvents"] });
            refetch();
            toast.success("Registration cancelled!");
        },
    });

    if (!eventData && !isSuccess)
        return (
            <Skeleton isLoaded={isSuccess} className="rounded-lg h-[200px]" />
        );

    const imagePath: string = "http://localhost:8080" + eventData?.imagePath;
    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "MMM dd yyyy hh:mm a");
    };
    const startDate = formatDate(eventData?.startTime);
    const endDate = formatDate(eventData?.endTime);

    const onPressCancel = async () => {
        cancelMutate();
    };

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
            <Skeleton isLoaded={isSuccess} className="rounded-lg">
                <Card className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                    <Image
                        isBlurred
                        isZoomed
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={imagePath}
                        fallbackSrc={imagePath}
                        width={600}
                    />
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center gap-4">
                        <div className="flex flex-row gap-2">
                            <h4 className="font-bold text-large">
                                {eventData?.name}
                            </h4>
                        </div>
                        <p className="text-tiny uppercase font-bold">
                            {eventData?.venueName}
                        </p>
                        <small className="text-default-500">
                            Start on: {startDate} <br />
                            until {endDate}
                        </small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 items-start justify-center">
                        <p className="text-default-500">{eventData?.description}</p>
                    </CardBody>
                    <CardBody className="pb-0 pt-2 px-4 flex-col items-end justify-center gap-4">
                        <Button
                            color="secondary"
                            variant="flat"
                            as={Link}
                            href={`/event/${eventData?.id}`}
                            endContent={<IconEye />}
                        >
                            View
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
                            endContent={<IconCancel />}
                            onPress={onPressCancel}
                        >
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </Skeleton>
        </div>
    );
}
