import { Input, Autocomplete, AutocompleteItem, Link } from "@nextui-org/react";
import { approvedEvents } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
import { IconSearch } from "@tabler/icons-react";

export default function AppSearch() {
    const { data: events } = useQuery({
        queryKey: ["approvedEvents"],
        queryFn: approvedEvents,
        notifyOnChangeProps: [],
    });

    return (
        <Autocomplete
            size="sm"
            startContent={
                <IconSearch
                    size={20}
                    className="text-base text-default-400 pointer-events-none flex-shrink-0"
                />
            }
            variant="underline"
            radius="lg"
            className="max-w-xs"
        >
            {events?.map((event) => (
                <AutocompleteItem
                    as={Link}
                    key={event.id}
                    href={`/event/${event.id}`}
                >
                    <p className="text-sm font-medium">{event.name}</p>
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
}
