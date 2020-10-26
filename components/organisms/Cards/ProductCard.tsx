import * as React from "react";
import { Box } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import { Button } from "../../atoms/Buttons";
import { Header, SubHeader, Parragraph } from "../../atoms/Text";
import { ImageHeader } from "../../atoms/CardPieces";

type props = {
  name: string;
  image: string;
  info: string;
  type: string;
  action: (e: React.FormEvent) => void;
  big: boolean;
};

const ProductCard: React.FC<props> = ({ name, image, info, type, action, big }) => {
  return (
    <Box gridColumn={big && "span 2"} margin="1em">
      <ImageHeader maxHeight="50vh" alt={name} src={image} height="auto" width="100%" />
      <Box margin="0 10%">
        <Header type="h6" weight="semibold" fontSize="1.5em">
          Here
        </Header>
        <SubHeader fontSize="1em">{type}</SubHeader>
        <Parragraph fontSize="0.8em" textAlign="left">
          {info}
        </Parragraph>
        <Box margin="0 0 0 auto" width="min-content">
          <Button
            backgroundColor="colors.rose.600"
            onClick={action}
            width="7em"
            height="2.5em"
            rightIcon={<Icon icon={chevronRight} />}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
