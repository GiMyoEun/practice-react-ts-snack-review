import { useState } from 'react';
import StarInput from './StarInput';

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleClickRating = (value: number) => {
        setRating(value);
    };

    return (
        <section>
            <h1>별점</h1>
            <fieldset>
                <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />
                // 생략
                <StarInput onClickRating={handleClickRating} value={0.5} isHalf={true} />
            </fieldset>
            <span>{rating}</span>
        </section>
    );
};

export default StarRating;
