import AddEvent from "@/components/app/addEvent";
import DeleteEvent from "@/components/app/deleteEvent";
import EditEventIcon from "@/components/icons/EditEventIcon";
import ViewEventIcon from "@/components/icons/ViewEventIcon";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

export default function Home() {
	return (
		<div>
			<header className="mb-6 flex w-full items-center justify-between">
				<div className="flex flex-col">
					<p className="text-3xl font-bold">Dashboard</p>
					<p className="text-md font-light">Manage your Events</p>
				</div>
				<AddEvent />
			</header>
			<body className="grid grid-cols-1 gap-4">
				<div className="col-span-1 flex flex-col gap-4">
					<Card className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="https://nextui.org/images/hero-card-complete.jpeg"
						/>
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center gap-4">
							<h4 className="font-bold text-large">Event Name</h4>
							<p className="text-tiny uppercase font-bold">Event Location</p>
							<small className="text-default-500">Event Date</small>
						</CardHeader>
						<CardBody className="overflow-visible py-2 items-start justify-center">
							<p className="text-default-500">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Massa sed elementum tempus egestas sed sed. Condimentum vitae
								sapien pellentesque habitant morbi. Risus viverra adipiscing at
								in tellus integer.
							</p>
						</CardBody>
						<CardBody className="pb-0 pt-2 px-4 flex-col items-end justify-center gap-4">
							<Button
								color="secondary"
								variant="flat"
								endContent={<ViewEventIcon />}
							>
								View
							</Button>
							<Button
								color="warning"
								variant="flat"
								endContent={<EditEventIcon />}
							>
								Edit
							</Button>
							<DeleteEvent />
						</CardBody>
					</Card>
				</div>
			</body>
		</div>
	);
}
