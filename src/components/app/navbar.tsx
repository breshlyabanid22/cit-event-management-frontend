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

const BellIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
		<path d="M9 17v1a3 3 0 0 0 6 0v-1" />
	</svg>
);

export default function AppNavBar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
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
					<BellIcon />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
