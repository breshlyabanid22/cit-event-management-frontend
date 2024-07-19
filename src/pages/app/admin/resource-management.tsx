import ResourceManagementCard from "@/components/app/admin/ResourceManagementCard";
import AddVenue from "@/components/app/admin/AddVenue";
export default function ResourceManagement() {
    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Resource Management</p>
                    <p className="text-md font-light">
                        Management of Resources
                    </p>
                </div>
            </header>
            <body className="grid grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col gap-4">
                    <ResourceManagementCard />
                </div>
            </body>
        </div>
    );
}
