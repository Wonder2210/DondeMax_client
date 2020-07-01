import React from 'react';
import { addDecorator } from '@storybook/react';
import theme from '../utils/theme';
import {ThemeProvider,CSSReset} from '@chakra-ui/core';

addDecorator(storyFn => <ThemeProvider theme={theme}>
    <CSSReset/>
    {storyFn()}
    </ThemeProvider>);