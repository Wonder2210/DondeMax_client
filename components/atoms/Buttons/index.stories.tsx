import * as React from "react";
import { Icon } from "@iconify/react";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import heart from "@iconify/icons-cil/heart";
import share from "@iconify/icons-cil/share";
import IconButton from "./IconButton";
import Button from "./Button";

export default {
  title: "Atoms/Button",
};

export const BasicUsage = () => (
  <Button
    backgroundColor="rose.600"
    rightIcon={() => (
      <Icon icon={chevronRight} color="white" height="2.875rem" width="2.375rem" style={{ marginLeft: "10%" }} />
    )}
  >
    Nuestras Tortas
  </Button>
);

export const iconbuttonHeart = () => (
  <IconButton
    aria-label="heart"
    backgroundColor="#F42121"
    color="white"
    icon={() => <Icon icon={heart} width="1.563rem" height="1.5rem" />}
  />
);
export const iconbuttonShare = () => (
  <IconButton
    aria-label="heart"
    backgroundColor="#3DBBE3"
    color="white"
    icon={() => <Icon icon={share} width="1.563rem" height="1.5rem" />}
  />
);
