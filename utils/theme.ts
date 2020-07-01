import { theme } from "@chakra-ui/core";

const customTheme ={
    ...theme,
    colors:{
        ...theme.colors,
        rose:{
            700:"#FB2C52",
            600:"#E91E63",
        },
        blue_bg:{
            600:"#2F4858"
        }
    },
    fonts:{
        heading:'"Poppins", sans-serif',
        body:'"Poppins",sans-serif',
        mono:'"Poppins",sans-serif',
    }
}

export default customTheme;