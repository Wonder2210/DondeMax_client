import React from "react";
import { Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import x from "@iconify/icons-cil/x-circle";
import update from "@iconify/icons-cil/pen";
import { IconButton } from "../../atoms/Buttons";

type props = {
  onDelete: (e: React.FormEvent) => void;
  onUpdate: (e: React.FormEvent) => void;
};

const ActionButtons: React.FC<props> = ({ onDelete, onUpdate }) => {
  return (
    <Flex justifyContent="center">
      <IconButton aria-label="delete" icon={<Icon icon={x} color="rgb(205,4,4)" />} onClick={onDelete} />
      <IconButton aria-label="update" icon={<Icon icon={update} color="#000" />} onClick={onUpdate} />
    </Flex>
  );
};

export default ActionButtons;
