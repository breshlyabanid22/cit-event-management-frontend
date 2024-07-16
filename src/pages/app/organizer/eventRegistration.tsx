import EventRegistrationCard from "@/components/app/organizer/eventRegistrationCard";
import ManageWaitlist from "@/components/app/organizer/ManageWaitlist";

export default function EventRegistration() {
  return (
    <div>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Event Registration</p>
          <p className="text-md font-light">Manage your participants</p>
        </div>
        <ManageWaitlist />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EventRegistrationCard />
      </div>
    </div>
  );
}
