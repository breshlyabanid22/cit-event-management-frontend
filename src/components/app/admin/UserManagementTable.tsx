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
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";
import { getUsers } from "@/api/utils";
import EditUser from "@/components/app/admin/EditUser";
import DeactivateUser from "@/components/app/admin/DeactivateUser";
import ActivateUser from "@/components/app/admin/ActivateUser";
import { useQuery } from "@tanstack/react-query";
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import { TypeUser } from "@/types";
import useAuthStore from "@/provider/auth";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
    {
        name: "ID",
        uid: "schoolID",
        sortable: true,
    },
    {
        name: "Name",
        uid: "name",
        sortable: true,
    },
    {
        name: "Username",
        uid: "username",
        sortable: true,
    },
    {
        name: "Role",
        uid: "role",
        sortable: true,
    },
    {
        name: "Email",
        uid: "email",
        sortable: true,
    },
    {
        name: "Status",
        uid: "active",
        sortable: true,
    },
    {
        name: "Actions",
        uid: "actions",
        sortable: true,
    },
    {
        name: "Course",
        uid: "course",
        sortable: true,
    },
    {
        name: "Created At",
        uid: "createdAt",
        sortable: true,
    },
    {
        name: "Updated At",
        uid: "updatedAt",
        sortable: true,
    },
];

const statusOptions = [
    { name: "Active", uid: "true" },
    { name: "Deactivated", uid: "false" },
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

const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "schoolID",
    "role",
    "active",
    "actions",
];

export default function UserManagementTable() {
    const { user: currentUser } = useAuthStore();
    const { isPending, isError, data, error } = useQuery<TypeUser[], Error>({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    console.log(data);
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

    const usersWithoutCurrent = React.useMemo(() => {
        if (!data) return [];
        return data.filter((user) => user.userID !== currentUser?.userID);
    }, [data, currentUser?.userID]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = usersWithoutCurrent;

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(
                (user) =>
                    user.firstName
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()) ||
                    user.lastName
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()),
            );
        }
        if (
            statusFilter.size > 0 &&
            statusFilter.size !== statusOptions.length
        ) {
            filteredUsers = filteredUsers.filter((user) =>
                statusFilter.has(user.active.toString()),
            );
        }

        return filteredUsers;
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

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{
                            radius: "lg",
                            src: user.imagePath,
                        }}
                        description={user.email}
                        name={`${user.firstName} ${user.lastName}`}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[user.role]}
                        size="sm"
                        variant="flat"
                    >
                        {user.role === "VENUE_MANAGER"
                            ? "VENUE MANAGER"
                            : user.role}
                    </Chip>
                );
            case "active":
                return (
                    <Chip
                        className="capitalize"
                        color={activeColorMap[user.active.toString()]}
                        size="sm"
                        variant="flat"
                    >
                        {user.active.toString() === "true"
                            ? "Active"
                            : "Deactivated"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-end gap-2 ">
                        <EditUser user={user} />
                        {user.active === false ? (
                            <ActivateUser user={user} />
                        ) : (
                            <DeactivateUser user={user} />
                        )}
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
                        Total {data ? filteredItems.length : 0} users
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
                emptyContent={"No users found"}
                items={isPending ? [] : sortedItems}
            >
                {(item) => (
                    <TableRow key={item.userID}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
