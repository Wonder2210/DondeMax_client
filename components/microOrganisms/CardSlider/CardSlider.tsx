import React from "react";
import Carousel from "react-multi-carousel";
import { Box } from "@chakra-ui/core";
import { ArrowsGroup } from "../../molecules/ArrowsGroup";
import InitialCard from "../../molecules/Cards/InitialCard";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CardSlider = (props) => {
  return (
    <Box width="60%" height="22vh" display="relative">
      <style jsx>
        {`
          .container {
            padding-bottom: 5%;
          }
          .custom-dots button:hover:active {
            background: #e91e63;
          }
          .react-multi-carousel-dot--active button {
            background: #e91e63;
          }
        `}
      </style>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots
        responsive={responsive}
        ssr // means to render carousel on server-side.
        infinite
        transitionDuration={500}
        containerClass="container"
        dotListClass="custom-dots"
        arrows={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        customButtonGroup={<ArrowsGroup />}
      >
        {props.children}
      </Carousel>
    </Box>
  );
};

export default CardSlider;
