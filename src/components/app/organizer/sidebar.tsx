import { Link, Listbox, ListboxItem, Tooltip, User } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import useAuthStore from "@/provider/auth";
import {
    IconBuilding,
    IconCalendar,
    IconHome,
    IconLogout2,
    IconSettings,
} from "@tabler/icons-react";

import LogoIcon from "@/components/icons/LogoIcon";
export default function AppSidebar() {
  const { logout, user } = useAuthStore();
  const pathname = useLocation().pathname;
  return (
    <div className="flex flex-col justify-between h-screen border-r border-gray-200 dark:border-gray-800">
      <div className="px-8 py-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground">
            <LogoIcon />
          </div>
          <span className="font-bold uppercase text-small">BAYABAS</span>
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
                color={pathname === "/organizer" ? "primary" : "foreground"}
                href="/organizer"
              >
                Home
              </Link>
            </Tooltip>
          </ListboxItem>
          <ListboxItem key="Event Registration" startContent={<IconCalendar />}>
            <Tooltip
              color="foreground"
              content="Event Registration"
              delay={500}
            >
              <Link
                color={
                  pathname === "/organizer/event-registration"
                    ? "primary"
                    : "foreground"
                }
                href="/organizer/event-registration"
              >
                Event Registration
              </Link>
            </Tooltip>
          </ListboxItem>
          <ListboxItem key="Venue Management" startContent={<IconBuilding />}>
            <Tooltip color="foreground" content="Venue Management" delay={500}>
              <Link
                color={
                  pathname === "/organizer/venue-management"
                    ? "primary"
                    : "foreground"
                }
                href="/organizer/venue-management"
              >
                Venue Management
              </Link>
            </Tooltip>
          </ListboxItem>
          <ListboxItem key="Settings" startContent={<IconSettings />}>
            <Tooltip color="foreground" content="Settings" delay={500}>
              <Link
                color={
                  pathname === "/organizer/settings" ? "primary" : "foreground"
                }
                href="/organizer/settings"
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
            <Tooltip color="foreground" content="Logout" delay={500}>
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
