import { Link, Listbox, ListboxItem, Tooltip, User } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import useAuthStore from "@/provider/auth";
import {
    IconBuilding,
    IconCalendar,
    IconHome,
    IconLogout2,
    IconSettings,
    IconUsers,
    IconClipboardList,
    IconCalendarEvent,
    IconMessageCircle2,
} from "@tabler/icons-react";

import LogoIcon from "@/components/icons/LogoIcon";

import {
    AdminSideBarItems,
    ParticipantSideBarItems,
    OrganizerSideBarItems,
} from "@/config/site";

export default function AppSidebar() {
    const { logout, user } = useAuthStore();
    const pathname = useLocation().pathname;

    const getIcon = (label: string) => {
        switch (label) {
            case "Home":
                return <IconHome />;
            case "User Management":
                return <IconUsers />;
            case "Resource Management":
                return <IconClipboardList />;
            case "Venue Management":
                return <IconBuilding />;
            case "Event Management":
            case "Event Registration":
                return <IconCalendar />;
            case "Scheduled List":
                return <IconClipboardList />;
            case "Upcoming Events":
                return <IconCalendarEvent />;
            case "Feedback":
                return <IconMessageCircle2 />;
            case "Settings":
                return <IconSettings />;
            default:
                return <IconHome />;
        }
    };

    // Function to get the appropriate sidebar items based on user role
    const getSidebarItems = () => {
        switch (user?.role) {
            case "ADMIN":
                return AdminSideBarItems;
            case "PARTICIPANT":
                return ParticipantSideBarItems;
            case "ORGANIZER":
                return OrganizerSideBarItems;
            default:
                return [];
        }
    };

    const sidebarItems = getSidebarItems();

    return (
        <div className="flex flex-col justify-between h-screen border-r border-gray-200 dark:border-gray-800">
            <div className="px-8 py-12">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground">
                        <LogoIcon />
                    </div>
                    <span className="font-bold uppercase text-small">
                        BAYABAS
                    </span>
                </div>
                <Listbox
                    variant="light"
                    classNames={{
                        list: "gap-4",
                    }}
                >
                    {sidebarItems.map((item) => (
                        <ListboxItem
                            key={item.label}
                            startContent={getIcon(item.label)}
                        >
                            <Tooltip
                                color="foreground"
                                content={item.label}
                                delay={500}
                            >
                                <Link
                                    color={
                                        pathname === item.href
                                            ? "primary"
                                            : "foreground"
                                    }
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </Tooltip>
                        </ListboxItem>
                    ))}
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
                            href={`/${user?.role.toLowerCase()}/settings`}
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
