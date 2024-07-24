import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Input
} from "@nextui-org/react";
import { IconEdit, IconKey, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import { updateUsername } from "@/api/utils";
import useAuthStore from "@/provider/auth";
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export function UsernameCard(props: { username: string }) {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const [username, setUsername] = useState(props.username);    
    const [edit, setEdit] = useState(false);

    const handleChange = () => {
        setEdit(!edit);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handleSave = async () => {
        await updateUsername(user?.userID, username);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("Username updated");
        setEdit(false);
    };
    return (
        <>
        <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: "text-sm",
                    duration: 5000,
                    style: {
                        background: "#800000",
                        color: "#fff",
                    },
                }}
            />
        <Card radius="lg">
            <div className="flex flex-row items-start justify-between p-4">
                <div>
                    <h4 className="font-bold text-large">Username</h4>
                    <small className="text-default-500">
                        Your login username in your.
                    </small>
                </div>

                <p className="flex items-center self-center justify-center text-warning">
                    {edit ? (
                      <Input 
                      type="text"
                      value={username}
                      onChange={handleInputChange}
                      />  
                    ) : (
                        <span>{props.username}</span>
                    )}
                </p>
                <div className="flex items-center self-center justify-end gap-x-3">
                    <Button
                        onPress={handleChange}
                        color="default"
                        variant="bordered"
                        radius="full"
                        endContent={<IconEdit stroke={1} />}
                    >
                        {edit ? 'Cancel' : 'Edit'}
                    </Button>
                    <Button
                        color="primary"
                        radius="full"
                        type="submit"
                        onPress={handleSave}
                    >Save
                    </Button>
                </div>
            </div>
        </Card>
    </>
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
                <div className="flex items-center self-center justify-end">
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
                <p className="flex items-center self-center justify-center text-warning">
                    {props.email}
                </p>
                <div className="flex items-center self-center justify-end">
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
