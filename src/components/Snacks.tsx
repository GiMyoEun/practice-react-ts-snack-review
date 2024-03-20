import ItemBox from '../UI/ItemBox';
import { snackType } from './AllList';
import ItemList from '../UI/ItemList';
import ItemListIsEmpty from '../UI/ItemListIsEmpty';
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import useHttp from '../hooks/useHttps';
import { useState } from 'react';
import Confirm from '../UI/Comfirm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { IRootState } from '../store';
import {
    fetchSnackReviewDataQuantity,
    fetchSnacksData,
    setInitSnackReviews,
    updateSnacksTemp,
} from '../store/snacks-actions';
import { useSelector } from 'react-redux';
import AlertModal from '../UI/AlertModal';
const requestConfigSubmit = {
    method: 'DELETE',
};

const Snacks: React.FC<{
    onClickBtn: (type: string, brandId?: string) => void;
    items: snackType[];
    type: string;
    brand: string;
}> = (props) => {
    let filteredItems: snackType[] = [];
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [targetId, setTargetId] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const reviewsCount: number = useSelector((state: IRootState) => state.snacks.reviewsCount);

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp('', requestConfigSubmit, []);

    const onClickDeleteBtn = (id: string) => {
        dispatch(fetchSnackReviewDataQuantity(id));
        setShowConfirm(true);
        setConfirmMessage('삭제하시겠습니까?');
        setTargetId(id);
    };

    const submitHandler = () => {
        setShowConfirm(false);

        if (reviewsCount > 0) {
            dispatch(setInitSnackReviews());
            setShowAlert(true);
            setMessage('삭제하고자 하는 스낵에 댓글이 있어 삭제가 불가합니다.');

            return;
        } else {
            dispatch(setInitSnackReviews());
            sendRequest(null, `${process.env.REACT_APP_FIREBASE_URL}snacks/${targetId}.json`);
        }
    };
    const denySubmitHandler = () => {
        dispatch(setInitSnackReviews());
        setShowConfirm(false);
        setConfirmMessage('');
        setTargetId('');
        return;
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    if (props.items) {
        filteredItems = props.items.filter((item: snackType) => item.brand === props.brand);
        if (!filteredItems || filteredItems.length === 0) {
            return <ItemListIsEmpty message="스낵 리스트가 없습니다" onClickBtn={props.onClickBtn} type="brands" />;
        }
    }

    let actions = <p></p>;
    if (isSending) {
        actions = <p>삭제중...</p>;
    }
    if (errorSubmitForm) {
        actions = <p>삭제에 실패하였습니다</p>;
    }
    if (submitResData && submitResData['message'] && !errorSubmitForm) {
        clearData();
        // actions = <p>삭제에 성공하였습니다.</p>;
        // const newList = props.items.filter((item: snackType) => item.brand === props.brand && item.id !== targetId);
        dispatch(fetchSnacksData());
    }

    return (
        <>
            {showAlert && <AlertModal showAlert={showAlert} onCloseAlert={hideAlert} message={message} />}
            {showConfirm && (
                <Confirm
                    showConfirm={showConfirm}
                    message={confirmMessage}
                    onConfirm={submitHandler}
                    onCloseConfirm={denySubmitHandler}
                />
            )}
            {!submitResData ||
                (!submitResData['message'] && (
                    <ItemList>
                        {filteredItems.map((item: snackType) => (
                            <div key={item.id} className="snack-grid">
                                <div className="snack-grid-container">
                                    <ItemBox
                                        id={item!.id!}
                                        name={item!.name!}
                                        onClickBtn={props.onClickBtn}
                                        type={props.type}
                                    />
                                </div>
                                <div className="snack-grid-container">
                                    <button
                                        className="snack-grid-container-button"
                                        onClick={() => onClickDeleteBtn(item!.id!)}
                                    >
                                        <HiArchiveBoxXMark />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="contents-btn">
                            <div className="contents-control">
                                <div
                                    className="swiper-button-prev"
                                    onClick={() => props.onClickBtn('brands', '')}
                                ></div>
                            </div>
                        </div>
                    </ItemList>
                ))}
        </>
    );
};
//basic-N9 .contents-control
export default Snacks;
