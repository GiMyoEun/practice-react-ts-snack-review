import { useState } from 'react';
import { PiStarFill, PiStarLight } from 'react-icons/pi';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const RatingField = styled.fieldset`
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    transform: translateY(2px);
    font-size: 3rem;
    line-height: 100%;
    ${({ small }: { small: boolean }) =>
        small &&
        css`
            font-size: 1.5rem;
        `}
`;

const Base = styled.section`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Name = styled.span`
    font-size: 1.4rem;
    line-height: 100%;
`;
const RatingValue = styled.span`
    font-size: 1.2rem;
    line-height: 100%;
`;
const Star: React.FC<{
    onChangeValue: (value: number) => void;
    value: number;
    showRating?: boolean;
    small?: boolean;
}> = ({ small = false, ...props }) => {
    return (
        <Base>
            <RatingField small={small}>
                {[...Array(props.value)].map((a, i) => (
                    <PiStarFill key={i} onClick={() => props.onChangeValue(i + 1)} />
                ))}
                {[...Array(5 - props.value)].map((a, i) => (
                    <PiStarLight key={i} onClick={() => props.onChangeValue(props.value + i + 1)} />
                ))}
            </RatingField>
            {props.showRating && <Name>{props.value}</Name>}
        </Base>
    );
};

export default Star;
