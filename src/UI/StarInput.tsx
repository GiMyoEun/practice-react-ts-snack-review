import { FaStar, FaStarHalf } from 'react-icons/fa';

type StarInput = {
    onClickRating: (value: number) => void;
    value: number;
    isHalf: boolean;
};

const StarInput: React.FC<StarInput> = ({ onClickRating, value, isHalf }) => {
    const handleClickRatingInput = () => {
        onClickRating(value);
    };

    return (
        <>
            <input type="radio" name="rating" id={`star${value}`} value={value} />
            <label onClick={handleClickRatingInput} htmlFor={`star${value}`}>
                {isHalf ? <FaStarHalf /> : <FaStar />}
            </label>
        </>
    );
};

export default StarInput;
