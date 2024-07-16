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
	CheckboxGroup, Checkbox
} from "@nextui-org/react";
import {
	getLocalTimeZone,
	today,
	parseDate,
	DateValue,
	now
} from "@internationalized/date";
import AddEventIcon from "../../icons/AddEventIcon";
import z from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { formatISO } from 'date-fns';

const eventSchema = z.object({
	name: z.string().min(3, "Event name must be at least 3 characters long"),
	description: z.string().max(300, "Maximum of 300 characters only"),
	venueId: z.coerce.number(),
	resourceId: z.array(z.coerce.number()),
	image: z.instanceof(File).optional(),
	startTime: z.date(),
	endTime: z.date(),
}).refine(data => data.startTime <= data.endTime, {
	message: "Start date must be before end date",
	path: ["endTime"],
});

type Venue = {
	id: number;
	name: string;
	location: string;
	maxCapacity: number;
	events: String[];
	venueManagers: String[];
  }
type Resource = {
	id: number;
	name: string;
	type: string;
	description: string;
	availability: boolean;
}

export default function AddEvent() {

	type FormField = z.infer<typeof eventSchema>
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormField>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			startTime: new Date(),
			endTime: new Date(),
			resourceId: [],
			image: undefined,
		},
	});
	const submitEvent: SubmitHandler<FormField> = async (data) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const formattedData = {
				...data,
				startTime: formatISO(data.startTime, { representation: 'complete' }),
				endTime: formatISO(data.endTime, { representation: 'complete' }),
			  };
			console.log(formattedData);	
		} catch (error) {
			console.error("error submitting", error);
		}
	};
	const [venues, setVenues] = useState<Venue[]>([]);
	const [resources, setResources] = useState<Resource[]>([]);
	const [isInvalid, setIsInvalid] = useState(true);
	useEffect(() => {
		fetchVenues();
		fetchResources();
	}, []);
	
	const fetchVenues = async () => {

		try {
			const response = await fetch("http://localhost:8080/venues", {
				method: "GET",
				headers: {
			 	 "Content-Type": "application/json",
				},
				credentials: "include",
			});
			if(!response.ok){
				throw new Error('Network Error');
			}
			const venueData: Venue[] = await response.json();
			setVenues(venueData);
		} catch (error) {
			console.error('Error fetching venues:', error);
		}
	}
	const fetchResources= async () => {
		try{
			const response = await fetch("http://localhost:8080/resources", {
				method: "GET",
				headers: {
			 	 "Content-Type": "application/json",
				},
				credentials: "include",
			});
			if(!response.ok){
				throw new Error('Network Error');
			}
			const resourceData: Resource[] = await response.json();
			setResources(resourceData);
		}catch(error){

		}

	}
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
		  setValue('image', file);
		}
	  };
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<div>
			<Button onPress={onOpen} color="primary" startContent={<AddEventIcon />}>
				Create an event
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent className="w-auto md:min-w-[600px] 2xl:min-w[1000px] ">
						{(onClose) => (
							<>
							<form onSubmit={handleSubmit(submitEvent)}>
								<ModalHeader className="flex flex-col gap-1">
									Add Event
								</ModalHeader>
								<ModalBody>
									<div className="flex flex-col gap-4">
										<div className="flex flex-col gap-2">
											<Input
												type="file"
												accept="image/*"
												onChange={handleFileChange}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Input
													className="col-span-2"
													type="text"
													label="Event Name"
													isClearable
													{...register("name")}
													errorMessage={errors.name?.message}
													isInvalid={!!errors.name}
												/>
										</div>
										<div className="flex flex-col gap-2">
											<Textarea
												type="text"
												label="Description"
												{...register("description")}
												errorMessage={errors.description?.message}
												isInvalid={!!errors.description}
											/>
										</div>
										<div className="grid grid-cols-1 gap-2 ">
											<Select
											label="Venue"
											id="venueId"
											placeholder="Select a venue"
											{...register("venueId", {valueAsNumber: true})}
											errorMessage={errors.venueId?.message}	
											isInvalid={!!errors.venueId}
											>
											{venues.map((venue) => (
												<SelectItem
													key={venue.id} value={venue.id}>
													{venue.name + " | " + venue.location}
												</SelectItem>
											))}
											</Select>
										</div>
										<Controller
											name="resourceId"
											control={control}
											render={({ field: { value, onChange, onBlur } }) => (
											<CheckboxGroup
												label="Select resources"
												orientation="horizontal"
												isInvalid={isInvalid || !!errors.resourceId}
												onValueChange={(selectedValues) => {
												const numberValues = selectedValues.map(Number);
												onChange(numberValues);
												setIsInvalid(numberValues.length < 1);
												}}
												value={value.map(String)} // Ensure the value is a string array for the checkbox group
												onBlur={onBlur}
											>
												{resources.map((resource) => (
												<Checkbox key={resource.id} value={String(resource.id)}>
													{resource.name}
												</Checkbox>
												))}
											</CheckboxGroup>
											)}
										/>
										<div className="flex flex-col gap-2">
											<div className="grid grid-cols-2 gap-2">
											<Controller
												control={control}
												name="startTime"
												render={({ field }) => {
													return(
													<DatePicker
														{...field}
														minValue={today(getLocalTimeZone())}
														hideTimeZone	
														showMonthAndYearPickers
														errorMessage={errors.startTime?.message}	
														isInvalid={!!errors.startTime}
														value={field.value ? parseDate((field.value as Date).toISOString().substring(0, 18)) : null}
														onChange={(date: DateValue) => field.onChange(date.toDate(getLocalTimeZone()))}
														label="Start Date"
													/>
													)
												}}
											/>
											<Controller
												control={control}
												name="endTime"
												render={({ field }) => {
													return(
													<DatePicker
														{...field}
														minValue={today(getLocalTimeZone())}
														errorMessage={errors.endTime?.message}	
														isInvalid={!!errors.endTime}
														value={field.value ? parseDate((field.value as Date).toISOString().substring(0, 18)) : now(getLocalTimeZone())}
														onChange={(date) => {
															const localDate = date.toDate(getLocalTimeZone());
															field.onChange(localDate);
														}}
														label="End Date"
													/>
													)
												}}
											/>
									
											</div>
										</div>			
								</div>
								</ModalBody>
								<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
										Close
									</Button>
									<Button color="primary" type="submit" isDisabled={isSubmitting}>
										{isSubmitting ? "Loading" :  "Submit"}
									</Button>		
								</ModalFooter>
							</form>
							</>
						)}
					</ModalContent>
			</Modal>
		</div>
	);
}
