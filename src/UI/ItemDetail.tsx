import SnackStar from '../components/SnackStar';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { BrandType } from './SelectBox';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import EditSnackForm from '../components/EditSnackForm';
import { fetchSnacksData } from '../store/snacks-actions';
import { formDataType } from '../components/NewReviewForm';

import Emogi from '../components/Emogi';

export type ItemDetailType = {
    name: string;
    image: string;
    id: string;
    brand: string;
    starAver: number;
    brandName: string;
    good: number;
    bad: number;
};
const ItemDetail: React.FC<ItemDetailType> = (props) => {
    const brandsItems: BrandType[] = useSelector((state: IRootState) => state.brands.items);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<{
        brand: string;
        name: string;
        image: string;
        brandName: string;
    }>({
        brand: props.brand,
        name: props.name,
        image: props.image,
        brandName: props.brandName,
    });

    useEffect(() => {
        if (props.brand !== formData.brand || props.name !== formData.name || props.image !== formData.image) {
            dispatch(fetchSnacksData());
        }
    }, [formData]);

    const updateDataHandler = ({ name, image, brand }: formDataType) => {
        let brandName = '';
        if (brand) {
            brandName = brandsItems.find((item: BrandType) => item.id === brand)?.name || '';
        }
        setFormData({
            brand,
            name,
            image,
            brandName,
        });
        setIsEditing(false);
    };

    const cancelEditingHandler = () => {
        setIsEditing(false);
    };
    const EditingHandler = () => {
        setIsEditing(true);
    };

    return (
        <>
            <EditSnackForm
                isEditing={isEditing}
                brand={props.brand}
                brandName={props.brandName}
                name={formData.name}
                image={formData.image}
                id={props.id}
                cancelEditing={cancelEditingHandler}
                onSuccessEditing={updateDataHandler}
            />
            <div className="basic-N38">
                <div className="contents-inner">
                    <div className="contents-container container-md">
                        <div className="textset">
                            <h2 className="textset-tit-snack">{`[ ${formData.brandName} ] ${formData.name}`}</h2>
                            <h2 className="textset-tit-snack">
                                <SnackStar onChangeValue={() => {}} value={props.starAver} showRating={true} />
                            </h2>
                        </div>
                        <div className="contents-img-div">
                            <img src={formData.image} className="contents-img" />
                        </div>
                        <div className="contents-btn-div">
                            <button className="contents-btn" onClick={EditingHandler}>
                                <HiMiniPencilSquare className="contents-btn-editing" />
                            </button>
                        </div>
                        <Emogi item={props} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemDetail;
