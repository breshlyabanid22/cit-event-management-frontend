import {
    Link,
    Listbox,
    ListboxItem,
    Tooltip,
    User,
    Button,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import useAuthStore from "@/provider/auth";
import LogoIcon from "@/components/icons/LogoIcon";
import {
    IconBuildings,
    IconCalendar,
    IconHome,
    IconLogout2,
    IconMessage,
    IconSettings,
} from "@tabler/icons-react";
export default function ParticipantSidebar() {
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
                                    pathname === "/participant"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/participant"
                            >
                                Home
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem
                        key="Scheduled List"
                        startContent={<IconCalendar />}
                    >
                        <Tooltip
                            color="foreground"
                            content="Scheduled List"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/participant/scheduled-list"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/participant/scheduled-list"
                            >
                                Scheduled List
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem
                        key="Upcoming Event"
                        startContent={<IconBuildings />}
                    >
                        <Tooltip
                            color="foreground"
                            content="Upcoming Event"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/participant/upcoming-event"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/participant/upcoming-event"
                            >
                                Upcoming Event
                            </Link>
                        </Tooltip>
                    </ListboxItem>
                    <ListboxItem key="Feedback" startContent={<IconMessage />}>
                        <Tooltip
                            color="foreground"
                            content="Feedback"
                            delay={500}
                        >
                            <Link
                                color={
                                    pathname === "/participant/feedback"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/participant/feedback"
                            >
                                Feedback
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
                                    pathname === "/participant/settings"
                                        ? "primary"
                                        : "foreground"
                                }
                                href="/participant/settings"
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
                            href="/organizer/settings"
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
