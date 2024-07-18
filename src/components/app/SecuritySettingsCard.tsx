import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
} from "@nextui-org/react";
import { IconEdit } from "@tabler/icons-react";
export function UsernameCard(props: { username: string }) {
    return (
        <Card className="grid sm:grid-cols-1 lg:grid-cols-3 p-2" radius="lg">
            <CardHeader className=" flex-col items-start justify-center">
                <h4 className="font-bold text-large">Username</h4>
                <small className="text-default-500">
                    Your login username in your account.
                </small>
            </CardHeader>
            <CardBody className="items-center justify-center col-span-2 grid grid-cols-3">
                <p className="text-warning col-span-2">{props.username}</p>
                <Button
                    color="default"
                    variant="bordered"
                    radius="full"
                    endContent={<IconEdit stroke={1} />}
                >
                    Edit
                </Button>
            </CardBody>
        </Card>
    );
}

export function PasswordCard() {
    return (
        <Card>
            <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
            </CardBody>
        </Card>
    );
}

export function EmailCard(props: { email: string }) {
    return (
        <Card className="grid sm:grid-cols-1 lg:grid-cols-3 p-2" radius="lg">
            <CardHeader className=" flex-col items-start justify-center">
                <h4 className="font-bold text-large">Email</h4>
                <small className="text-default-500">
                    The email address associated with your account.
                </small>
            </CardHeader>
            <CardBody className="items-center justify-center col-span-2 grid grid-cols-3">
                <p className="text-warning col-span-2">{props.email}</p>
                <Button color="default" variant="bordered" radius="full">
                    Edit
                </Button>
            </CardBody>
        </Card>
    );
}
