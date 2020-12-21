import { extendTheme as theme } from "@chakra-ui/core";

const colors = {
  colors: {
    rose: {
      700: "#FB2C52",
      600: "#E91E63",
    },
    blue_bg: {
      600: "#2F4858",
    },
  },
};
const tab = {
  color: "#898989",
  fontWeight: "semibold",

  _selected: {
    color: "#000",
    borderBottomColor: "#E91E63",
  },
};
export default theme({
  colors,
  components: {
    Tabs: {
      variants: {
        line: {
          tab,
        },
      },
    },
  },
  fonts: {
    heading: `"Poppins", sans-serif`,
    body: `"Poppins", sans-serif`,
    mono: `"Poppins", sans-serif`,
  },
});
