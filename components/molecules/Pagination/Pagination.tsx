import * as React from "react";
import { Flex } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import chevronLeft from "@iconify/icons-dashicons/arrow-left-alt2";

import { IconButton, Button } from "../../atoms/Buttons";

type props = {
  numberItems: number;
  pageItems: number;
  page: number;
  last: () => void;
  next: () => void;
  onClick: (e: number) => void;
};

const Pagination: React.FC<props> = ({ numberItems, pageItems, page, last, next, onClick }) => {
  const totalPages = Math.ceil(numberItems / pageItems);
  console.log(totalPages, numberItems, pageItems);

  const renderItems = [...new Array(totalPages).fill(0)]
    .map((i, k) => k + 1)
    .map((i) => {
      if (page === i) {
        return (
          <Button
            key={i}
            backgroundColor="colors.rose.600"
            size="sm"
            width="1em"
            height="1.5em"
            color="white"
            borderRadius="5px"
            onClick={() => {
              onClick(i);
            }}
          >
            {i}
          </Button>
        );
      }
      return (
        <Button
          key={i}
          size="sm"
          width="1em"
          color="black"
          backgroundColor="white"
          height="1.5em"
          borderRadius="5px"
          onClick={() => {
            onClick(i);
          }}
        >
          {i}
        </Button>
      );
    });

  return (
    <Flex align="center" justify="space-between" width="25vw" marginY="1em">
      <IconButton
        aria-label="heart"
        backgroundColor="#FFF"
        color="black"
        icon={<Icon icon={chevronLeft} width="1.563rem" height="1.5rem" />}
        onClick={page <= 1 ? () => console.log("nothing") : last}
      />

      {renderItems}
      <IconButton
        aria-label="heart"
        backgroundColor="#FFF"
        color="black"
        icon={<Icon icon={chevronRight} width="1.563rem" height="1.5rem" />}
        onClick={page >= totalPages ? () => console.log("nothing") : next}
      />
    </Flex>
  );
};

export default Pagination;
