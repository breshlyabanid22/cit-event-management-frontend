import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@nextui-org/react";
import AppSearch from "@/components/app/search";
import { ThemeSwitch } from "../theme-switch";
import { IconBell } from "@tabler/icons-react";
import useAuthStore from "@/provider/auth";
export default function AppNavBar() {
    const { user } = useAuthStore();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <AppSearch />
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">
                    {(() => {
                        let settingsPath = "";
                        switch (user?.role) {
                            case "ADMIN":
                                settingsPath = "/admin/settings";
                                break;
                            case "PARTICIPANT":
                                settingsPath = "/participant/settings";
                                break;
                            case "ORGANIZER":
                                settingsPath = "/organizer/settings";
                                break;
                            case "VENUE_MANAGER":
                                settingsPath =
                                    "/venue-management/settings";
                                break;
                            default:
                                return null; // Or some default behavior
                        }

                        return (
                            <Link
                                href={settingsPath}
                            >
                                <IconBell />
                            </Link>
                        );
                    })()}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
