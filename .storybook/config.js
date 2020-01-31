import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import styled from 'styled-components';

const Decorator = styled.div`
    display: 'flex';
    align-items: 'center';
    justify-content: 'center'; 
    width: '800px';
    height: '800px';
    margin: '0 auto';
    position: 'relative';
    background-color: '#fefefe';
`;

addDecorator(storyFn => (
    <>
        <Decorator>{storyFn()}</Decorator>
    </>
));

// automatically import all files ending in *.stories.js
configure(require.context('../src/app/UI', true, /stories\.js$/), module);