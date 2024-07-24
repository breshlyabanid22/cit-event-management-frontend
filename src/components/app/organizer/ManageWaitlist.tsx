import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Spinner,
    cn,
    useDisclosure,
} from "@nextui-org/react";
import ManageWaitlistCard from "@/components/app/organizer/ManageWaitlistCard";
import { getAllRegistrationsforOrganizer } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
export default function ManageWaitlist({ event }: { event: Event }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { isSuccess, data: registration } = useQuery<Event[], Error>({
        queryKey: ["registrationsforOrganizer", event?.id],
        queryFn: () => getAllRegistrationsforOrganizer(event?.id),
    });

    return (
        <div>
            <Button
                variant="solid"
                color="primary"
                className="w-full"
                size="sm"
                onPress={onOpen}
            >
                Manage Waitlist
            </Button>
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row gap-2">
                            Manage Waitlist for
                            <p className="text-secondary-500">{event.name}</p>
                        </ModalHeader>
                        <ModalBody className="min-h-[500px] overflow-y-auto">
                            {registration.status === "Pending" &&
                                registration?.map((registration) => (
                                    <ManageWaitlistCard
                                        key={registration.id}
                                        registration={registration}
                                    />
                                ))}
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
}
