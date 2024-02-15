import { snackType } from './AllList';
import { useState } from 'react';
import SnackReviews from './SnackReviews';
import ItemDetail from '../UI/ItemDetail';

const Snack: React.FC<{
    item: { item: snackType; brandName: string };
    type: string;
    onClickBtn: (type: string, brandId?: string) => void;
}> = (props) => {
    const [starAver, setStarAver] = useState(0);

    const onChangeStarAver = (aver: number) => {
        setStarAver(aver);
    };

    return (
        <>
            <ItemDetail
                name={`[ ${props.item.brandName} ] ${props.item.item.name}`}
                image={props.item.item.image}
                starAver={starAver}
            />
            <SnackReviews id={props.item.item.id} onChangeHandler={onChangeStarAver} />

            <button
                className="btnset-save"
                type="button"
                onClick={() => props.onClickBtn('snacks', props.item.item.brand)}
            >
                목록
            </button>
        </>
    );
};

export default Snack;
