import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
    Button,
} from "@nextui-org/react";
import { deleteEvent } from "@/api/utils";
import toast, { Toaster } from "react-hot-toast";
import { Event } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteEvent({ event }: { event: Event }) {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitDelete = async (eventID: number) => {
        await deleteEvent(eventID);
        queryClient.invalidateQueries({ queryKey: ["events"] });
        toast.success("Event deleted successfully");
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
                color="danger"
                onPress={onOpen}
            >
                Delete
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Delete Event
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this event?
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
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
