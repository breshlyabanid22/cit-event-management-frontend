import {
    Link,
    Listbox,
    ListboxItem,
    Tooltip,
    User,
    Button,
} from "@nextui-org/react";
import {
    IconHome,
    IconUsers,
    IconBuildingWarehouse,
    IconBuildings,
    IconSettings,
    IconLogout2,
} from "@tabler/icons-react";
import LogoIcon from "../../icons/LogoIcon";
import { useLocation } from "react-router-dom";
import useAuthStore from "@/provider/auth";
export default function AdminSideBar() {
    const { logout, user } = useAuthStore();
    const pathname = useLocation().pathname;
    return (
        <div className="flex h-screen flex-col justify-between border-r dark:border-gray-800 border-gray-200">
            <div className="px-8 py-12">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                        <LogoIcon />
                    </div>
                    <span className="text-small font-bold uppercase">
                        BAYABAS
                    </span>
                </div>
                <Listbox
                    variant="light"
                    classNames={{
                        list: "gap-4",
                    }}
                >
                    <ListboxItem key="Home" startContent={<IconHome />}>
                        <Tooltip color="foreground" content="Home" delay={500}>
                            <Link
                                color={
                                    pathname === "/admin"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/admin"
                            >
                                Home
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem
                        key="User Management"
                        startContent={<IconUsers />}
                    >
                        <Tooltip
                            color="foreground"
                            content="User Management"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/admin/user-management"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/admin/user-management"
                            >
                                User Management
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem
                        key="Resource Management"
                        startContent={<IconBuildingWarehouse />}
                    >
                        <Tooltip
                            color="foreground"
                            content="Resource Management"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/admin/resource-management"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/admin/resource-management"
                            >
                                Resource Management
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem
                        key="Venue Management"
                        startContent={<IconBuildings />}
                    >
                        <Tooltip
                            color="foreground"
                            content="Venue Management"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/admin/venue-management"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/admin/venue-management"
                            >
                                Venue Management
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem key="Settings" startContent={<IconSettings />}>
                        <Tooltip
                            color="foreground"
                            content="Settings"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/admin/settings"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/admin/settings"
                            >
                                Settings
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem
                        key="logout"
                        className="text-danger"
                        color="danger"
                        startContent={<IconLogout2 />}
                        onPress={logout}
                    >
                        <Tooltip
                            color="foreground"
                            content="Logout"
                            delay={500}
                        >
                            Logout
                        </Tooltip>
                    </ListboxItem>
                </Listbox>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
                <div className="sticky inset-x-0 bottom-0">
                    <Tooltip content="Profile" color="foreground" delay={500}>
                        <User
                            as={Link}
                            href="/admin/settings"
                            name={user?.firstName + " " + user?.lastName}
                            description={user?.role}
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
