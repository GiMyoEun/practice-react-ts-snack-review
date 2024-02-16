import { snackType } from './AllList';
import { useState } from 'react';
import SnackReviews from './SnackReviews';
import ItemDetail from '../UI/ItemDetail';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { setInitSnackReviews } from '../store/snacks-actions';

import { HiArrowSmallLeft } from 'react-icons/hi2';

const Snack: React.FC<{
    item: { item: snackType; brandName: string };
    type: string;
    onClickBtn: (type: string, brandId?: string) => void;
}> = (props) => {
    const [starAver, setStarAver] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const onChangeStarAver = (aver: number) => {
        setStarAver(aver);
    };
    const onClickGoToSnackList = () => {
        dispatch(setInitSnackReviews());
        props.onClickBtn('snacks', props.item.item.brand);
    };

    return (
        <>
            <ItemDetail
                name={`[ ${props.item.brandName} ] ${props.item.item.name}`}
                image={props.item.item.image}
                starAver={starAver}
            />
            <SnackReviews id={props.item.item.id} onChangeHandler={onChangeStarAver} />

            <button className="btnset-save" type="button" onClick={onClickGoToSnackList}>
                <HiArrowSmallLeft />
            </button>
        </>
    );
};

export default Snack;
