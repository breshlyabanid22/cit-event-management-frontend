import AddVenue from "@/components/app/organizer/addVenue";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function Venue() {
	return (
		<div>
			<header className="mb-6 flex w-full items-center justify-between">
				<div className="flex flex-col">
					<p className="text-3xl font-bold">Venue</p>
					<p className="text-md font-light">Manage your Venue</p>
				</div>
				<AddVenue />
			</header>
			<body className="grid grid-cols-3 gap-4">
				<div className="flex flex-col gap-4">
					<Card isFooterBlurred radius="lg" className="border-none">
						<Image
							alt="Woman listing to music"
							className="object-cover"
							width={500}
							height={500}
							src="https://images.unsplash.com/photo-1720595236027-a752687cb1ab?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						/>
						<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
							<p className="text-tiny text-white/80">Venue Name</p>
							<p className="text-tiny text-white/80">Venue Location</p>
							<p className="text-tiny text-white/80">Capacity</p>
							<Button
								className="text-tiny text-white bg-black/20"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
							>
                View
							</Button>
						</CardFooter>
					</Card>
				</div>
			</body>
		</div>
	);
}
