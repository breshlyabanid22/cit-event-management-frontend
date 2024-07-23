import {
    Card,
    CardBody,
    Image,
    CardFooter,
    Chip,
    Button,
    User,
} from "@nextui-org/react";
import { acceptUserRegistration, declineUserRegistration } from "@/api/utils";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageWaitlistCard({
    registration,
}: { registration: any }) {
    const queryClient = useQueryClient();
    const acceptRegistration = async () => {
        await acceptUserRegistration(registration.id);
        queryClient.invalidateQueries({
            queryKey: ["registrationsforOrganizer", registration.id],
        });
    };

    const declineRegistration = async () => {
        await declineUserRegistration(registration.id);
        queryClient.invalidateQueries({
            queryKey: ["registrationsforOrganizer", registration.id],
        });
    };

    return (
        <div>
            <Card
                shadow="sm"
                radius="lg"
                className="p-4 flex flex-row items-center justify-between "
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
