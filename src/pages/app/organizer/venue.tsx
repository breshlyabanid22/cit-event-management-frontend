import AddVenue from "@/components/app/organizer/addVenue";
import VenueCard from "@/components/app/organizer/venueCard";

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
                    <VenueCard />
                </div>
            </body>
        </div>
    );
}
