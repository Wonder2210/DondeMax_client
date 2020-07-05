import * as React from "react";
import { withDesign } from "storybook-addon-designs";
import { Icon } from "@iconify/react";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import heart from "@iconify/icons-cil/heart";
import share from "@iconify/icons-cil/share";
import storyConfig from "../../../utils/pluginFigmaConfig";
import IconButton from "./IconButton";
import Button from "./Button";

export default {
  title: "Atoms/Button",
  decorators: [withDesign],
};

export const BasicUsage = () => (
  <Button
    backgroundColor="rose.600"
    rightIcon={() => (
      <Icon icon={chevronRight} color="white" height="46px" width="38px" style={{ marginLeft: "10%" }} />
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
    icon={() => <Icon icon={heart} width="25px" height="24px" />}
  />
);
export const iconbuttonShare = () => (
  <IconButton
    aria-label="heart"
    backgroundColor="#3DBBE3"
    color="white"
    icon={() => <Icon icon={share} width="25px" height="24px" />}
  />
);

BasicUsage.story = storyConfig;

//rafce
