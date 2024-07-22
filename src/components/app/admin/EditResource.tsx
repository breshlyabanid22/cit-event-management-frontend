import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    Switch,
    cn,
    useDisclosure,
} from "@nextui-org/react";
import { IconPackage } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";
import { editResource } from "@/api/utils";
import { Resource } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const resourceSchema = z.object({
    id: z.number().min(1, "Resource ID must be at least 1 characters long"),
    name: z.string().min(3, "Resource name must be at least 3 characters long"),
    description: z
        .string()
        .min(3, "Resource description must be at least 3 characters long"),
    type: z.string().min(3, "Resource type must be at least 3 characters long"),
    availability: z.boolean(),
});

export default function EditResource({ resource }: { resource: Resource }) {
    const queryClient = useQueryClient();
    const [availability, setAvailability] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof resourceSchema>>({
        resolver: zodResolver(resourceSchema),
        defaultValues: {
            id: resource.id,
            name: resource.name,
            description: resource.description,
            type: resource.type,
            availability: resource.availability,
        },
    });

    const submitEvent = async (
        resourceData: z.infer<typeof resourceSchema>,
    ) => {
        try {
            await editResource(resourceData);
            queryClient.invalidateQueries({ queryKey: ["resources"] });
            toast.success("Resource edited successfully");
            isOpen ? onOpenChange() : null;
        } catch (error) {
            toast.error("Error editing Resource:", error);
        }
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
                onPress={onOpen}
                variant="flat"
                color="warning"
            >
                Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <form
                    onSubmit={handleSubmit(submitEvent)}
                    encType="multipart/form-data"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Edit Resource
                                </ModalHeader>
                                <ModalBody>
                                    <form className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Controller
                                                name="availability"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        {...field}
                                                        isSelected={field.value}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        classNames={{
                                                            base: cn(
                                                                "inline-flex flex-row-reverse w-full max-w-3xl bg-content1 hover:bg-content2 items-center",
                                                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                                "data-[selected=true]:border-primary",
                                                            ),
                                                            wrapper:
                                                                "p-0 h-4 overflow-visible",
                                                            thumb: cn(
                                                                "w-6 h-6 border-2 shadow-lg",
                                                                "group-data-[hover=true]:border-primary",
                                                                "group-data-[selected=true]:ml-6",
                                                                "group-data-[pressed=true]:w-7",
                                                                "group-data-[selected]:group-data-[pressed]:ml-4",
                                                            ),
                                                        }}
                                                    >
                                                        <div className="flex flex-col gap-1 flex-grow">
                                                            <p className="text-medium">
                                                                Enable
                                                                Availability
                                                            </p>
                                                            <p className="text-tiny text-default-400">
                                                                Make resource
                                                                available to see
                                                            </p>
                                                        </div>
                                                    </Switch>
                                                )}
                                            />{" "}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="text"
                                                label="Resource Name"
                                                isClearable
                                                {...register("name")}
                                                errorMessage={
                                                    errors.name?.message
                                                }
                                                isInvalid={!!errors.name}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Textarea
                                                type="text"
                                                label="Resource Description"
                                                {...register("description")}
                                                errorMessage={
                                                    errors.description?.message
                                                }
                                                isInvalid={!!errors.description}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="text"
                                                label="Resource Type"
                                                isClearable
                                                {...register("type")}
                                                errorMessage={
                                                    errors.type?.message
                                                }
                                                isInvalid={!!errors.type}
                                            />
                                        </div>
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </div>
    );
}
