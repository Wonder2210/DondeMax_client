/* eslint-disable react/destructuring-assignment */
import React from "react";
import Carousel from "react-multi-carousel";
import { useMediaQuery } from "react-responsive";
import { Box } from "@chakra-ui/core";
import { ArrowsGroup } from "../../molecules/ArrowsGroup";

const CardSlider = (props) => {
  const responsive = React.useMemo(
    () => ({
      desktop: {
        breakpoint: { max: 3000, min: 960 },
        items: 3,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 959, min: 464 },
        items: 3,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
      },
    }),
    [],
  );
  const isPhoneOrTablet = useMediaQuery({
    minDeviceWidth: 960,
  });
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
        dotListClass="custom-dots"
        itemClass="custom-item"
        arrows={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        customButtonGroup={isPhoneOrTablet && <ArrowsGroup next={props.next} previous={props.previous} />}
      >
        {props.children}
      </Carousel>
    </Box>
  );
};

export default CardSlider;
