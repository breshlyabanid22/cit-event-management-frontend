import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { IconHomePlus } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";
import { addVenue } from "@/api/utils";
import { zodResolver } from "@hookform/resolvers/zod";

const venueSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only .jpg, .png and .webp formats are supported.",
        ),
    name: z.string().min(3, "Event name must be at least 3 characters long"),
    location: z
        .string()
        .min(3, "Event location must be at least 3 characters long"),
    maxCapacity: z.number().min(1, "Capacity must be at least 1 people"),
});

export default function AddVenue() {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof venueSchema>>({
        resolver: zodResolver(venueSchema),
    });

    const submitEvent = async (data: z.infer<typeof venueSchema>) => {
        console.log(data);
        addVenue(data);
    };
    return (
        <div>
            <Button
                onPress={onOpen}
                color="primary"
                startContent={<IconHomePlus />}
            >
                Add Venue
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <form onSubmit={handleSubmit(submitEvent)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add Venue
                                </ModalHeader>
                                <ModalBody>
                                    <form className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Controller
                                                name="image"
                                                control={control}
                                                render={({
                                                    field: {
                                                        onChange,
                                                        value,
                                                        ref,
                                                        ...restField
                                                    },
                                                }) => (
                                                    <input
                                                        type="file"
                                                        accept=".jpg,.png,.webp"
                                                        className="hidden"
                                                        ref={fileInputRef}
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            if (file) {
                                                                onChange(file);
                                                                setFileName(
                                                                    file.name,
                                                                );
                                                            }
                                                        }}
                                                        {...restField}
                                                    />
                                                )}
                                            />
                                            <Button
                                                color="default"
                                                variant="flat"
                                                onPress={() =>
                                                    fileInputRef.current?.click()
                                                }
                                            >
                                                Choose Image
                                            </Button>
                                            {fileName && (
                                                <p className="text-warning-500">
                                                    {" "}
                                                    Selected file: {fileName}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="text"
                                                label="Venue Name"
                                                isClearable
                                                {...register("name")}
                                                errorMessage={
                                                    errors.name?.message
                                                }
                                                isInvalid={!!errors.name}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="text"
                                                label="Venue Location"
                                                isClearable
                                                {...register("location")}
                                                errorMessage={
                                                    errors.location?.message
                                                }
                                                isInvalid={!!errors.location}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="number"
                                                label="Max Capacity"
                                                isClearable
                                                defaultValue="0"
                                                {...register("maxCapacity", {
                                                    valueAsNumber: true,
                                                })}
                                                errorMessage={
                                                    errors.maxCapacity?.message
                                                }
                                                isInvalid={!!errors.maxCapacity}
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
