import AddEvent from "@/components/app/organizer/addEvent";
import EventManagementTable from "@/components/app/admin/EventManagementTable";
export default function EventManagement() {
    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Event Management</p>
                    <p className="text-md font-light">
                        Manage your events here
                    </p>
                </div>
                <AddEvent />
            </header>
            <body className="grid grid-cols-1 gap-4">
                <EventManagementTable />
            </body>
        </div>
    );
}
