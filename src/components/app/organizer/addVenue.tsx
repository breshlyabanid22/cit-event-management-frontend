import AddVenueIcon from "@/components/icons/addVenueIcon";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

const venueSchema = z.object({
	name: z.string().min(3, "Event name must be at least 3 characters long"),
	location: z
		.string()
		.min(3, "Event location must be at least 3 characters long"),
	capacity: z.number().min(1, "Capacity must be at least 1 people"),
});
export default function AddVenue() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof venueSchema>>({
		resolver: zodResolver(venueSchema),
	});

	const submitEvent = async (data: z.infer<typeof venueSchema>) => {
		console.log(data);
	};
	return (
		<div>
			<Button onPress={onOpen} color="primary" startContent={<AddVenueIcon />}>
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
											<Input
												type="text"
												label="Venue Name"
												isClearable
												{...register("name")}
												errorMessage={errors.name?.message}
												isInvalid={!!errors.name}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Input
												type="text"
												label="Venue Location"
												isClearable
												{...register("location")}
												errorMessage={errors.location?.message}
												isInvalid={!!errors.location}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Input
												type="text"
												label="Max Capacity"
												isClearable
												{...register("capacity")}
												errorMessage={errors.capacity?.message}
												isInvalid={!!errors.capacity}
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
