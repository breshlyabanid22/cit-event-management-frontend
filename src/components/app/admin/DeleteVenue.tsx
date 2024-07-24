import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
    Button,
} from "@nextui-org/react";
import { deleteVenue } from "@/api/utils";
import toast, { Toaster } from "react-hot-toast";
import { Venue } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteVenue({ venue }: { venue: Venue }) {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitDelete = async (venueID: number) => {
        try{
        await deleteVenue(venue.id);
        queryClient.invalidateQueries({ queryKey: ["venues"] });
        toast.success("Venue deleted successfully");
        }catch(error){
            const message: string = "The venue is currently in used.";
            toast.error(message);
        }
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
                                Delete Venue
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this venue?
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
                                    onPress={() => submitDelete(venue.id)}
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
