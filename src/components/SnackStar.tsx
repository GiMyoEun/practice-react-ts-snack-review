import { useState } from 'react';
import { PiStarFill, PiStarLight } from 'react-icons/pi';
import styled from '@emotion/styled';
const RatingField = styled.fieldset`
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    transform: translateY(2px);
    font-size: 3rem;
    line-height: 100%;
`;

export default function Star() {
    const [rating, setRating] = useState(0);

    return (
        <RatingField>
            {[...Array(rating)].map((a, i) => (
                <PiStarFill key={i} onClick={() => setRating(i + 1)} />
            ))}
            {[...Array(5 - rating)].map((a, i) => (
                <PiStarLight key={i} onClick={() => setRating(rating + i + 1)} />
            ))}
        </RatingField>
    );
}
