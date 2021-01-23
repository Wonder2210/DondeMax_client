/* eslint-disable react/destructuring-assignment */
import React from "react";
import Carousel from "react-multi-carousel";
import { useMediaQuery } from "react-responsive";
import { Box } from "@chakra-ui/core";

const CardSlider = (props) => {
  const responsive = React.useMemo(
    () => ({
      desktop: {
        breakpoint: { max: 3000, min: 960 },
        items: 4,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 959, min: 464 },
        items: 3,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    }),
    [],
  );
  return (
    <Box width="100%" display="relative" height="auto">
      <Carousel
        swipeable
        draggable={false}
        showDots
        responsive={responsive}
        ssr // means to render carousel on server-side.
        infinite
        transitionDuration={500}
        containerClass="container"
        itemClass="custom-item"
        arrows
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
      >
        {props.children}
      </Carousel>
    </Box>
  );
};

export default CardSlider;
