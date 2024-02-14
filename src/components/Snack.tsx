import { snackType } from './AllList';
import Button from '../UI/Button';
import { fetchSnackReviewData } from '../store/snacks-actions';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SnackReviews from './SnackReviews';
import ItemDetail from '../UI/ItemDetail';

const Snack: React.FC<{
    item: { item: snackType; brandName: string };
    type: string;
    onClickBtn: (type: string, brandId?: string) => void;
}> = (props) => {
    return (
        <>
            <ItemDetail name={`[ ${props.item.brandName} ] ${props.item.item.name}`} image={props.item.item.image} />
            <SnackReviews id={props.item.item.id} />

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
