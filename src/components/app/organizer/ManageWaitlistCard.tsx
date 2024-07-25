import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Chip,
    Button,
    User,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { acceptUserRegistration, declineUserRegistration } from "@/api/utils";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageWaitlistCard({
    registration, event }) {
    const queryClient = useQueryClient();
    const acceptRegistration = async () => {
        await acceptUserRegistration(registration.id);
        toast.success("Added to participant list");
        queryClient.invalidateQueries({
            queryKey: ["registrationsforOrganizer", event.id],
        });
    };

    const declineRegistration = async () => {
        await declineUserRegistration(registration.id);
        toast.success("Removed from participant list")
        queryClient.invalidateQueries({
            queryKey: ["registrationsforOrganizer", event.id],
        });
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
                    className: "text-sm",
                    duration: 5000,
                    style: {
                        background: "#800000",
                        color: "#fff",
                    },
                }}
            />
            <Card
                shadow="sm"
                radius="lg"
                className="flex flex-row items-center justify-between p-4 "
            >
                <User
                    name={registration.fullName}
                    description={registration.username}
                ></User>
                <div className="flex gap-2 w-min">
                    <div className="flex gap-2">
                        <Button
                            color="success"
                            variant="flat"
                            radius="full"
                            onPress={acceptRegistration}
                        >
                            Accept
                        </Button>
                        <Button
                            color="danger"
                            variant="flat"
                            radius="full"
                            onPress={declineRegistration}
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
