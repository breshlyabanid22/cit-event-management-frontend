import { Card, CardFooter, Image, Button } from "@nextui-org/react";
export default function VenueCard({ venue }) {
    return (
        <Card isFooterBlurred radius="lg" className="border-none">
            <Image
                isZoomed
                alt="Venue Image"
                className="object-cover"
                width={500}
                height={500}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{venue.name}</p>
                <p className="text-tiny text-white/80">{venue.location}</p>
                <p className="text-tiny text-white/80">{venue.capacity}</p>
                <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                >
                    View
                </Button>
            </CardFooter>
        </Card>
    );
}
