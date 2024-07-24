import {
    Button,
    DatePicker,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    useDisclosure,
    Image,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { getLocalTimeZone, now, parseDateTime } from "@internationalized/date";
import z from "zod";
import { Venue, Resource, Event } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { getVenues, getResources } from "@/api/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IconEdit } from "@tabler/icons-react";

const eventSchema = z
    .object({
        name: z
            .string()
            .min(3, "Event name must be at least 3 characters long"),
        description: z.string().max(300, "Maximum of 300 characters only"),
        venueId: z.coerce.number(),
        resourceId: z.array(z.coerce.number()),
        image: z.instanceof(File).optional(),
        startTime: z.string(),
        endTime: z.string(),
    })
    .refine((data) => new Date(data.startTime) < new Date(data.endTime), {
        message: "Start date must be before end date",
        path: ["endTime"],
    });

export default function EditEvent({ props }: { props: Event }) {
    const queryClient = useQueryClient();
    const {
        isPending,
        isError,
        data: venues,
        error,
    } = useQuery<Venue[], Error>({
        queryKey: ["venues"],
        queryFn: getVenues,
    });

    const {
        isPending: isPendingResources,
        isError: isErrorResources,
        data: resources,
        error: errorResources,
    } = useQuery<Resource[], Error>({
        queryKey: ["resources"],
        queryFn: getResources,
    });

    const [isInvalid, setIsInvalid] = useState(true);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    type FormField = z.infer<typeof eventSchema>;
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<FormField>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            image: undefined,
            resourceId: [],
            name: props.name,
            description: props.description,
            venueId: props.venueId,
            startTime: props.startTime,
            endTime: props.endTime,
        },
    });

    const submitEvent: SubmitHandler<FormField> = async (data) => {
        try {
            console.log("Data:", data);
            const createEventData: Event = {
                name: data.name,
                description: data.description,
                venueId: data.venueId,
                resourceId: data.resourceId,
                image: data.image,
                startTime: data.startTime,
                endTime: data.endTime,
            };

            const formData = new FormData();
            formData.append(
                "updatedEventDTO",
                new Blob([JSON.stringify(createEventData)], {
                    type: "application/json",
                }),
            );
            if(createEventData.resourceId){
                createEventData.resourceId.forEach((id) => {
                    formData.append("resourceId", id.toString());
                });
            }
            if (createEventData.image) {
                formData.append("imageFile", createEventData.image);
            }
            console.log(createEventData);
            await fetch(`http://localhost:8080/events/${props.id}`, {
                method: "PATCH",
                body: formData,
                credentials: "include",
            })
                .then(async (res) => {
                    const message = await res.text();
                    if (res.ok) {
                        queryClient.invalidateQueries({ queryKey: ["events"] });
                        toast.success(message);
                        isOpen ? onOpenChange() : null;
                    } else {
                        toast.error(message);
                    }
                })
                .catch((error) => {
                    console.error("Error creating event:", error);
                });
        } catch (error) {
            console.error("error submitting", error);
        }
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                variant="flat"
                color="warning"
                endContent={<IconEdit />}
            >
                Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <form onSubmit={handleSubmit(submitEvent)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add Event
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
                                                        accept="image/*"
                                                        className="hidden"
                                                        ref={fileInputRef}
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            if (file) {
                                                                setValue(
                                                                    "image",
                                                                    file,
                                                                );
                                                                setThumbnail(
                                                                    file,
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
                                            {thumbnail && (
                                                <Image
                                                    isBlurred
                                                    isZoomed
                                                    width={300}
                                                    height={300}
                                                    radius="lg"
                                                    src={URL.createObjectURL(
                                                        thumbnail,
                                                    )}
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                className="col-span-2"
                                                type="text"
                                                label="Event Name"
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
                                                label="Description/Purpose"
                                                {...register("description")}
                                                errorMessage={
                                                    errors.description?.message
                                                }
                                                isInvalid={!!errors.description}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 ">
                                            <Select
                                                label="Venue"
                                                id="venueId"
                                                placeholder="Select a venue"
                                                {...register("venueId", {
                                                    valueAsNumber: true,
                                                })}
                                                errorMessage={
                                                    errors.venueId?.message
                                                }
                                                isInvalid={!!errors.venueId}
                                            >
                                                {venues.map((venue) => (
                                                    <SelectItem
                                                        key={venue.id}
                                                        value={venue.id}
                                                    >
                                                        {venue.name +
                                                            " | " +
                                                            venue.location}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <Controller
                                            name="resourceId"
                                            control={control}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                            }) => (
                                                <Dropdown
                                                    isInvalid={
                                                        isInvalid ||
                                                        !!errors.resourceId
                                                    }
                                                    onClose={onBlur}
                                                >
                                                    <DropdownTrigger>
                                                        <Button
                                                            variant="bordered"
                                                            className="capitalize"
                                                        >
                                                            {value.length > 0
                                                                ? `${value.length} selected`
                                                                : "Select resources"}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        closeOnSelect={false}
                                                        disallowEmptySelection
                                                        aria-label="Select resources"
                                                        selectionMode="multiple"
                                                        selectedKeys={
                                                            new Set(
                                                                value.map(
                                                                    String,
                                                                ),
                                                            )
                                                        }
                                                        onSelectionChange={(
                                                            selectedKeys,
                                                        ) => {
                                                            const selectedArray =
                                                                Array.from(
                                                                    selectedKeys,
                                                                );
                                                            const numberValues =
                                                                selectedArray.map(
                                                                    Number,
                                                                );
                                                            onChange(
                                                                numberValues,
                                                            );
                                                            setIsInvalid(
                                                                numberValues.length <
                                                                1,
                                                            );
                                                        }}
                                                    >
                                                        {resources.map(
                                                            (resource) => (
                                                                <DropdownItem
                                                                    key={String(
                                                                        resource.id,
                                                                    )}
                                                                >
                                                                    {
                                                                        resource.name
                                                                    }
                                                                </DropdownItem>
                                                            ),
                                                        )}
                                                    </DropdownMenu>
                                                </Dropdown>
                                            )}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <Controller
                                                    control={control}
                                                    name="startTime"
                                                    render={({ field }) => {
                                                        return (
                                                            <DatePicker
                                                                {...field}
                                                                minValue={now(
                                                                    getLocalTimeZone(),
                                                                )}
                                                                hideTimeZone
                                                                showMonthAndYearPickers
                                                                errorMessage={
                                                                    errors
                                                                        .startTime
                                                                        ?.message
                                                                }
                                                                isInvalid={
                                                                    !!errors.startTime
                                                                }
                                                                value={
                                                                    field.value
                                                                        ? parseDateTime(
                                                                            field.value,
                                                                        )
                                                                        : null
                                                                }
                                                                onChange={(
                                                                    date,
                                                                ) => {
                                                                    const isoDate =
                                                                        date !=
                                                                            null
                                                                            ? date.toString()
                                                                            : "";
                                                                    field.onChange(
                                                                        isoDate,
                                                                    );
                                                                    setValue(
                                                                        "startTime",
                                                                        isoDate,
                                                                    );
                                                                }}
                                                                label="Start Date"
                                                            />
                                                        );
                                                    }}
                                                />
                                                <Controller
                                                    control={control}
                                                    name="endTime"
                                                    render={({ field }) => {
                                                        return (
                                                            <DatePicker
                                                                {...field}
                                                                minValue={now(
                                                                    getLocalTimeZone(),
                                                                )}
                                                                hideTimeZone
                                                                showMonthAndYearPickers
                                                                errorMessage={
                                                                    errors
                                                                        .endTime
                                                                        ?.message
                                                                }
                                                                isInvalid={
                                                                    !!errors.endTime
                                                                }
                                                                value={
                                                                    field.value
                                                                        ? parseDateTime(
                                                                            field.value,
                                                                        )
                                                                        : null
                                                                }
                                                                onChange={(
                                                                    date,
                                                                ) => {
                                                                    const isoDate =
                                                                        date !=
                                                                            null
                                                                            ? date.toString()
                                                                            : "";
                                                                    field.onChange(
                                                                        isoDate,
                                                                    );
                                                                    setValue(
                                                                        "endTime",
                                                                        isoDate,
                                                                    );
                                                                }}
                                                                label="End Date"
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
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
                                    <Button
                                        color="primary"
                                        type="submit"
                                        isDisabled={!isDirty || isSubmitting}
                                    >
                                        {isSubmitting ? "Loading" : "Submit"}
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
