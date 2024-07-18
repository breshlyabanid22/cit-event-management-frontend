import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
    Button,
} from "@nextui-org/react";
import { activateUser } from "@/api/utils";
import toast, { Toaster } from "react-hot-toast";
import { TypeUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export default function ActivateUser({ user }: { user: TypeUser }) {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitAcivate = async (userID: number) => {
        await activateUser(userID);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User acivated successfully");
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
                Activate
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Activate User
                            </ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to activate this</p>
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
                                    onPress={() => submitAcivate(user.userID)}
                                >
                                    Activate
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
