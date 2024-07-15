import {
	Button,
	DatePicker,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { getLocalTimeZone, now, today } from "@internationalized/date";
import AddEventIcon from "../../icons/AddEventIcon";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const eventSchema = z.object({
	name: z.string().min(3, "Event name must be at least 3 characters long"),
	location: z
		.string()
		.min(3, "Event location must be at least 3 characters long"),
	date: z.date(),
	time: z.date(),
});

export default function AddEvent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof eventSchema>>({
		resolver: zodResolver(eventSchema),
	});

	const submitEvent = async (data: z.infer<typeof eventSchema>) => {
		console.log(data);
	};

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<div>
			<Button onPress={onOpen} color="primary" startContent={<AddEventIcon />}>
				Add Event
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<form onSubmit={handleSubmit(submitEvent)}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">Add Event</ModalHeader>
								<ModalBody>
									<form className="flex flex-col gap-4">
										<div className="flex flex-col gap-2">
											<Input
												type="text"
												label="Event Name"
												isClearable
												{...register("name")}
												errorMessage={errors.name?.message}
												isInvalid={!!errors.name}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Input
												type="text"
												label="Event Location"
												isClearable
												{...register("location")}
												errorMessage={errors.location?.message}
												isInvalid={!!errors.location}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<DatePicker
												minValue={today(getLocalTimeZone())}
												defaultValue={now(getLocalTimeZone())}
												hideTimeZone
												showMonthAndYearPickers
												label="Event Date"
											/>
										</div>
									</form>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
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
