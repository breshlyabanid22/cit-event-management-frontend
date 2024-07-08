import { Link, Listbox, ListboxItem, ListboxSection, User } from "@nextui-org/react";
import HomeIcon from "../icons/HomeIcon";
import LogoutIcon from "../icons/LogoutIcon";
import LogoIcon from "../icons/LogoIcon";

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
				<Listbox variant="bordered" aria-label="Listbox menu with sections">
					<ListboxSection title="Navigate">
						<ListboxItem key="Home" startContent={<HomeIcon />}>
            <Link color="foreground" href="/app">Home</Link>
						</ListboxItem>
					</ListboxSection>
					<ListboxSection title="Account">
						<ListboxItem
							key="logout"
							className="text-danger"
							color="danger"
							startContent={<LogoutIcon />}
						>
							Logout
						</ListboxItem>
					</ListboxSection>
				</Listbox>
			</div>

			<div className="flex items-center justify-center gap-2 mb-4">
				<div className="sticky inset-x-0 bottom-0">
					<User
						name="Jane Doe"
						description="Organizer"
						avatarProps={{
							src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
