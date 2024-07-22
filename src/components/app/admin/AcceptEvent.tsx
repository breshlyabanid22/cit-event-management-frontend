import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
    Button,
} from "@nextui-org/react";
import { approveEvent } from "@/api/utils";
import toast, { Toaster } from "react-hot-toast";
import { Event } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export default function AcceptEvent({ event }: { event: Event }) {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitDelete = async (eventID: number) => {
        await approveEvent(eventID);
        queryClient.invalidateQueries({ queryKey: ["events"] });
        toast.success("Event accepted successfully");
        isOpen ? onOpenChange() : null;
    };

    return (
        <>
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
            <Button
                size="sm"
                radius="full"
                variant="flat"
                color="success"
                onPress={onOpen}
            >
                Approve
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Approve Event
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to approve this event?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    color="danger"
                                    onPress={() => submitDelete(event.id)}
                                >
                                    Approve
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
