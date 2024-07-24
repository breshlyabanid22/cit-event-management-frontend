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
import { updateUsername, updatePassword, updateEmail } from "@/api/utils";
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
        try{
            await updateUsername(user?.userID, username);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Username has been updated");
        }catch(error){
            toast.error("Username is already taken");
        }
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

export function PasswordCard(props: {password: string}) {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const [password, setPassword] = useState(props.password);    
    const [edit, setEdit] = useState(false);

    const handleChange = () => {
        setEdit(!edit);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSave = async () => {
        await updatePassword(user?.userID, password);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("Password has been updated");
        setEdit(false);
    };

    return (
        <Card radius="lg">
            <div className="flex flex-row items-start justify-between p-4">
                <div>
                    <h4 className="font-bold text-large">Password</h4>
                    <small className="text-default-500">
                        Set a unique password to protect your account.
                    </small>
                </div>
                <p className="flex items-center self-center justify-center text-warning">
                    {edit ? (
                      <Input 
                      type="password"
                      value={password}
                      defaultValue=""
                      onChange={handleInputChange}
                      />  
                    ) : (
                        <span>**************</span>
                    )}
                </p>
                <div className="flex items-center self-center justify-end gap-x-3">
                    <Button
                        onPress={handleChange}
                        color="default"
                        variant="bordered"
                        radius="full"
                        endContent={<IconKey stroke={1} />}
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
    );
}

export function EmailCard(props: { email: string }) {

    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const [email, setEmail] = useState(props.email);    
    const [edit, setEdit] = useState(false);

    const handleChange = () => {
        setEdit(!edit);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleSave = async () => {
        try{
            await updateEmail(user?.userID, email);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Email has been updated");
        }catch(error){
            toast.error("Email is already taken");
            setEmail(email);
        }
        setEdit(false);
    };
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
                    {edit ? (
                      <Input 
                      type="text"
                      value={email}
                      onChange={handleInputChange}
                      />  
                    ) : (
                        <span>{props.email}</span>
                    )}
                </p>
                <div className="flex items-center self-center justify-end gap-x-3">
                    <Button
                        onPress={handleChange}
                        color="default"
                        variant="bordered"
                        radius="full"
                        endContent={<IconMail stroke={1} />}
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
    );
}
