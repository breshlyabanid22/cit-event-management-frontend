import { Link, Listbox, ListboxItem, Tooltip, User } from "@nextui-org/react";
import HomeIcon from "../../icons/HomeIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import LogoIcon from "../../icons/LogoIcon";
import SettingsIcon from "../../icons/SettingsIcon";
import EventRegistrationIcon from "@/components/icons/EventRegistrationIcon";
import { useLocation } from "react-router-dom";

export default function AppSidebar() {
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
				<Listbox variant="light" classNames={{ list: "gap-4" }}>
					<ListboxItem key="Home" startContent={<HomeIcon />}>
						<Tooltip color="foreground" content="Home">
							<Link
								color={pathname === "/app" ? "primary" : "foreground"}
								href="/app"
							>
								Home
							</Link>
						</Tooltip>
					</ListboxItem>
					<ListboxItem
						key="Event Registration"
						startContent={<EventRegistrationIcon />}
					>
						<Tooltip color="foreground" content="Event Registration">
							<Link
								color={
									pathname === "/event-registration" ? "primary" : "foreground"
								}
								href="/event-registration"
							>
								Event Registration
							</Link>
						</Tooltip>
					</ListboxItem>
					<ListboxItem
						key="Venue Management"
						startContent={<EventRegistrationIcon />}
					>
						<Tooltip color="foreground" content="Venue Management">
							<Link
								color={
									pathname === "/venue-management" ? "primary" : "foreground"
								}
								href="/venue-management"
							>
								Venue Management	
							</Link>
						</Tooltip>
					</ListboxItem>
					<ListboxItem key="Settings" startContent={<SettingsIcon />}>
						<Tooltip color="foreground" content="Settings">
							<Link
								color={pathname === "/settings" ? "primary" : "foreground"}
								href="/settings"
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
					>
						<Tooltip color="foreground" content="Logout">
							<Link color="foreground" href="/logout">
								Logout
							</Link>
						</Tooltip>
					</ListboxItem>
				</Listbox>
			</div>

			<div className="flex items-center justify-center gap-2 mb-4">
				<div className="sticky inset-x-0 bottom-0">
					<Tooltip content="Profile" color="foreground">
						<User
							as={Link}
							href="/settings"
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
