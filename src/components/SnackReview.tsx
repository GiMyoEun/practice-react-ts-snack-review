import useHttp from '../hooks/useHttps';
import Star from './SnackStar';
import { HtmlHTMLAttributes, useEffect, useState } from 'react';
import Confirm from '../UI/Comfirm';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import { HiXMark } from 'react-icons/hi2';
import AlertModal from '../UI/AlertModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { updateSnackReviewsTemp } from '../store/snacks-actions';
import { HiCheck } from 'react-icons/hi2';
import { HiOutlinePencil } from 'react-icons/hi2';

import { snackReviewType } from './SnackReviews';
import GoodIcons from './GoodIcons';

const requestConfigSubmit = {
    method: 'DELETE',
};
const updateConfig: {} = {
    method: 'PUT',
    headers: {
        'Content-Type': 'text/plain',
        withCredentials: true,
    },
};

export type SnackReviewType = {
    id: string;
    snackId: string;
    comment: string;
    isSending: boolean;
    star: number;
    good: number;
    snackReviewItems: snackReviewType[];
};

export type SnackReviewType2 = {
    id: string;
    snackId: string;
    comment: string;
    isSending: boolean;
    star: number;
    good: number;
    focusRef: (value: boolean) => void;

    snackReviewItems: snackReviewType[];
};
export type Ref = HTMLInputElement | null;

const SnackReview = forwardRef<Ref, SnackReviewType2>((props, ref) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [message, setMessage] = useState<string>('');
    const [updateMode, setUpdateMode] = useState(false);
    const [rating, setRating] = useState(props.star);
    const [comment, setComment] = useState<string>(props.comment);
    const [good, setGood] = useState<number>(props.good);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (updateMode) {
            props.focusRef(true);
        }
    }, [updateMode]);

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(
        `${process.env.REACT_APP_FIREBASE_URL}reviews/${props.snackId}/${props.id}.json`,
        requestConfigSubmit,
        []
    );

    const {
        data: submitUpdateData,
        isLoading: isUpdating,
        error: errorUpdating,
        sendRequest: sendUptReq,
        clearData: clearUpdateData,
    } = useHttp(`${process.env.REACT_APP_FIREBASE_URL}reviews/${props.snackId}/${props.id}.json`, updateConfig, []);

    const deleteHandler = () => {
        setShowConfirm(true);
        setConfirmMessage('삭제하시겠습니까?');
    };

    const onClickUpdateBtn = () => {
        setUpdateMode(true);
    };

    const submitHandler = () => {
        setShowConfirm(false);
        setConfirmMessage('');
        if (updateMode) {
            sendUptReq(
                JSON.stringify({
                    comment,
                    star: rating,
                    good: good,
                })
            );
            setUpdateMode(false);
        } else {
            sendRequest();
        }
    };

    const cancelUpdateHandler = () => {
        setRating(props.star);
        setComment(props.comment);
        setUpdateMode(false);
        props.focusRef(false);
    };

    const denySubmitHandler = () => {
        setShowConfirm(false);
        setConfirmMessage('');
        if (updateMode) {
            cancelUpdateHandler();
        }
        return;
    };

    const changeStarValue = (value: number) => {
        setRating(value);
    };

    const changeFormDataHandler = (value: string) => {
        setComment(value);
    };

    const onClickSubmitUpdateBtn = () => {
        if (!comment) {
            setShowAlert(true);
            setMessage('댓글을 입력해주세요');
            return;
        }
        if (!rating) {
            setShowAlert(true);
            setMessage('별점을 입력해주세요');
            return;
        }

        setShowConfirm(true);
        setConfirmMessage('수정하시겠습니까?');
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    let actions = <p></p>;
    if (isSending) {
        actions = <p>삭제중...</p>;
    }
    if (errorSubmitForm) {
        actions = <p>삭제에 실패하였습니다</p>;
    }
    if (submitResData && submitResData['message'] && !errorSubmitForm) {
        clearData();
        const newList: { id: string; comment: string; star: number; good: number }[] = props.snackReviewItems.filter(
            (item) => item.id !== props.id
        );
        dispatch(updateSnackReviewsTemp(newList));
    }
    if (isUpdating) {
        actions = <p>수정중...</p>;
    }
    if (errorUpdating) {
        actions = <p>수정에 실패하였습니다</p>;
    }
    if (submitUpdateData && submitUpdateData['message'] && !errorUpdating) {
        clearUpdateData();
        const newList: { id: string; comment: string; star: number; good: number }[] = props.snackReviewItems.map(
            (item) => {
                if (item['id'] === props.id) {
                    return {
                        id: item['id'],
                        comment: comment,
                        star: rating,
                        good: good,
                    };
                } else {
                    return item;
                }
            }
        );
        dispatch(updateSnackReviewsTemp(newList));
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

            <div className="comment-grid">
                <div className="grid-container-left">
                    {updateMode && (
                        <input
                            id={props.id}
                            name={props.id}
                            ref={ref}
                            type="text"
                            className="inputset-input form-control"
                            value={comment}
                            onChange={(event) => changeFormDataHandler(event.currentTarget.value)}
                        />
                    )}
                    {!updateMode && <h6 className="inputset-tit">{comment}</h6>}
                </div>

                {actions}
                <div className="grid-container">
                    {!updateMode && <Star onChangeValue={() => {}} value={rating} showRating={true} small={true} />}
                    {updateMode && <Star onChangeValue={changeStarValue} value={rating} />}
                </div>
                <div className="grid-container-end">
                    {!updateMode && (
                        <>
                            <button
                                type="button"
                                disabled={props.isSending || isSending}
                                className="delete-btn"
                                onClick={deleteHandler}
                            >
                                <HiArchiveBoxXMark />
                            </button>
                            <button
                                type="button"
                                disabled={props.isSending || isSending}
                                className="delete-btn"
                                onClick={onClickUpdateBtn}
                            >
                                <HiOutlinePencil />
                            </button>
                            <GoodIcons item={props} rating={rating} comment={comment} />
                        </>
                    )}
                    {updateMode && (
                        <>
                            <button
                                type="button"
                                disabled={props.isSending || isSending}
                                onClick={onClickSubmitUpdateBtn}
                                className="delete-btn"
                            >
                                <HiCheck />
                            </button>
                            <button
                                type="button"
                                disabled={props.isSending || isSending}
                                className="delete-btn"
                                onClick={cancelUpdateHandler}
                            >
                                <HiXMark />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
});

export default SnackReview;
