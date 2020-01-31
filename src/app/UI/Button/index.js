import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 100px;
    height: 50px;
`;

const Button = props => {
    const { children } = props;

    return <StyledButton>{children}</StyledButton>;

}

export default Button;