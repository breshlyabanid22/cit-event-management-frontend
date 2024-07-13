import { Button } from "@nextui-org/button";

export default function Venue() {
  return (
    <div>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Venue</p>
          <p className="text-md font-light">Manage your Venue</p>
        </div>
        <Button color="primary" radius="md">
          Add Venue
        </Button>
      </header>
    </div>
  );
}