import ResourceManagementCard from "@/components/app/admin/ResourceManagementCard";
import AddResource from "@/components/app/admin/AddResource";
import { useQuery } from "@tanstack/react-query";
import { getResources } from "@/api/utils";
export default function ResourceManagement() {
    const { isPending, isError, data, error } = useQuery<TypeUser[], Error>({
        queryKey: ["resources"],
        queryFn: getResources,
    });

    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Resource Management</p>
                    <p className="text-md font-light">
                        Management of Resources
                    </p>
                </div>
                <AddResource />
            </header>
            <body className="grid grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col gap-4">
                    <ResourceManagementCard />
                </div>
            </body>
        </div>
    );
}
