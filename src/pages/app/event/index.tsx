import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event as TypeEvent } from "@/types";
import { getEventById } from "@/api/utils";
import { Skeleton } from "@nextui-org/react";
export default function Event() {
    const queryClient = useQueryClient();
    const params = useParams();

    const { data: event, isSuccess } = useQuery<TypeEvent>({
        queryKey: ["eventById", params.id],
        queryFn: () => getEventById(Number(params.id)),
    });

    return (
        <div>
            <Skeleton className="rounded-lg" isLoaded={isSuccess}>
                <header className="mb-6 flex w-full items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-3xl font-bold">{event?.name}</p>
                        <p className="text-md font-light">{event?.name}</p>
                    </div>
                </header>
                <body className="grid grid-cols-1 gap-4">
                    <div className="col-span-1 flex flex-col gap-4"></div>
                </body>
            </Skeleton>
        </div>
    );
}
