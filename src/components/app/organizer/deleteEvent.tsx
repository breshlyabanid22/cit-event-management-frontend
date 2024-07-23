import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { IconTrash } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";
import { deleteEvent } from "@/api/utils";
import { useQueryClient } from "@tanstack/react-query";
export default function DeleteEvent({ props }: { props: Event }) {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitDelete = async () => {
        await deleteEvent(props.id);
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
                    className: "text-sm",
                    duration: 5000,
                    style: {
                        background: "#800000",
                        color: "#fff",
                    },
                }}
            />
            <Button onPress={onOpen} color="danger" variant="flat">
                Delete
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
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
                                <Button color="primary" onPress={submitDelete}>
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
