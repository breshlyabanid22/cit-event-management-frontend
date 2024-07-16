import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { IconListCheck } from "@tabler/icons-react";

export default function ManageWaitlist() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        variant="solid"
        color="primary"
        startContent={<IconListCheck />}
        onPress={onOpen}
      >
        Manage Waitlist
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Manage Waitlist
            </ModalHeader>
            <ModalBody className="min-h-[500px] overflow-y-auto">
              <Card
                shadow="sm"
                radius="lg"
                className="p-4 flex flex-row items-center justify-between "
              >
                <User
                  name="Junior Garcia"
                  description="yup@exmaple.com"
                  avatarProps={{
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                ></User>
                <div className="flex gap-2 w-min">
                  <div className="flex gap-2">
                    <Button color="success" variant="flat" radius="full">
                      Accept
                    </Button>
                    <Button color="danger" variant="flat" radius="full">
                      Decline
                    </Button>
                  </div>
                </div>
              </Card>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
