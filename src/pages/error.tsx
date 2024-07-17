import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function ErrorPage() {
    return (
        <div className="grid h-screen place-content-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-primary">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Uh-oh!
                </p>

                <p className="mt-4 text-gray-500">We can't find that page.</p>

                <Button
                    href="/"
                    as={Link}
                    className="mt-4 text-sm font-normal bg-primary text-white"
                    variant="flat"
                >
                    Go Back Home
                </Button>
            </div>
        </div>
    );
}
