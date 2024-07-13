import { Button } from "@nextui-org/react";
import AddEventIcon from "@/components/icons/AddEventIcon";
export default function ResourceManagement() {
  return (
    <div>
      <header className="mb-6 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">Resource Management</p>
          <p className="text-md font-light">Management of Resources</p>
        </div>
        <Button color="primary" endContent={<AddEventIcon />}>
          Add new
        </Button>
      </header>
      <body className="grid grid-cols-1 gap-4">
        <div className="col-span-1 flex flex-col gap-4"></div>
      </body>
    </div>
  );
}
