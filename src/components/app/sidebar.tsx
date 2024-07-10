import {
	Link,
	Listbox,
	ListboxItem,
	ListboxSection,
	Tooltip,
	User,
} from "@nextui-org/react";
import HomeIcon from "../icons/HomeIcon";
import LogoutIcon from "../icons/LogoutIcon";
import LogoIcon from "../icons/LogoIcon";
import SettingsIcon from "../icons/SettingsIcon";

export default function AppSidebar() {
	return (
		<div className="flex h-screen flex-col justify-between border-r dark:border-gray-800 border-gray-200">
			<div className="px-8 py-12">
				<div className="flex items-center justify-center gap-2 mb-4">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
						<LogoIcon />
					</div>
					<span className="text-small font-bold uppercase">BAYABAS</span>
				</div>
				<Listbox variant="bordered">
					<ListboxItem key="Home" startContent={<HomeIcon />}>
						<Tooltip color="foreground" content="Home">
							<Link color="foreground" href="/app">
								Home
							</Link>
						</Tooltip>
					</ListboxItem>

					<ListboxItem key="Settings" startContent={<SettingsIcon />}>
						<Tooltip color="foreground" content="Settings">
							<Link color="foreground" href="/settings">
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
