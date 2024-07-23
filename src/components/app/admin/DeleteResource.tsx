import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
    Button,
} from "@nextui-org/react";
import { deleteResource } from "@/api/utils";
import toast, { Toaster } from "react-hot-toast";
import { Resource } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteResource({ resource }: { resource: Resource }) {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitDelete = async (resourceID: number) => {
        await deleteResource(resourceID);
        queryClient.invalidateQueries({ queryKey: ["resources"] });
        toast.success("Resource deleted successfully");
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
                                Delete Venue
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this
                                    resource?
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
                                    onPress={() => submitDelete(resource.id)}
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
