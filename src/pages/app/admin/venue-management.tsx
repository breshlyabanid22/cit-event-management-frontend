import VenueManagementTable from "@/components/app/admin/VenueManagementTable";
import AddVenue from "@/components/app/admin/AddVenue";
import { getUsers } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
import { TypeUser } from "@/types";
export default function VenueManagement() {
    const { isPending, isError, data, error } = useQuery<TypeUser[], Error>({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Venue Management</p>
                    <p className="text-md font-light">Manage your venue</p>
                </div>
                <AddVenue users={data} />
            </header>
            <body className="grid grid-cols-1 gap-4">
                <div className="col-span-1 flex flex-col gap-4">
                    <VenueManagementTable />
                </div>
            </body>
        </div>
    );
}
