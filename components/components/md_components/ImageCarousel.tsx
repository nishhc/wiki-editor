import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export interface Props {
  images: string[];
  caption?: string;
  // maxW: "sm" | "md" | "lg";
}

export default function Image(props: Props) {
  const imagesX = props.images.map((src) => ({ source: src }));
  console.log("images,", imagesX);
  return (
    <div className="flex w-full flex-col items-center justify-center p-1">
      <Carousel useKeyboardArrows={true}>
        {props.images.map((URL, index) => (
          <div className="slide" key={index}>
            <img alt="sample_file" src={URL} />
          </div>
        ))}
      </Carousel>
      <div className="text-center italic">{props.caption}C</div>
    </div>
  );
}
