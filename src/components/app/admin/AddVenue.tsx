import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    Avatar,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Autocomplete,
    AutocompleteItem,
} from "@nextui-org/react";
import { IconHomePlus } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";
import { addVenue } from "@/api/utils";
import { TypeUser } from "@/types";
import useAuthStore from "@/provider/auth";
import toast, { Toaster } from "react-hot-toast";
const venueSchema = z.object({
    userID: z.number().min(1, "User ID must be at least 1 characters long"),
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
    venueManager: z.number().min(1, "Venue Manager must be at least 1 people"),
});

export default function AddVenue(data) {
    const { user } = useAuthStore();
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
        defaultValues: {
            userID: user?.userID,
        },
    });

    const submitEvent = async (data: z.infer<typeof venueSchema>) => {
        try {
            console.log(data);
            await addVenue(data);
            toast.success("Venue added successfully");
            isOpen ? onOpenChange() : null;
        } catch (error) {
            toast.error("Error adding venue:", error);
        }
    };

    const users = data.users.data;
    return (
        <div>
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
                onPress={onOpen}
                color="primary"
                startContent={<IconHomePlus />}
            >
                Add Venue
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
                                            <Controller
                                                name="venueManager"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Venue manager is required",
                                                }}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        defaultItems={users}
                                                        label="Assigned to"
                                                        placeholder="Select a user"
                                                        labelPlacement="inside"
                                                        errorMessage={
                                                            errors.venueManager
                                                                ?.message
                                                        }
                                                        isInvalid={
                                                            !!errors.venueManager
                                                        }
                                                        onSelectionChange={(
                                                            userID,
                                                        ) =>
                                                            field.onChange(
                                                                Number(userID),
                                                            )
                                                        }
                                                    >
                                                        {data.users
                                                            .isLoading ? (
                                                            <AutocompleteItem
                                                                key="loading"
                                                                textValue="Loading..."
                                                                value="loading"
                                                            >
                                                                Loading...
                                                            </AutocompleteItem>
                                                        ) : data.users.error ? (
                                                            <AutocompleteItem
                                                                key="error"
                                                                textValue="Error"
                                                                value="error"
                                                            >
                                                                Error
                                                            </AutocompleteItem>
                                                        ) : !data.users.data ||
                                                          data.users.data
                                                              .length === 0 ? (
                                                            <AutocompleteItem
                                                                key="empty"
                                                                textValue="No users found"
                                                                value="empty"
                                                            >
                                                                No users found
                                                            </AutocompleteItem>
                                                        ) : (
                                                            users.map(
                                                                (
                                                                    user: TypeUser,
                                                                ) => (
                                                                    <AutocompleteItem
                                                                        key={
                                                                            user.userID
                                                                        }
                                                                        textValue={
                                                                            user.email
                                                                        }
                                                                        value={
                                                                            user.userID
                                                                        }
                                                                    >
                                                                        <div className="flex gap-2 items-center">
                                                                            <Avatar
                                                                                alt={
                                                                                    user.firstName
                                                                                }
                                                                                className="flex-shrink-0"
                                                                                size="sm"
                                                                                src={
                                                                                    user.imagePath
                                                                                }
                                                                            />
                                                                            <div className="flex flex-col">
                                                                                <span className="text-small">
                                                                                    {
                                                                                        user.firstName
                                                                                    }{" "}
                                                                                    {
                                                                                        user.lastName
                                                                                    }
                                                                                </span>
                                                                                <span className="text-tiny text-default-400">
                                                                                    {
                                                                                        user.email
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </AutocompleteItem>
                                                                ),
                                                            )
                                                        )}
                                                    </Autocomplete>
                                                )}
                                            />
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
