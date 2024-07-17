import AddEvent from "./addEvent";

export default function ParticipantHome() {
  return (
    <div>
      <header className="flex items-center justify-between w-full mb-6">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Dashboard</p>
          <p className="font-light text-md">Take a look at the events</p>
        </div>
        <body>
          <AddEvent />
        </body>
      </header>
      <body className="grid grid-cols-1 gap-4">
        <div className="flex flex-col col-span-1 gap-4"></div>
      </body>
    </div>
  );
}
