import {
	Button,
	DatePicker,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	TimeInput,
	useDisclosure,
} from "@nextui-org/react";
import AddEventIcon from "../../icons/AddEventIcon";

export default function AddEvent() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<div>
			{" "}
			<Button onPress={onOpen} color="primary" startContent={<AddEventIcon />}>
				Add Event
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add Event
							</ModalHeader>
							<ModalBody>
								<form className="flex flex-col gap-4">
									<div className="flex flex-col gap-2">
										<Input
											type="text"
											label="Event Name"
											isRequired
											isClearable
										/>
									</div>
									<div className="flex flex-col gap-2">
										<Input
											type="text"
											label="Event Location"
											isRequired
											isClearable
										/>
									</div>
									<div className="flex flex-col gap-2">
										<DatePicker label="Event Date" isRequired />
									</div>
									<div className="flex flex-col gap-2">
										<TimeInput label="Event Time" isRequired />
									</div>
								</form>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
