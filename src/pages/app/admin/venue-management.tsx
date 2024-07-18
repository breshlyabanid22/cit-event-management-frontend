import VenueManagementTable from "@/components/app/admin/VenueManagementTable";
import AddVenue from "@/components/app/admin/AddVenue";
export default function VenueManagement() {
    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Venue Management</p>
                    <p className="text-md font-light">Manage your venue</p>
                </div>
                <AddVenue />
            </header>
            <body className="grid grid-cols-1 gap-4">
                <div className="col-span-1 flex flex-col gap-4">
                    <VenueManagementTable />
                </div>
            </body>
        </div>
    );
}
