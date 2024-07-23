import AddVenue from "@/components/app/organizer/addVenue";
import VenueCard from "@/components/app/organizer/venueCard";
import { useQuery } from "@tanstack/react-query";
import { getAllVenuesByManager } from "@/api/utils";
import { Venue as TypeVenue } from "@/types";
import useAuthStore from "@/provider/auth";
import { Skeleton } from "@nextui-org/react";
export default function Venue() {
    const { user } = useAuthStore();
    const { isPending, isError, data, error } = useQuery<TypeVenue[], Error>({
        queryKey: ["venues", user?.userID],
        queryFn: () => getAllVenuesByManager(Number(user?.userID)),
    });
    
    console.log("Venues by manager:", data);
    return (
        <div>
            <header className="mb-6 flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Venue</p>
                    <p className="text-md font-light">Manage your Venue</p>
                </div>
                <AddVenue />
            </header>
            <body className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                {isPending ? (
                    <div className="flex justify-center items-center h-full">
                        <Skeleton className="w-full h-full" />
                    </div>
                ) : data?.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-center text-default-400">
                            No venues found
                        </p>
                    </div>
                ) : (
                    data?.map((venue: TypeVenue) => (
                        <VenueCard venue={venue} key={venue.id} />
                    ))
                )}
            </body>
        </div>
    );
}
