import useHttp from '../hooks/useHttps';
import { useEffect, useState } from 'react';
import SnackStar from './SnackStar';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { fetchSnackReviewData, deleteSnackReview } from '../store/snacks-actions';
import SnackReview from './SnackReview';
import { TiLocationArrowOutline } from 'react-icons/ti';
import Alert from '../UI/AlertModal';

const requestConfigSubmit = {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
    },
};

export type snackReviewType = {
    id: string;
    snackId: string;
    comment: string;
    star: number;
    good: number;
};

const SnackReviews: React.FC<{
    id: string;
    onChangeHandler: (aver: number) => void;
}> = (props) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [rating, setRating] = useState(0);
    const [firstRandering, setFirstRendring] = useState(true);
    const snackReviewItems: snackReviewType[] = useSelector((state: IRootState) => state.snacks.reviews);

    const dispatch = useDispatch<AppDispatch>();
    const [comment, setComment] = useState<string>('');

    const starAver: number = useSelector((state: IRootState) => state.snacks.starAver);

    const {
        data: submitResData,
        isLoading: isSending,
        error: errorSubmitForm,
        sendRequest,
        clearData,
    } = useHttp(`${process.env.REACT_APP_FIREBASE_URL}reviews/${props.id}.json`, requestConfigSubmit, []);

    useEffect(() => {
        props.onChangeHandler(starAver);
    }, [starAver]);

    useEffect(() => {
        if (firstRandering || (submitResData && submitResData['message'] && !errorSubmitForm)) {
            clearData();
            setFirstRendring(false);
            dispatch(fetchSnackReviewData(props.id));
            setComment('');
            setRating(0);
        }
    }, [submitResData, errorSubmitForm, dispatch, firstRandering, snackReviewItems]);

    const submitHandler = () => {
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

        sendRequest(
            JSON.stringify({
                comment,

                star: rating,
            })
        );
    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    const changeStarValue = (value: number) => {
        setRating(value);
    };

    const changeFormDataHandler = (value: string) => {
        setComment(value);
    };

    let actions = <p></p>;
    if (isSending) {
        actions = <p>저장중...</p>;
    }
    if (errorSubmitForm) {
        actions = <p>저장에 실패하였습니다</p>;
    }

    if (submitResData && submitResData['message'] && !errorSubmitForm) {
        actions = <p>정보 저장에 성공하였습니다</p>;
    }

    return (
        <>
            {showAlert && <Alert showAlert={showAlert} onCloseAlert={hideAlert} message={message} />}

            <div className="form-group form-line">
                <div className="inputset inputset-line inputset-lg inputset-label">
                    <label>
                        <div className="comment">
                            <input
                                type="text"
                                className="inputset-input form-control"
                                placeholder="댓글과 별점을 입력해주세요."
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(event) => changeFormDataHandler(event.currentTarget.value)}
                            />
                            <SnackStar onChangeValue={changeStarValue} value={rating} />

                            <button type="button" disabled={isSending} onClick={submitHandler} className="reply-btn">
                                <TiLocationArrowOutline />
                            </button>
                            {actions}
                        </div>

                        {snackReviewItems &&
                            snackReviewItems.map((item) => (
                                <SnackReview
                                    key={item.id}
                                    id={item.id}
                                    snackId={props.id}
                                    comment={item.comment}
                                    isSending={isSending}
                                    star={item.star}
                                    good={item.good}
                                    snackReviewItems={snackReviewItems}
                                />
                            ))}
                    </label>
                </div>
            </div>
        </>
    );
};

export default SnackReviews;
