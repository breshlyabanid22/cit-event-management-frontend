import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
} from "@nextui-org/react";
import { IconEdit, IconKey, IconMail } from "@tabler/icons-react";
export function UsernameCard(props: { username: string }) {
    return (
        <Card radius="lg">
            <div className="flex flex-row items-start justify-between p-4">
                <div>
                    <h4 className="font-bold text-large">Username</h4>
                    <small className="text-default-500">
                        Your login username in your account.
                    </small>
                </div>

                <p className="flex justify-center items-center text-warning self-center">
                    {props.username}
                </p>
                <div className="flex justify-end items-center self-center">
                    <Button
                        color="default"
                        variant="bordered"
                        radius="full"
                        endContent={<IconEdit stroke={1} />}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export function PasswordCard() {
    return (
        <Card radius="lg">
            <div className="flex flex-row items-start justify-between p-4">
                <div>
                    <h4 className="font-bold text-large">Password</h4>
                    <small className="text-default-500">
                        Set a unique password to protect your account.
                    </small>
                </div>
                <div className="flex justify-end items-center self-center">
                    <Button
                        color="default"
                        variant="bordered"
                        radius="full"
                        endContent={<IconKey stroke={1} />}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export function EmailCard(props: { email: string }) {
    return (
        <Card radius="lg">
            <div className="flex flex-row items-start justify-between p-4">
                <div>
                    <h4 className="font-bold text-large">Email</h4>
                    <small className="text-default-500">
                        The email address associated with your account.
                    </small>
                </div>
                <p className="flex justify-center items-center text-warning self-center">
                    {props.email}
                </p>
                <div className="flex justify-end items-center self-center">
                    <Button
                        color="default"
                        variant="bordered"
                        radius="full"
                        endContent={<IconMail stroke={1} />}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </Card>
    );
}
