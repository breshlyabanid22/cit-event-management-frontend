import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Chip,
    Pagination,
} from "@nextui-org/react";
import { getAllEvents } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import DeleteEvent from "@/components/app/admin/DeleteEvent";
import EditEvent from "@/components/app/admin/EditEvent";
import AcceptEvent from "@/components/app/admin/AcceptEvent";
import { format, parseISO } from 'date-fns';
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
    {
        name: "Event Name",
        uid: "name",
        sortable: true,
    },
    {
        name: "Description",
        uid: "description",
        sortable: true,
    },

    {
        name: "Venue",
        uid: "venueId",
        sortable: true,
    },

    {
        name: "Organizer",
        uid: "organizerId",
        sortable: true,
    },

    {
        name: "Start Date",
        uid: "startDate",
        sortable: true,
    },
    {
        name: "End Date",
        uid: "endDate",
        sortable: true,
    },
    {
        name: "Status",
        uid: "status",
        sortable: true,
    },
    {
        name: "Actions",
        uid: "actions",
        sortable: false,
    },
];

const statusOptions = [
    { name: "Completed", uid: "completed" },
    { name: "Ongoing", uid: "ongoing" },
    { name: "Cancelled", uid: "cancelled" },
    { name: "Pending", uid: "pending" },
];

export { columns, statusOptions };

const statusColorMap = {
    PARTICIPANT: "success",
    ADMIN: "danger",
    ORGANIZER: "warning",
    VENUE_MANAGER: "primary",
};

const activeColorMap = {
    true: "success",
    false: "danger",
};

const statusColorMap2 = {
    Pending: "warning",
    Approved: "success",
    Cancelled: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "venueId",
    "organizerId",
    "startDate",
    "endDate",
    "status",
    "actions",
];

export default function eventManagementTable() {
    const { isPending, isError, data, error } = useQuery<Typeevent[], Error>({
        queryKey: ["events"],
        queryFn: getAllEvents,
    });
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = React.useState(new Set());
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);
      
    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid),
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredEvents = data || []; // Use data from React Query
        
        if (hasSearchFilter) {
            filteredEvents = filteredEvents.filter(
                (event) =>
                    event.firstName
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()) ||
                    event.lastName
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()),
            );
        }
        if (
            statusFilter.size > 0 &&
            statusFilter.size !== statusOptions.length
        ) {
            filteredEvents = filteredEvents.filter((event) =>
                statusFilter.has(event.active.toString()),
            );
        }

        return filteredEvents;
    }, [data, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((event, columnKey) => {
        const cellValue = event[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{
                            radius: "lg",
                            src: event.image,
                        }}
                        name={event.name}
                    ></User>
                );
            case "role":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[event.role]}
                        size="sm"
                        variant="flat"
                    >
                        {event.role === "VENUE_MANAGER"
                            ? "VENUE MANAGER"
                            : event.role}
                    </Chip>
                );
            case "active":
                return (
                    <Chip
                        className="capitalize"
                        color={activeColorMap[event.active.toString()]}
                        size="sm"
                        variant="flat"
                    >
                        {event.active.toString() === "true"
                            ? "Active"
                            : "Deactivated"}
                    </Chip>
                );
            case "organizerId":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap2[event.organizer]}
                            size="sm"
                            variant="flat"
                        >
                            {event.organizer}
                        </Chip>
                    );
            case "startDate":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap2[event.startDate]}
                        size="sm"
                        variant="flat"
                    >
                        {event.startTime}
                    </Chip>
                );
            case "endDate":
                    return (
                        <Chip
                            className="capitalize"
                            color={statusColorMap2[event.endDate]}
                            size="sm"
                            variant="flat"
                        >
                            {event.endTime}
                        </Chip>
                    );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap2[event.status]}
                        size="sm"
                        variant="flat"
                    >
                        {event.status}
                    </Chip>
                    );
            case "actions":
                return (
                    <div className="relative flex items-center justify-end gap-2 ">
                        {event.status === "Pending" && (
                            <AcceptEvent event={event} />
                        )}
                        <EditEvent event={event} />
                        <DeleteEvent event={event} />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const pages = React.useMemo(() => {
        return Math.ceil((data?.length || 0) / rowsPerPage);
    }, [data, rowsPerPage]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-3">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<IconSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <IconChevronDown className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={(keys) =>
                                    setStatusFilter(new Set([...keys]))
                                }
                            >
                                {statusOptions.map((active) => (
                                    <DropdownItem
                                        key={active.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(active.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <IconChevronDown className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-default-400 text-small">
                        Total {data ? filteredItems.length : 0} events
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data?.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="flex items-center justify-between px-2 py-2">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[582px]",
            }}
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"No venues found"}
                items={isPending ? [] : sortedItems}
            >
                {(item) => (
                    <TableRow key={item.eventID}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
