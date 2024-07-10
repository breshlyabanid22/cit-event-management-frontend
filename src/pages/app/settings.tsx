import {
	Tabs,
	Tab,
	Card,
	CardBody,
	Image,
	Chip,
} from "@nextui-org/react";

export default function Settings() {
	return (
		<div>
			<header className="mb-6 flex w-full items-center justify-between">
				<div className="flex flex-col">
					<p className="text-3xl font-bold">Settings</p>
					<p className="text-md font-light">
						Customize settings & manage your account
					</p>
				</div>
			</header>
			<body className="flex">
				<div className="col-span-1 flex flex-col gap-4">
					<Tabs radius="lg" size="lg" aria-label="Options">
						<Tab key="profile" title="Profile">
							<h3 className="text-lg font-bold">Profile</h3>
							<p className="text-default-500">
								This displays your profile information.
							</p>
							<Card
								radius="lg"
								shadow="sm"
								className="gap-4 mt-4 sm:w-full md:w-[500px] lg:w-[800px]"
							>
								<CardBody className="flex flex-row gap-4">
										<Image
											isBlurred
											width={50}
											radius="full"
											src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
											alt="NextUI Album Cover"
											className="col-span-2"
										/>
									<div className="items-center justify-center">
										<p className="text-sm font-medium text-default-600">
											Jane Doe{" "}
											<Chip
												className="ml-2"
												size="sm"
												radius="full"
												color="primary"
											>
												Organizer
											</Chip>
										</p>
										<p className="text-xs text-default-400">19-3160-312</p>
										<p className="text-xs text-default-400">
											email@example.com
										</p>
									</div>
								</CardBody>
							</Card>
						</Tab>
						<Tab key="account" title="Account">
							<h3 className="text-lg font-bold">Account</h3>
							<Card>
								<CardBody>
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur.
								</CardBody>
							</Card>
						</Tab>
						<Tab key="notifications" title="Notifications">
							<Card>
								<CardBody>
									Excepteur sint occaecat cupidatat non proident, sunt in culpa
									qui officia deserunt mollit anim id est laborum.
								</CardBody>
							</Card>
						</Tab>
					</Tabs>
				</div>
			</body>
		</div>
	);
}
