import {
  Link,
  Listbox,
  ListboxItem,
  Tooltip,
  User,
  Button,
} from "@nextui-org/react";
import HomeIcon from "../../icons/HomeIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import LogoIcon from "../../icons/LogoIcon";
import SettingsIcon from "../../icons/SettingsIcon";
import EventRegistrationIcon from "@/components/icons/EventRegistrationIcon";
import VenueIcon from "@/components/icons/VenueIcon";
import { useLocation } from "react-router-dom";
import useAuthStore from "@/provider/auth";
export default function AppSidebar() {
  const { logout } = useAuthStore();
  const pathname = useLocation().pathname;
  return (
    <div className="flex h-screen flex-col justify-between border-r dark:border-gray-800 border-gray-200">
      <div className="px-8 py-12">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <LogoIcon />
          </div>
          <span className="text-small font-bold uppercase">BAYABAS</span>
        </div>
        <Listbox
          variant="light"
          classNames={{
            list: "gap-4",
          }}
        >
          <ListboxItem key="Home" startContent={<HomeIcon />}>
            <Tooltip color="foreground" content="Home" delay={500}>
              <Link
                color={pathname === "/organizer" ? "primary" : "foreground"}
                href="/organizer"
              >
                Home
              </Link>
            </Tooltip>
          </ListboxItem>
          <ListboxItem
            key="Event Registration"
            startContent={<EventRegistrationIcon />}
          >
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
          <ListboxItem key="Venue Management" startContent={<VenueIcon />}>
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
          <ListboxItem key="Settings" startContent={<SettingsIcon />}>
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
            startContent={<LogoutIcon />}
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
              name="Jane Doe"
              description="Organizer"
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
