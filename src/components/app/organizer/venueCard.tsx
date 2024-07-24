import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Venue } from "@/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import venueImage from "@/assets/venue.png";
export default function VenueCard({ venue }: { venue: Venue }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const localhost: string = "http://localhost:8080";
    return (
        <Card isFooterBlurred radius="lg" className="border-none min-w-[500px]">
            <Slider {...settings}>
                {venue.imagePath?.map((path, index) => (
                    <Image
                        key={index}
                        isZoomed
                        alt={`Venue Image ${index + 1}`}
                        className="object-cover"
                        width={600}
                        height={600}
                        src={localhost + path}
                        fallbackSrc={venueImage}
                    />
                ))}
            </Slider>
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{venue.name}</p>
                <p className="text-tiny text-white/80">{venue.location}</p>
                <p className="text-tiny text-white/80">{venue.maxCapacity}</p>
                <Button
                    className="text-tiny text-white bg-black/20"
                    variant="bordered"
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
