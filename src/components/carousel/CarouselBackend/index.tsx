import { api } from "@/utils/api";
import { Carousel } from "@mantine/carousel";
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export const CarouselBackend = () => {
  const { data: carousel } = api.carousel.getByName.useQuery({
    name: "principal",
  });
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return carousel ? (
    <Carousel
      height={400}
      dragFree
      loop={true}
      slideGap="md"
      align="start"
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {(carousel?.items || []).map((item) => (
        <Carousel.Slide key={item.id}>
          <Link href={item.url || "#"}>
            {item.image ? (
              <Image src={item.image} fill={true} alt={item.name} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: String(item.html),
                }}
              ></div>
            )}
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  ) : null;
};
