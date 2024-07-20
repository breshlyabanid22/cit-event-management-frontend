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

export default function AppNavBar() {
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
                    <IconBell />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
