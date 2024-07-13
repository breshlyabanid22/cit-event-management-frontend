import AddEvent from "@/components/app/organizer/addEvent";
import EventCard from "@/components/app/organizer/eventCard";


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
				<EventCard />	
				</div>
			</body>
		</div>
	);
}
