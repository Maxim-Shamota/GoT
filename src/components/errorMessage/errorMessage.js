import React from 'react';
import img from './error.jpg';
import styled from 'styled-components';

const TextBlock = styled.span`
    margin: 0 auto;
    font-weight: bold;
`

const ErrorMessage = () => {
    return (
        <TextBlock>
            <img src={img} alt='error'></img>
            <span>Something goes wrong</span>
        </TextBlock>
    )
}

export default ErrorMessage;