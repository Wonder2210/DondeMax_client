import * as React from "react";
import { Image } from "@chakra-ui/core";

type props = {
  src: string;
  alt: string;
  height?: string;
  width?: string;
};

const ImageHeader: React.FC<props> = ({ src, alt, height, width }) => {
  return <Image src={src} alt={alt} height={height ?? ""} width={width ?? ""} rounded="35px" />;
};

export default ImageHeader;
