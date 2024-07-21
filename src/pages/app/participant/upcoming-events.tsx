export default function UpcomingEvents() {
    return (
        <div>
            <header className="flex items-center justify-between w-full mb-6">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold">Upcoming Event</p>
                    <p className="font-light text-md">
                        Events that will happen soon
                    </p>
                </div>
            </header>
            <body className="grid grid-cols-1 gap-4">
                <div className="flex flex-col col-span-1 gap-4">
                </div>
            </body>
        </div>
    );
}
