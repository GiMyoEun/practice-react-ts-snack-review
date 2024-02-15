import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const Input = styled.input`
    display: none;
`;

const Label = styled.label`
    cursor: pointer;
    font-size: 1.5rem;
    color: lightgray;

    ${({ isHalf }: { isHalf: boolean }) =>
        isHalf &&
        css`
            position: absolute;
            width: 12px;
            overflow: hidden;

            &:nth-of-type(10) {
                transform: translate(-108px);
            }
            &:nth-of-type(8) {
                transform: translate(-84px);
            }
            &:nth-of-type(6) {
                transform: translate(-60px);
            }
            &:nth-of-type(4) {
                transform: translate(-36px);
            }
            &:nth-of-type(2) {
                transform: translate(-12px);
            }
        `}
`;

type starInput = {
    onClickRating: (value: number) => void;
    value: number;
    isHalf: boolean;
};

const StarInput: React.FC<starInput> = (props) => {
    const handleClickRatingInput = () => {
        props.onClickRating(props.value);
    };

    return (
        <>
            <Input type="radio" name="rating" id={`star${props.value}`} value={props.value} />
            <Label isHalf={props.isHalf} onClick={handleClickRatingInput} htmlFor={`star${props.value}`}>
                {props.isHalf ? <FaStarHalf /> : <FaStar />}
            </Label>
        </>
    );
};

export default StarInput;
