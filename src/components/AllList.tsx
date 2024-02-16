import { useState } from 'react';
import Brands from './Brands';
import Snacks from './Snacks';
import { IRootState } from '../store';
import { BrandType } from '../UI/SelectBox';
import { useSelector } from 'react-redux';
import Snack from './Snack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchSnackReviewData } from '../store/snacks-actions';

type uiType = {
    type: string;
    id: string;
    brandName: string;
};

export type snackType = {
    id: string;
    brand: string;
    name: string;
    image: string;
    starAver: number;
};

const ItemsList = () => {
    const brandsItems: BrandType[] = useSelector((state: IRootState) => state.brands.items);
    const snacksItems: snackType[] = useSelector((state: IRootState) => state.snacks.items);
    const dispatch = useDispatch<AppDispatch>();
    const [snack, setSnack] = useState<{ item: snackType; brandName: string }>({
        item: { id: '', brand: '', name: '', image: '', starAver: 0 },
        brandName: '',
    });

    const [uiObj, setUiObj] = useState<uiType>({
        type: 'brands',
        id: '',
        brandName: '',
    });

    const handleShowItems = (type: string, targetId: string = '') => {
        let brandName = '';
        if (targetId && type === 'snacks') {
            brandName = brandsItems.find((item: BrandType) => item.id === targetId)?.name || '';
        }
        setUiObj({
            type,
            id: targetId,
            brandName: brandName,
        });

        if (type === 'snack') {
            dispatch(fetchSnackReviewData(targetId));
            const targetSnack = snacksItems.find((item: snackType) => item.id === targetId) || {
                id: '',
                brand: '',
                name: '',
                image: '',
                starAver: 0,
            };
            setSnack({
                item: { ...targetSnack },
                brandName: uiObj.brandName,
            });
        }
    };

    return (
        <>
            {uiObj.type === 'brands' && <Brands onClickBtn={handleShowItems} items={brandsItems} type="snacks" />}
            {uiObj.type === 'snacks' && (
                <Snacks onClickBtn={handleShowItems} items={snacksItems} type="snack" brand={uiObj.id} />
            )}

            {uiObj.type === 'snack' && <Snack onClickBtn={handleShowItems} item={snack} type="snacks" />}
        </>
    );
};

export default ItemsList;
