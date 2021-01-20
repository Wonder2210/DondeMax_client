import * as React from "react";
import { Image } from "@chakra-ui/core";

type props = {
  src: string;
  alt: string;
  height?: string;
  maxHeight?: string;
  width?: string;
};

const ImageHeader: React.FC<props> = ({ src, alt, height, width, maxHeight = "auto" }) => {
  return <Image maxHeight={maxHeight} src={src} alt={alt} height={height ?? ""} width={width ?? ""} rounded="35px" />;
};

export default ImageHeader;
