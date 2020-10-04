import { extendTheme as theme } from "@chakra-ui/core";

const colors = {
  colors: {
    brand: {
      700: "#FB2C52",
      600: "#E91E63",
    },
    blue_bg: {
      600: "#2F4858",
    },
  },
};
export default theme({
  colors,
  fonts: {
    heading: `"Poppins", sans-serif`,
    body: `"Poppins", sans-serif`,
    mono: `"Poppins", sans-serif`,
  },
});
